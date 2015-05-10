var React = require('react');

var ItemInstance = require('./item-instance');
var ModelMixin = require('./mixins/socketmodelmixin');

var ColumnList = React.createClass({
    url: 'http://localhost:1212/',
    mixins: [ModelMixin],
    render: function() {
        return (
            <div>
                <div>Filters and such...</div>
                <ul>
                    {this.collectionData().map(function(item) {
                        return (
                            <li key={item.id}>
                                <ItemInstance data={item} tag={this.props.collection} />
                            </li>
                        );
                    }.bind(this))}
                </ul>
            </div>
        );
    },
});

module.exports = ColumnList;
