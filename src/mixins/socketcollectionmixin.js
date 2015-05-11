//REQUIRES SOCKETMIXIN
var socketHandler = require('./sockethandler');

var  SocketCollectionMixin = {
    //TODO: make it so this isn't needed!!
    collectionData: function() {
        var data = [];
        //TODO: clean up this garbage if statement. It shouldn't be necessary... but ie. column-list needs data... so i dunno...
        if(this.state && this.state.data)
            data = this.state.data;

        return data;
    },

    refreshData: function() {
        this.socket().emit(this.props.collection + '::find', {}, function(error, data) {
            console.log('SOCKET ON UPDATED - collection: ', data);
            this._setData(data);
        }.bind(this));
    },

    componentDidMount: function() {
        this.socket().on('connect', function() {
            socketHandler.addCollectionEvents(this.url, this.props.collection, function(collection) {
                console.log('SOCKET ON UPDATED - collection: ', collection);
                this._setData(collection);
            }.bind(this));
        }.bind(this));
    },

    //TODO: this requires the component to store it's data in the state.data variable. Should i inforce such a large state?
    componentDidUpdate: function(prevProps, prevState) {
        if(!prevState || !something(prevState))   //TODO: remove hacky stuff
            return;

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

module.exports = SocketCollectionMixin;
