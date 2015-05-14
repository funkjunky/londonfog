//REQUIRES SOCKETMIXIN
var socketHandler = require('./sockethandler');

var  SocketCollectionMixin = {
    refreshData: function() {
        this.socket().emit(this.props.collection + '::find', {}, function(error, data) {
            console.log('REFRESH - SOCKET ON UPDATED - collection: ', data);
            this._setData(data);
        }.bind(this));
    },

    componentDidMount: function() {
        this.socket().on('connect', function() {
            socketHandler.addCollectionEvents(this.url, this.props.collection, function itemCreated(newItem) {
                console.log('CREATE - SOCKET ON UPDATED - collection: ', this.props.collection);
                
                this.setState({data: this._getData().concat([newItem])});
            }.bind(this), function itemDeleted(deletedItem) {
                var data = this._getData().slice(0);
                //TODO: clean up messy too lengthy code. This is a simple operation, and the code should be just as simple.
                var foundIndex = data.findIndex(function(item) {
                    for(key in item)
                        if(item[key] != deletedItem[key])
                            return false;

                    return true;
                });
                if(foundIndex != -1)
                    data.splice(foundIndex, 1);

                this.setState({data: data});
            }.bind(this));
        }.bind(this));
    },
};

//TODO: move to a better location... maybe a shims file.
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

module.exports = SocketCollectionMixin;
