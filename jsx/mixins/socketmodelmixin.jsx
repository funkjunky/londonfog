var _ = require('underscore');

(function() {
    //TODO: don't hard code the url... I'd like to be able to sahre this mixin at some point.
    var url = 'localhost:2020';
    var sockets = {};

    var SocketModelMixin = {
        saveModel: _.debounce(function(model) {
            function saveCB(method, err, res) {
                console.log('SOCKET ' + method + ' - err, res: ', err, res);
            }

            var data = _.clone(model);
            var _id = data._id;
            delete data._id;
            console.log('attempting to saveModel (collection, props.id, state.data): ', this.props.collection, _id, data);
            if(typeof _id === 'undefined')
                this.socket().emit(this.props.collection + '::create', data, {}, saveCB.bind(this, 'create'));
            else
                this.socket().emit(this.props.collection + '::patch', _id, data, {}, saveCB.bind(this, 'patch'));
        }, 100),
        deleteModel: function(id) {
            this.socket().emit(this.props.collection + '::remove', id, {}, function(error, data) {
                console.log('SOCKET DELETE - err, res: ', err, res);
            });
        },
        refreshModel: function() {
            this.socket().emit(this.props.collection + '::get', this.props.id, {}, function(error, data) {
                console.log('SOCKET GET - err, res: ', err, res);
                this.setState({data: data});
            }.bind(this));
        },
        refreshCollection: function() {
            this.socket().emit(this.props.collection + '::find', {}, function(error, data) {
                console.log('SOCKET FIND - err, res: ', error, data);
                this.setState({data: data});
            }.bind(this));
        },
        collectionData: function() {
            var data = [];
            //TODO: clean up this garbage if statement. It shouldn't be necessary... but ie. column-list needs data... so i dunno...
            if(this.state && this.state.data)
                data = this.state.data;

            return data;
        },
        socket: function() {
            return sockets[this.url];
        },
        setupSocket: function(url) {
        },
        addPatchEventCallback: function(model, id, callback) {
            //This well only happen once per socket per model. Many components well have this mixin, but should fail on the if statement.
            if(!this.patchCallbacks[model]) {
                this.patchCallbacks[model] = {}
                
            }
            if(!this.patchCallbacks[model][id])
                this.patchCallbacks[model][id] = [];

            this.patchCallbacks[model][id].push(callback);
        },
        addCreateDeleteEventCallback: function() {
        },
        componentDidMount: function() {
           if(!this.url)   throw {message: 'SocketModelMixin requires url to be set in component class'};
           this.setupSocket();

            this.socket().on('connect', function() {
                console.log('connected to the socket [' + this.url + ']! collection, id: ', this.props.collection, this.props.id);
                
                if(this.props.data)
                    this.setState({data: this.props.data});
                else if(this.props.id)
                    this.refreshModel();
                else if(this.url)
                    this.refreshCollection();
            }.bind(this));
           this.socket().handleModelChange(this.props.collection, this.props.id, function(item) {
                console.log('SOCKET ON updated - item: ', item, this.setModel);
                if(this.setModel)
                    this.setModel(item);
                else
                    this.setState({data: item});
           }.bind(this));
        },
        componentDidUpdate: function(prevProps, prevState) {
            if(!prevState || !something(prevState))
                return;
            //TODO: this is ugly, find cleaner solution.
            if((this.props.data && this.props.data.id) || this.props.id)
                this.saveModel((this.getModel)
                    ? this.getModel()      //call getModel if it exists, for the model
                    : this.state.data);     //otherwise just use the state, because the programmer was too lazy to make a getModel fnc

            else if(this.url) {
                console.log('collection update: ', this.state.data);
                //if there is a new model in the collection
                if(prevState.data.length < this.state.data.length)
                    this.saveModel(this.state.data[this.state.data.length - 1]);
                //if a model was removed from the collection
                else if(prevState.data.length > this.state.data.length)
                    prevState.data.forEach(function(model, index) {
                        if(!this.state.data.some(function(item) {
                                return item._id == model._id;
                            }))
                            this.deleteModel(model._id);
                    }.bind(this));
            }
        },
    };

    function socketHandler() {
        this.callbacks = {};
        this.sockets = {};

        this.getSocket = function(url) {
            if(!this.sockets[url])
                this.setupSocket(url);

            return this.sockets[url];
        };

        this.prepareModelSocket = function(url, collection, id, createCallback) {
            this.getSocket(url);

            this.addModelEvents(url, collection, id, createCallback);
        };

        this.prepareCollectionSocket = function(url, collection, createCallback, deleteCallback) {
            this.getSocket(url);

            this.addCollectionEvents(url, collection, createCallback, deleteCallback);
        };

        this.setupSocket = function(url) {
            var socket = new io();
           
            //create socket.
            this.sockets[url] = socket.connect(url);
            this.callbacks[url] = { patch: {}, create: {}, 'delete': {} };
        };

        this.addModelEvents = function(url, collection, id, patchCallback) {
            //TODO: make an event system, so I can remove some of this duplicated code.
            if(!this.callbacks[url].patch[collection]) {
                //If this is the first patch on this collection, then add the event.
                this.callbacks[url].patch[collection] = {};
                this.getSocket(url).on(collection + ' patched', function(item) {
                    console.log('update socket occured!!!', item);
                    //if a model was updated, and that model has a callback on it's id, then call all callbacks for it.
                    if(this.callbacks[url].patch[collection][item._id])
                        this.callbacks[url].patch[collection][item._id].forEach(function(itemCallback) { itemCallback(item) });
                }.bind(this));
            }

            if(!this.callbacks[url].patch[collection][id])
                this.callbacks[url].patch[collection][id] = [];

            this.callbacks[url].patch[collection][id].push(patchCallback);
        };

        this.addCollectionEvents = function(url, collection, createCallback, deleteCallback) {
            //TODO: make a function to do this more conviniently??
            if(!this.callbacks[url].create[collection]) {
                this.callbacks[url].create[collection] = [];
                this.getSocket(url).on(collection + ' created', function(item) {
                    console.log('create model on socket occured!!!', item);

                    //call all callbacks for this collection under create.
                    this.callbacks[url].create[collection].forEach(function(itemCallback) { itemCallback(item) });
                }.bind(this));
            }


            this.callbacks[url].create[collection].push(createCallback);

            if(!this.callbacks[url]['delete'][collection]) {
                this.callbacks[url]['delete'][collection] = [];
                this.getSocket(url).on(collection + ' removed', function(item) {
                    console.log('removed model on socket occured!!!', item);

                    //if a model was updated, and that model has a callback on it's id, then call all callbacks for it.
                    if(this.callbacks[url]['delete'][collection])
                        this.callbacks[url]['delete'][collection].forEach(function(itemCallback) { itemCallback(item) });
                }.bind(this));
            }

            this.callbacks[url]['delete'][collection].push(deleteCallback);
        };
    };

    module.exports = SocketModelMixin;
})();


//TODO: putsomewhere better. This is duplicated in rest and maybe elsewhere?
function something(obj) {
    return (typeof obj !== 'undefined') && (obj.length || hasItem(obj));
}

function hasItem(obj) {
    for(var k in obj)
        return true;
    return false;
}
