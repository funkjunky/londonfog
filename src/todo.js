var React = require('react/addons');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SocketModelMixin = require('./mixins/socketmodelmixin');
var SocketMixin = require('./mixins/socketmixin');

var Todo = React.createClass({displayName: "Todo",
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, SocketModelMixin],
    getDefaultProps: function() {
        //TODO: apparently the object doesn't exist yet? so we can't use members.
        //var newItem = this.getNewItem();
        var newItem = {title: '', status: 'new',};
        return {collection: 'todo', data: newItem};
    },
    getInitialState: function() {
        //TODO: there must be a better way... I can't just return props.data, because then they reference the same object.
        return {
            title: this.props.data.title,
            status: this.props.data.status,
            project: this.props.data.project,
            task: this.props.data.task,
        };
    },
    getData: function() {
        return React.addons.update(this.props.data, {
            title: {$set: this.state.title},
            status: {$set: this.state.status}
        });
    },
    setData: function(model) {
        this.setState({ title: model.title, status: model.status });
    },
    getNewItem: function() { //this is like the default data... perhaps a better name?
        return {title: '', status: 'new',};
    },
    saveModelAndClear: function() {
        this.saveModel(this._getData(), function() {
            this._setData(this.getNewItem());
        }.bind(this));
    },
    handleChange: function(event) {
        this.setState({title: event.target.value});
    },
    changeStatus: function(status) {
        this.setState({status: status});
    },
    render: function() {
        var self = this;
        return (
            React.createElement("div", null, 
                !this.props.disabled ? React.createElement("span", null, 
                     this.state.status == 'new'    ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'active') }, "Start") : null, 
                     this.state.status == 'active' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'paused') }, "Pause") : null, 
                     this.state.status == 'active' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'finished') }, "Finish") : null, 
                     this.state.status == 'paused' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'active') }, "Continue") : null, 
                     this.state.status == 'paused' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'frozen') }, "Freeze") : null, 
                     this.state.status == 'frozen' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'paused') }, "Unfreeze") : null, 
                     this.state.status == 'finished' ? React.createElement("button", {type: "button", onClick:  this.changeStatus.bind(this, 'paused') }, "Undo Finished") : null
                ) : null, 
                React.createElement("p", null, React.createElement(ContentEditable, {html: this.state.title, onChange: this.handleChange, onSubmit: this.saveModelAndClear})), 
                React.createElement("span", null, 
                     this.state.task ? React.createElement(TaskBadge, {task: this.state.task}) : null, 
                     this.state.project ? React.createElement(ProjectBadge, {project: this.state.project}) : null, 
                     (!this.state.task && !this.state.project) ? React.createElement("button", {type: "button"}, "Assign") : null
                ), 
                (!this.props._id && !this.props.data._id) ? React.createElement("button", {type: "button", onClick: this.saveModelAndClear}, "Create") : null
            )
        );
   },
});

module.exports = Todo;
