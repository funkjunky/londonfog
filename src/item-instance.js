var React = require('react');
var Project = require('./project');
var Task = require('./task');
var Todo = require('./todo');

var ItemInstance = React.createClass({displayName: "ItemInstance",
    render: function() {
        switch(this.props.tag) {
            case 'project': 
                return (
                    React.createElement(Project, {data: this.props.data})
                );
            case 'task': 
                return (
                    React.createElement(Task, {data: this.props.data})
                );
            case 'todo': 
                return (
                    React.createElement(Todo, {data: this.props.data})
                );
        }
        return (React.createElement("h1", {style: {color: 'red'}}, "No Item Instance"));
    },
});

module.exports = ItemInstance;
