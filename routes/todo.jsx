var React = require('react');
var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');

var Todo = React.createClass({
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
            <div>
                <span>
                    { this.state.state == 'new'    ? <button type="button" onClick={ function() { this.setState({status: 'new'}); } }>Start</button> : null }
                    { this.state.state == 'active' ? <button type="button">Pause</button> : null }
                    { this.state.state == 'active' ? <button type="button">Finish</button> : null }
                    { this.state.state == 'paused' ? <button type="button">Continue</button> : null }
                    { this.state.state == 'paused' ? <button type="button">Freeze</button> : null }
                </span>
                <p><ContentEditable html={this.state.title} onChange={this.handleChange}></ContentEditable></p>
                <span>
                    { this.state.task ? <TaskBadge task={this.state.task} /> : null }
                    { this.state.project ? <ProjectBadge project={this.state.project} /> : null }
                    { (!this.state.task && !this.state.project) ? <button type="button">Assign</button> : null }
                </span>
            </div>
        );
   },
});

module.exports = Todo;
