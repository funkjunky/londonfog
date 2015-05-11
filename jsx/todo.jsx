var React = require('react/addons');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SocketModelMixin = require('./mixins/socketmodelmixin');
var SocketMixin = require('./mixins/socketmixin');

var Todo = React.createClass({
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, SocketModelMixin],
    getDefaultProps: function() {
        return {collection: 'todo'};
    },
    getInitialState: function() {
        //TODO: there must be a better way... I can't just return props.data, because then they reference the same object.
        return {
            title: this.props.data.title,
            state: this.props.data.status,
            project: this.props.data.project,
            task: this.props.data.task,
        };
    },
    getData: function() {
        return React.addons.update(this.props.data, {
            title: {$set: this.state.title},
            state: {$set: this.state.state}
        });
    },
    setData: function(model) {
        this.setState({ title: model.title, state: model.state });
    },
    handleChange: function(event) {
        console.log('new todo title: ', event.target.value);
        //TODO: don't call setState twice
        this.setState({title: event.target.value});
    },
    changeStatus: function(status) {
        this.setState({state: status});
    },
    render: function() {
        var self = this;
        return (
            <div>
                <span>
                    { this.state.state == 'new'    ? <button type="button" onClick={ this.changeStatus.bind(this, 'active') }>Start</button> : null }
                    { this.state.state == 'active' ? <button type="button" onClick={ this.changeStatus.bind(this, 'paused') }>Pause</button> : null }
                    { this.state.state == 'active' ? <button type="button" onClick={ this.changeStatus.bind(this, 'finished') }>Finish</button> : null }
                    { this.state.state == 'paused' ? <button type="button" onClick={ this.changeStatus.bind(this, 'active') }>Continue</button> : null }
                    { this.state.state == 'paused' ? <button type="button" onClick={ this.changeStatus.bind(this, 'frozen') }>Freeze</button> : null }
                    { this.state.state == 'frozen' ? <button type="button" onClick={ this.changeStatus.bind(this, 'paused') }>Unfreeze</button> : null }
                    { this.state.state == 'finished' ? <button type="button" onClick={ this.changeStatus.bind(this, 'paused') }>Undo Finished</button> : null }
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
