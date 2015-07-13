var React = require('react');

var Todo = require('./todo');
var SocketMixin = require('./mixins/socketmixin');
var CollectionMixin = require('./mixins/socketcollectionmixin');
var Styles = require('./styles');

//This represents a list of slower items. Things you need to add manually over time.
var BasicList = React.createClass({displayName: "BasicList",
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
            React.createElement("div", null, 
                React.createElement("div", null, "----"), 
                this.state.data.map(function(project, index) {
                    return project.todos.map(function(todo, index) {
                        return (
                            React.createElement("div", {key: todo._id, style: Styles.with('fullWidth', {marginLeft: 20})}, 
                                React.createElement(Todo, {data: todo, tag: this.props.collection})
                            )
                        );
                    }, this)
                    .concat(project.tasks.map(function(task, index) {
                        console.log('todolist task: ', task);
                        return task.todos.map(function(todo, index) {
                            console.log('todo task: ', todo);
                            return (
                                React.createElement("div", {key: todo._id, style: Styles.with('fullWidth', {marginLeft: 40})}, 
                                    React.createElement(Todo, {data: todo, tag: this.props.collection})
                                )
                            );
                        }, this);
                    }, this));
                }, this)
            )
        );
    },
});

module.exports = BasicList;
