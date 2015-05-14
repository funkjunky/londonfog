var React = require('react');

var ItemInstance = require('./item-instance');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');

var ColumnList = React.createClass({displayName: "ColumnList",
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, CollectionMixin],
    getInitialState: function() {
        return {
            beingSaved: [],
            data: [],
        };
    },
    removeItem: function(index, _id) {
        this.deleteModel(_id);
        this.state.data.splice(index, 1); //first remove the item, then clone the array...
        this.setState({ data: this.state.data });
    },
    render: function() {
        return (
            React.createElement("div", {style: {border: 'solid 1px black'}}, 
                React.createElement("ul", null, 
                    React.createElement("li", {key: "newItem"}, 
                        React.createElement(ItemInstance, {tag: this.props.collection})
                    ), 
                    this.state.beingSaved.map(function(item, index) {
                        return (
                            React.createElement("li", {key: item.title}, 
                                React.createElement(ItemInstance, {data: item, tag: this.props.collection, disabled: "true"})
                            )
                        );
                    }, this), 
                    this.state.data.map(function(item, index) {
                        return (
                            React.createElement("li", {key: item._id}, 
                                React.createElement(ItemInstance, {data: item, tag: this.props.collection}), React.createElement("button", {type: "button", onClick:  this.removeItem.bind(this, index, item._id) }, "X")
                            )
                        );
                    }, this)
                )
            )
        );
    },
});

module.exports = ColumnList;
