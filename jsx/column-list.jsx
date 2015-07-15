var React = require('react');

var Todo = require('./todo');
var ItemInstance = require('./item-instance');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');
var Styles = require('./styles');

//A LIST OF TODOS... nothing else... I should rename this class at some point.
//This represents a list of quick to create items. With new items ready to be created just by typing and hitting enter in a single textbox.
var ColumnList = React.createClass({
    url: 'http://localhost:1212/',
    dataKey: 'data',

    mixins: [SocketMixin, CollectionMixin],
    getInitialState: function() {
        return {
            beingSaved: [],
            data: [],
        };
    },
    removeItem: function(index, _id) {
        this.deleteModel(_id);
        //TODO: add feedback to replace the fact that I no longer immediately remove the item I deleted.
        //this.state.data.splice(index, 1); //first remove the item, then clone the array...
        //this.setState({ data: this.state.data });
    },
    render: function() {
        return (
            <div>
                <div key='newItem'>
                    <Todo editingTitle={true} />
                </div>
                {this.state.beingSaved.map(function(item, index) {
                    return (
                        <div key={item.title} style={Styles.fullWidth}>
                            <ItemInstance data={item} tag={this.props.collection} disabled="true" />
                        </div>
                    );
                }, this)}
                {this.state.data.reverse().map(function(item, index) {
                    return (
                        <div key={item._id} style={Styles.fullWidth}>
                            <ItemInstance data={item} tag={this.props.collection} />
                            { this.state.focused || true ? <button type="button" onClick={ this.removeItem.bind(this, index, item._id) } style={{position: 'absolute', right: -30, top: 0}}>X</button> : null }
                        </div>
                    );
                }, this)}
            </div>
        );
    },
});

module.exports = ColumnList;
