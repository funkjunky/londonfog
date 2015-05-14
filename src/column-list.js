var React = require('react');

var ItemInstance = require('./item-instance');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');

var ColumnList = React.createClass({displayName: "ColumnList",
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, CollectionMixin],
    getInitialState: function() {
        return {
            newItem: this.getNewItem(),
            beingSaved: [],
            data: [],
        };
    },
    getNewItem: function() { //This is for collection mixin. TODO: make it more obvious this is for a mixin.
        if(this.props.collection == 'todo')
            return {title: '', status: 'new',};
        else if(this.props.collection == 'project')
            return {title: '',};
    },
    addItem: function() {
        console.log('newitem: ', this.state.newItem);
        //this.saveModel(this.state.newItem);
        this.setState({beingSaved: this.state.beingSaved.concat([this.state.newItem])});
        console.log('newitem after beingsaved: ', this.state.newItem);
        this.setState({newItem: this.getNewItem()});
    },
    removeItem: function(index, _id) {
        this.deleteModel(_id);
        this.state.data.splice(index, 1); //first remove the item, then clone the array...
console.log('length: ', this.state.data.length);
        this.setState({ data: this.state.data });
    },
    render: function() {
        return (
            React.createElement("div", {style: {border: 'solid 1px black'}}, 
                React.createElement("ul", null, 
                    React.createElement("li", {key: "newItem"}, 
                        React.createElement(ItemInstance, {tag: this.props.collection, data: this.state.newItem})
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
