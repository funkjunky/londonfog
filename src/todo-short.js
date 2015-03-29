var React = require('react');
var TaskBadge = require('./task-badge.js');
var ProjectBadge = require('./project-badge.js');

var TodoShort = React.createClass({displayName: "TodoShort",
   render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("span", null, 
                     this.todo.status == 'new'    ? React.createElement("button", {type: "button"}, "Start") : null, 
                     this.todo.status == 'active' ? React.createElement("button", {type: "button"}, "Pause") : null, 
                     this.todo.status == 'active' ? React.createElement("button", {type: "button"}, "Finish") : null, 
                     this.todo.status == 'paused' ? React.createElement("button", {type: "button"}, "Continue") : null, 
                     this.todo.status == 'paused' ? React.createElement("button", {type: "button"}, "Freeze") : null
                ), 
                React.createElement("p", null, React.createElement(ContentEditable, {html: this.state.title})), 
                React.createElement("span", null, 
                     this.todo.task ? React.createElement(TaskBadge, {task: this.todo.task}) : null, 
                     this.todo.project ? React.createElement(ProjectBadge, {project: this.todo.project}) : null, 
                     (!this.todo.task && !this.todo.project) ? React.createElement("button", {type: "button"}, "Assign") : null
                )
            )
        );
   },
});

module.exports = TodoShort;
