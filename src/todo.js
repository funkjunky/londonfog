var React = require('react');
var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');

var Todo = React.createClass({displayName: "Todo",
    getInitialState: function() {
        //TODO: there must be a better way... I can't just return props.data, because then they reference the same object.
        return {
            title: this.props.data.title,
            state: this.props.data.status,
            project: this.props.data.project,
            task: this.props.data.task,
        };
    },
    handleChange: function(event) {
        this.setState({title: event.target.value});
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("span", null, 
                     this.state.state == 'new'    ? React.createElement("button", {type: "button", onClick:  function() { this.setState({status: 'new'}); }}, "Start") : null, 
                     this.state.state == 'active' ? React.createElement("button", {type: "button"}, "Pause") : null, 
                     this.state.state == 'active' ? React.createElement("button", {type: "button"}, "Finish") : null, 
                     this.state.state == 'paused' ? React.createElement("button", {type: "button"}, "Continue") : null, 
                     this.state.state == 'paused' ? React.createElement("button", {type: "button"}, "Freeze") : null
                ), 
                React.createElement("p", null, React.createElement(ContentEditable, {html: this.state.title, onChange: this.handleChange})), 
                React.createElement("span", null, 
                     this.state.task ? React.createElement(TaskBadge, {task: this.state.task}) : null, 
                     this.state.project ? React.createElement(ProjectBadge, {project: this.state.project}) : null, 
                     (!this.state.task && !this.state.project) ? React.createElement("button", {type: "button"}, "Assign") : null
                )
            )
        );
   },
});

module.exports = Todo;
