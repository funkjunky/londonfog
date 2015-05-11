/**
 * Note: This mixin can't be used without either SocketCollectionMixin or SocketModelMixin!
 **/
var _ = require('underscore');
var socketHandler = require('./sockethandler');

(function() {
    //TODO: don't hard code the url... I'd like to be able to sahre this mixin at some point.
    var url = 'localhost:2020';

    var SocketMixin = {
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

        _getData: function(data) {
            if(this.getData)
                return this.getData(data);
            else
                return this.state.data;
        },

        componentDidMount: function() {
            if(!this.url)
                throw 'SocketMixin requires url to be set in component class';

            this.socket().on('connect', function() {
                console.log('connected to the socket [' + this.url + ']! collection, id: ', this.props.collection, this.props.id);

                if(this.props.data)
                    this._setData({data: this.props.data});  //TODO: Is this necessary? What if people wanted to avoid putting all data in the state
                else
                    this.refreshData();
            }.bind(this));
        },
    };

    module.exports = SocketMixin;
})();
