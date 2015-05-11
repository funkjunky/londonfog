//REQUIRES SOCKETMIXIN
var socketHandler = require('./sockethandler');

var  SocketModelMixin = {
    refreshData: function() {
        this.socket().emit(this.props.collection + '::get', this.props.id, {}, function(error, data) {
            console.log('SOCKET GET - err, res: ', err, res);
            this.setState({data: data});
        }.bind(this));
    },

    getId: function() {
        return this.props.id || this.props.data._id;
    },

    componentDidMount: function() {
        if(!this.props.data && !this.props.id)
            throw 'SocketModelMixin requires either an id prop or a data prop. Otherwise where do we get data?';

        this.socket().on('connect', function() {
            socketHandler.addModelEvents(this.url, this.props.collection, this.props.getId(), function(item) {
                console.log('SOCKET ON UPDATED - item: ', item);
                this._setData(item);
            }.bind(this));
        }.bind(this));
    },

    componentDidUpdate: function(prevProps, prevState) {
        if(!prevState || !something(prevState))   //TODO: remove hacky stuff
            return;

        this.saveModel(this._getData());
    },
};

//TODO: putsomewhere better. This is duplicated in rest and maybe elsewhere?
function something(obj) {
    return (typeof obj !== 'undefined') && (obj.length || hasItem(obj));
}

function hasItem(obj) {
    for(var k in obj)
        return true;
    return false;
}

module.exports = SocketModelMixin;
