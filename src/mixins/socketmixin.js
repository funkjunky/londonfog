/**
 * Note: This mixin can't be used without either SocketCollectionMixin or SocketModelMixin!
 **/
var _ = require('underscore');
var socketHandler = require('./sockethandler');

(function() {
    //TODO: don't hard code the url... I'd like to be able to sahre this mixin at some point.
    var url = 'localhost:2020';

    var SocketMixin = {
        autosync: true,

        saveModel: _.debounce(function(model, cb) {
            function saveCB(method, err, res) {
                console.log('SOCKET ' + method + ' - err, res: ', err, res);

                //TODO: put this code into the modelMixin. If a collection somehow calls saveModel, then I'm gonna break everything...
                this._setData(res);
                if(cb)
                    cb();
            }

            var data = _.clone(model);
            var _id = data._id;
            delete data._id;
            console.log('attempting to saveModel (collection, props.id, state.data): ', this.props.collection, _id, data);
            if(typeof _id === 'undefined')
                this.socket().emit(this.props.collection + '::create', data, {}, saveCB.bind(this, 'create'));
            else
                this.socket().emit(this.props.collection + '::patch', _id, data, {}, saveCB.bind(this, 'patch'));
        }, 500),
        deleteModel: function(id) {
            this.socket().emit(this.props.collection + '::remove', id, {}, function(error, data) {
                console.log('SOCKET DELETE - err, res: ', error, data);
            });
        },
        socket: function() {
            //socket handler well handle everything.
            return socketHandler.getSocket(this.url);
        },

        _setData: function(data) {
            if(this.setData)
                return this.setData(data);
            else
                return this.setState({data: data}); //if the user was too lazy to provide a setData function, then just shove things in the data param of state.
        },

        _getData: function() {
            if(this.getData)
                return this.getData();
            else
                return this.state.data;
        },

        componentDidMount: function() {
            if(!this.url)
                throw 'SocketMixin requires url to be set in component class';
            if(!this.autosync)
                return;

            this.socket().on('connect', function() {
                console.log('connected to the socket [' + this.url + ']! collection, id: ', this.props.collection);

                if(this.props.data)
                    this._setData({data: this.props.data});
                else
                    this.refreshData();
            }.bind(this));
        },
    };

    module.exports = SocketMixin;
})();
