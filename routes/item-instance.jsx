var React = require('react');
var Project = require('./project.jsx');
var Task = require('./task.jsx');
var Todo = require('./todo.jsx');

var ItemInstance = React.createClass({
    render: function() {
        switch(this.props.tag) {
            case 'project': 
                return (
                    <Project data={this.props.data} />
                );
            case 'task': 
                return (
                    <Task data={this.props.data} />
                );
            case 'todo': 
                return (
                    <Todo data={this.props.data} />
                );
        }
        return (<h1 style={{color: 'red'}}>No Item Instance</h1>);
    },
});

module.exports = ItemInstance;
