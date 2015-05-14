var React = require('react');
var Project = require('./project');
var Task = require('./task');
var Todo = require('./todo');

var ItemInstance = React.createClass({displayName: "ItemInstance",
    render: function() {
        switch(this.props.tag) {
            case 'project': 
                return (
                    React.createElement(Project, React.__spread({},  this.props))
                );
            case 'task': 
                return (
                    React.createElement(Task, React.__spread({},  this.props))
                );
            case 'todo': 
                return (
                    React.createElement(Todo, React.__spread({},  this.props))
                );
        }
        return (React.createElement("h1", {style: {color: 'red'}}, "No Item Instance"));
    },
});

module.exports = ItemInstance;
