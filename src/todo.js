var React = require('react/addons');
var _ = require('underscore');

var request = require('superagent');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SelectionModal = require('./selection-modal');

var SocketModelMixin = require('./mixins/socketmodelmixin');
var StateShortcuts = require('./mixins/stateshortcuts');
var SocketMixin = require('./mixins/socketmixin');
var Palette = require('./palette');
var Styles = require('./styles');

//Note: during getDefaultProps, none of the member methods exist yet. Further AFTERWARDS, getDefaultProps no longer exists... so I have to rely on an external function.
function blankTodo() {
    return {title: '',};
}

var Todo = React.createClass({displayName: "Todo",
    url: 'http://localhost:1212/',
    //the button states and labels displayed while in each state.

    mixins: [SocketMixin, SocketModelMixin, StateShortcuts],
    getDefaultProps: function() {
        return {collection: 'todo', data: blankTodo()};
    },
    getInitialState: function() {
        //TODO: so bad...
        this.props.data.editingTitle = false;
        if(this.props.editingTitle)
            this.props.data.editingTitle = this.props.editingTitle;
        //TODO: this is hella ugly...
        return this.props.data;
    },
    getData: function() {
        var data = {
            title: this.state.title,
            complete: this.state.complete,
        };
        if(this.state._id)
            data._id = this.state._id;

        return data;
    },
    setData: function(data) {
        this.setState({title: data.title, complete: data.complete});
    },
    saveModelAndClear: function() {
        if(this.props.createOverride) {
            this.props.createOverride(this._getData());
            //TODO: createOverrride should return a promise, which we use to blank the todo... Everything shouldj be promises!!!
            this._setData(blankTodo());
        }
        else
            this.saveModel(this._getData(), function() {
                this._setData(blankTodo());
            }.bind(this));
    },
    handleTitleChange: function(event) {
        this.setState({title: event.target.value});
    },
    complete: function(event) {
        this.setState({complete: !this.state.complete});
    },
    getStatus: function() {
        if(this.state.complete)
            return 'finished';
        else if(this.state.task)
            return this.state.task.status;
        else
            return 'unassigned';
    },
    componentDidUpdate: function() {
        if(this.props.stateChanged)
            this.props.stateChanged(this._getData());

        if(this.state.editingTitle) {
            console.log('focusing: ', this.refs.todoTitle.props.value);
            React.findDOMNode(this.refs.todoTitle).focus();
        }
            
    },
    componentWillmount: function() {
        if(this.isNew()) {
        //TODO: is this needed? I don't think it is. Other things set editingTitle as necessary.
            console.log('is new: ', this.state);
            this.setState('editingTitle', true);
        }
    },
    componentDidMount: function() {
        if(this.state.editingTitle)
            React.findDOMNode(this.refs.todoTitle).focus();
    },
    isNew: function() {
        return !this.props._id && !this.props.data._id && (typeof this.props.data.id === 'undefined');
    },
    render: function() {
        var status = this.getStatus();
        var style = this.props.style || {};
        style.backgroundColor = Palette[status];
        var inputStyle = {backgroundColor: Palette[status + 'light'], display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2};

        //<ContentEditable html={this.state.title} onChange={this.handleTitleChange} onSubmit={this.saveModelAndClear} style={{backgroundColor: Palette[status + 'light'], display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2}}></ContentEditable>
        return (
            React.createElement("div", {style: Styles.with('columnRowTable', style)}, 
                 this.isNew()
                ?   React.createElement("span", {onClick: this.saveModelAndClear, style: Styles.with('rowButton', {backgroundColor: 'white', fontSize: 20})}, "Create")
                :   React.createElement("span", {onClick: this.complete, style: Styles.with('rowButton', {backgroundColor: 'white'})}, 
                        React.createElement("input", {type: "hidden", value: this.state.completed}), 
                         this.state.complete ? React.createElement("i", {className: "fa fa-check"}) : React.createElement("i", {className: "fa"})
                    ), 
                 this.state.editingTitle
                    ? React.createElement("input", {ref: "todoTitle", onBlur: this.toggleState('editingTitle'), onChange: this.handleTitleChange, onKeyUp: this.enter(this.saveModelAndClear), style: inputStyle, value: this.state.title})
                    : React.createElement("span", {onClick: this.toggleState('editingTitle'), style: inputStyle}, this.state.title), 
                React.createElement("span", {onClick: this.toggleState('selectingBadge')}, 
                     this.state.task ? ( React.createElement(TaskBadge, {task: this.state.task})  ) : null, 
                     this.state.task ? ( React.createElement(ProjectBadge, {project: this.state.task.project})  ) : null, 
                     this.state.project ? React.createElement(ProjectBadge, {project: this.state.project}) : null, 
                     (!this.state.task && !this.state.project) ? React.createElement("span", {style: Styles.with('rowBadge', {backgroundColor: 'white'})}, "Task?") : null
                ), 
                 this.state.selectingBadge
                    ? React.createElement(SelectionModal, {options: this.projectsAndTasks(), choiceCB: this.setTaskAndProject, closeCB: this.toggleState('selectingBadge')})
                    : null
            )
        );
   },

   setTaskAndProject: function(taskAndProject) {
        //make a socket call to save the todo to the project
        //make a socket call to delete the project
   },

   projectsAndTasks: function() {
         var projects = JSON.parse(localStorage.getItem('projects')) || [];
         
         return projects.reduce(function(collector, project) {
            return collector.concat(
                project.tasks.map(function(task) {
                    return {key: {task: task, project: project}, value: task.title, html: ( React.createElement("span", null, task.title, " ", React.createElement(ProjectBadge, {project: project})) )};
                }),
                [{key: {project: project}, value: project.name, html: ( React.createElement("span", null, React.createElement(ProjectBadge, {project: project}), " ", React.createElement("span", {style: {fontWeight: 'bold'}}, project.name)) )}]
            );
         }, []);
   },
});

module.exports = Todo;
