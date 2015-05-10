var React = require('react');

var ItemInstance = require('./item-instance');
var ModelMixin = require('./mixins/socketmodelmixin');

var ColumnList = React.createClass({displayName: "ColumnList",
    url: 'http://localhost:1212/',
    mixins: [ModelMixin],
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", null, "Filters and such..."), 
                React.createElement("ul", null, 
                    this.collectionData().map(function(item) {
                        return (
                            React.createElement("li", {key: item.id}, 
                                React.createElement(ItemInstance, {data: item, tag: this.props.collection})
                            )
                        );
                    }.bind(this))
                )
            )
        );
    },
});

module.exports = ColumnList;
