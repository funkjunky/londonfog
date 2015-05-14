//REQUIRES SOCKETMIXIN
var socketHandler = require('./sockethandler');

var  SocketModelMixin = {
    refreshData: function() {
        if(!this.getId())
            throw 'ERROR: MODEL DOESNT HAVE _id SET!';
        this.socket().emit(this.props.collection + '::get', this.getId(), {}, function(error, data) {
            console.log('SOCKET GET - err, res: ', err, res);
            this._setData(data);
        }.bind(this));
    },

    getId: function() {
        if(!(this.props.data && this.props.data._id) && !this.props._id)
            return false;
        else
            return this.props._id || this.props.data._id;
    },

    componentWillMount: function() {
        if(!this.getId())
            this.autosync = false;
    },

    componentDidMount: function() {
        if(!this.autosync)
            return;

        socketHandler.addModelEvents(this.url, this.props.collection, this.getId(), function(item) {
            console.log('SOCKET ON UPDATED - item: ', item);
            this._setData(item);
        }.bind(this));
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return JSON.stringify(nextState) != JSON.stringify(this.state);
    },

    componentDidUpdate: function(prevProps, prevState) {
        if(!this.autosync || !prevState || !something(prevState))   //TODO: remove hacky stuff, once I figure out a way to fix reactjs
            return;

        this.saveModel(this._getData(), function(error, result) {
            this._setData(result);
        }.bind(this));
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
