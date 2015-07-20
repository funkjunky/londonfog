//<ContentEditable autofocus={this.props.autofocus} html={this.state.title} onChange={this.handleTitleChange} onSubmit={this.saveModelAndClear} style={{backgroundColor: Palette[status + 'light'], display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2}}></ContentEditable>
var React = require('react');

var Styles = require('./styles');
var Palette = require('./palette');

var StateShortcuts = require('./mixins/stateshortcuts');

var ContentEditable = require('./content-editable');
var ProjectBadge = require('./project-badge');
var Todo = require('./todo');

function getNewTask() {
    return {
        title: '',
        status: 'new',
    };
}

var Task = React.createClass({displayName: "Task",
    mixins: [StateShortcuts],

    states: {
        new: {active: 'Start',},
        active: {paused: 'Pause', finished: 'Finish',},
        paused: {active: 'Continue', frozen: 'Freeze',},
        frozen: {paused: 'Unfreeze',},
        finished: {active: 'Not Yet Done',},
    },
    types: {
        bug: 'fa fa-bug',
        feature: 'fa fa-star',
        upgrade: 'fa fa-level-up',
    },

    getInitialState: function() {
        //TODO: all the code in this function is too inconsistent. I need a better way to say x = z.y or default. Regardless of whether z is undefined or not.
        var initialState = {
            title: (this.props.data) ? this.props.data.title : '',
            expanded: false,
            todos: [],
            editingTitle: false,
        };
        if(this.props.editingTitle)
            initialState.editingTitle = true;

        console.log('initial state task: ', initialState.todos, initialState.todos.length, this.props.data);
        if(this.props.data) {
            initialState.project = this.props.data.project;
            initialState.status = this.props.data.status || 'new';
            initialState.type = this.props.data.type || 'bug';
            initialState.todos = this.props.data.todos || [];
        }
        console.log('initial state task: ', initialState.todos, initialState.todos.length);

        return initialState;
    },

    getData: function() {
        var task = {
            title: this.state.title,
            status: this.state.status,
            type: this.state.type,
            todos: this.state.todos,
        };
        if(this.state.project)
            task.project = this.state.project;
        if(this.props.data.id || this.props.data.id === 0)
            task.id = this.props.data.id;

        return task;
    },

    saveAndClear: function() {
        var savedTask = this.props.saveCreatedTask(this.getData())
    },

    handleTitleChange: function(event) {
        this.setState({title: event.target.value});
    },

    setType: function(type) {
        this.setState({type: type, typeDropdown: false});
    },

    todoCreated: function(newTodo) {
        if(this.state.todos.length)
            newTodo.id = Math.max.apply(Math, this.state.todos);
        else
            newTodo.id = 0;

        this.setState(React.addons.update(this.state, { todos: { $push: [newTodo] } }));
        return newTodo;
    },

    todoChanged: function(index, todo) {
        this.setState(React.addons.update(this.state, { todos: { $splice: [[index, 1, todo]] } }));
    },

    componentDidUpdate: function() {
        if(this.props.stateChanged) {
            this.props.stateChanged(this.getData());
        }

        if(this.state.editingTitle) {
            console.log('focusing: ', this.state.title);
            console.log('focusing: ', this.refs.taskTitle.props.value);
            React.findDOMNode(this.refs.taskTitle).focus();
        }
    },

    componentDidMount: function() {
        if(this.state.editingTitle)
            React.findDOMNode(this.refs.taskTitle).focus();
    },

    expandTodoCreation: function() {
        this.toggleState('creatingTodos')();
        //Note: toggle state hasn't updated the variable yet, so we need to check the opposite.
        if(!this.state.creatingTodos)
            this.setState({expanded: true});
    },

    render: function() {
        console.log('task state: ', this.state);
        var isNew = typeof this.props.data.id === 'undefined';
        var todos = this.state.todos || []; //TODO: not need to define this with a default... why does this happen again? I think I solved it before.
        var inputStyle = {backgroundColor: Palette[status + 'light'], display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2};
        return (
            React.createElement("div", {style: this.props.style}, 
                React.createElement("div", {style: Styles.with('columnRowTable', {backgroundColor: Palette[this.state.status]})}, 
                     (todos.length) ? 
                        ((this.state.expanded)
                            ? React.createElement("i", {className: "fa fa-arrow-down", onClick: this.toggleState('expanded')})
                            : React.createElement("i", {className: "fa fa-arrow-right", onClick: this.toggleState('expanded')}))
                    : null, 
                     isNew
                        ? React.createElement("span", {style: Styles.with('rowButton', {backgroundColor: 'white', fontSize: 20}), onClick: this.saveAndClear}, "Create")
                        : objmap(this.states[this.state.status], function(item, key) {
                            return ( React.createElement("span", {style:  Styles.basicButton, onClick:  this.setState.bind(this, {status: key}, null) }, item) );
                        }, this), 
                    
                    React.createElement("span", {style: {display: 'table-cell'}}, React.createElement("i", {className: this.types[this.state.type], onClick: this.setState.bind(this, {typeDropdown: true}, null)})), 
                     this.state.typeDropdown ?
                        React.createElement("div", {style: {position: 'absolute', left: 60, top: 30, width: 100, zIndex: 10, backgroundColor: 'white'}}, 
                            objmap(this.types, function(icon, type) {
                                return (
                                    React.createElement("div", {style: {position: 'relative', width: '100%', cursor: 'pointer', border: 'solid gray 1px'}, onClick: this.setType.bind(this, type)}, 
                                        React.createElement("i", {className: icon}), 
                                        React.createElement("span", null, type)
                                    )
                                );
                            }, this)
                        )
                        : null, 
                     this.state.editingTitle
                        ? React.createElement("input", {ref: "taskTitle", onBlur: this.toggleState('editingTitle'), onChange: this.handleTitleChange, onKeyUp: this.enter(this.saveModelAndClear), style: inputStyle, value: this.state.title})
                        : React.createElement("span", {onClick: this.toggleState('editingTitle'), style: inputStyle}, this.state.title), 
                    React.createElement("span", {style:  (this.state.creatingTodos) ? Styles.basicButtonPressed : Styles.basicButton, onClick: this.expandTodoCreation}, "Create Todos..."), 
                    React.createElement(ProjectBadge, {project: this.state.project})
                ), 
                 this.state.creatingTodos ?
                    React.createElement(Todo, {editingTitle: true, data: {task: this.getData()}, createOverride: this.todoCreated}) : null, 
                 (this.state.expanded) ?
                    this.state.todos.reverse().map(function(item, index) {
                        return React.createElement(Todo, {data: item, stateChanged: this.todoChanged.bind(this, index), style: {marginLeft: 20}})
                    }, this)
                : null
            )
        );
    },
});

function objmap(obj, fnc, context) {
    var arr = [];
    for(var k in obj)
        arr.push(fnc.call(context, obj[k], k, obj));

    return arr;
}

module.exports = Task;
