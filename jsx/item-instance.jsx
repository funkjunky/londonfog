var React = require('react');
var Project = require('./project');
var Task = require('./task');
var Todo = require('./todo');

var ItemInstance = React.createClass({
    render: function() {
        switch(this.props.tag) {
            case 'project': 
                return (
                    <Project {...this.props} />
                );
            case 'task': 
                return (
                    <Task {...this.props} />
                );
            case 'todo': 
                return (
                    <Todo {...this.props} />
                );
        }
        return (<h1 style={{color: 'red'}}>No Item Instance</h1>);
    },
});

module.exports = ItemInstance;
