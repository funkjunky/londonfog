var React = require('react');

var ItemInstance = require('./item-instance');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');

var ColumnList = React.createClass({
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
console.log('length: ', this.state.data.length);
        this.setState({ data: this.state.data });
    },
    render: function() {
        return (
            <div style={{border: 'solid 1px black'}}>
                <ul>
                    <li key='newItem'>
                        <ItemInstance tag={this.props.collection} />
                    </li>
                    {this.state.beingSaved.map(function(item, index) {
                        return (
                            <li key={item.title}>
                                <ItemInstance data={item} tag={this.props.collection} disabled="true" />
                            </li>
                        );
                    }, this)}
                    {this.state.data.map(function(item, index) {
                        return (
                            <li key={item._id}>
                                <ItemInstance data={item} tag={this.props.collection} /><button type="button" onClick={ this.removeItem.bind(this, index, item._id) }>X</button>
                            </li>
                        );
                    }, this)}
                </ul>
            </div>
        );
    },
});

module.exports = ColumnList;
