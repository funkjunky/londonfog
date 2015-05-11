var React = require('react');

var ItemInstance = require('./item-instance');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');

var ColumnList = React.createClass({
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, CollectionMixin],
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
