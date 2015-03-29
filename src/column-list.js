var React = require('react');

var ItemInstance = require('./item-instance');

var ColumnList = React.createClass({displayName: "ColumnList",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", null, "Filters and such..."), 
                React.createElement("ul", null, 
                    this.props.items.map(function(item) {
                        return (
                            React.createElement("li", null, 
                                React.createElement(ItemInstance, {data: item, tag: this.props.tag})
                            )
                        );
                    }.bind(this))
                )
            )
        );
    },
});

module.exports = ColumnList;
