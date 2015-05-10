var React = require('react/addons');
var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var ModelMixin = require('./mixins/socketmodelmixin');

var Todo = React.createClass({displayName: "Todo",
    url: 'http://localhost:1212/',
    mixins: [ModelMixin],
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
    getModel: function() {
        return React.addons.update(this.props.data, {
            title: {$set: this.state.title},
            state: {$set: this.state.state}
        });
    },
    setModel: function(model) {
    console.log('set model called: ', model);
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
            React.createElement("div", null, 
                React.createElement("span", null, 
                     this.state.state == 'new'    ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'active') }, "Start") : null, 
                     this.state.state == 'active' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'paused') }, "Pause") : null, 
                     this.state.state == 'active' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'finished') }, "Finish") : null, 
                     this.state.state == 'paused' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'active') }, "Continue") : null, 
                     this.state.state == 'paused' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'frozen') }, "Freeze") : null, 
                     this.state.state == 'frozen' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'paused') }, "Unfreeze") : null, 
                     this.state.state == 'finished' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'paused') }, "Undo Finished") : null
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
