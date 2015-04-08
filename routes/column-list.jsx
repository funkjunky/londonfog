var React = require('react');

var ItemInstance = require('./item-instance.jsx');

var ColumnList = React.createClass({
    render: function() {
        return (
            <div>
                <div>Filters and such...</div>
                <ul>
                    {this.props.items.map(function(item) {
                        return (
                            <li>
                                <ItemInstance data={item} tag={this.props.tag} />
                            </li>
                        );
                    }.bind(this))}
                </ul>
            </div>
        );
    },
});

module.exports = ColumnList;
