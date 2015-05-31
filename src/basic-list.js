var React = require('react');

var ItemInstance = require('./item-instance');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');
var Styles = require('./styles');

//This represents a list of slower items. Things you need to add manually over time.
var BasicList = React.createClass({displayName: "BasicList",
    url: 'http://localhost:1212/',
    dataKey: 'data',

    mixins: [SocketMixin, CollectionMixin],
    getInitialState: function() {
        return {
            data: [],
        };
    },
    render: function() {
        return (
            React.createElement("div", {style: this.props.style}, 
                this.state.data.map(function(item, index) {
                    return (
                        React.createElement("div", {key: item._id, style: Styles.fullWidth}, 
                            React.createElement(ItemInstance, {data: item, tag: this.props.collection})
                        )
                    );
                }, this)
            )
        );
    },
});

module.exports = BasicList;
