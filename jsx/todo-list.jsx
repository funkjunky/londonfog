var React = require('react');

var Todo = require('./todo');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');
var Styles = require('./styles');

var CommonFilters = require('./helpers/commonfilters');

//This represents a list of slower items. Things you need to add manually over time.
var TodoList = React.createClass({
    url: 'http://localhost:1212/',
    dataKey: 'data',

    mixins: [SocketMixin, CollectionMixin],
    getDefaultProps: function() {
        return {collection: 'project'};
    },
    getInitialState: function() {
        return {
            data: [],
        };
    },
    render: function() {
        return (
            <div>
                <div>----</div>
                {this.state.data.map(function(project, index) {
                    return this.filterIfExists(project.todos).reverse().map(function(todo, index) {
                        return (
                            <div key={todo._id} style={Styles.with('fullWidth', {marginLeft: 20})}>
                                <Todo data={todo} tag={this.props.collection} />
                            </div>
                        );
                    }, this)
                    .concat(project.tasks.reverse().reduce(function(collector, task) {
                        //TODO: I should also include all TODOs from a task that matches the filter... So I need to tell the below filter to always pass if the task matches.
                        return collector.concat(this.filterIfExists(task.todos).map(function(todo, index) {
                            return (
                                <div key={todo._id} style={Styles.with('fullWidth', {marginLeft: 40})}>
                                    <Todo data={todo} tag={this.props.collection} />
                                </div>
                            );
                            //TODO: below: it's so inconsistent with bind... I should make it more consistent, or use my fancy way to fix it.
                        }, this));
                    }.bind(this), []));
                }, this)}
            </div>
        );
    },

    filterIfExists: function(arr) {
        if(this.props.filter)
            return arr.filter(CommonFilters.byAnyElementSubstring(this.props.filter)); 
        else
            return arr;
    },
});

module.exports = TodoList;
