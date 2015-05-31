var React = require('react');

var ItemInstance = require('./item-instance');

var NewItemInstance = React.createClass({displayName: "NewItemInstance",
    render: function() {
        return (
            React.createElement("div", null, this.props.children)
        );
    },
});
