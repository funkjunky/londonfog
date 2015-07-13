var React = require('react');

var Styles = require('./styles');
var Palette = require('./palette');

var SocketMixin = require('./mixins/socketmixin');
var ModelMixin = require('./mixins/socketmodelmixin');
var StateShortcuts = require('./mixins/stateShortcuts');

var ContentEditable = require('./content-editable');
var Task = require('./task');
var Todo = require('./todo');

var Project = React.createClass({
    url: 'http://localhost:1212/',

    mixins: [SocketMixin, ModelMixin, StateShortcuts],
    getDefaultProps: function() {
        //TODO: should use getNewItem() function for data, but apparently 'this' isn't instantiated yet.
        return {collection: 'project', data: {}};
    },
    getInitialState: function() {
        var name = this.props.data.name || '';
        var tasks = this.props.data.tasks || [];
        var todos = this.props.data.todos || [];
        var acronym = this.props.data.acronym || '';
        return {expanded: false, name: name, acronym: acronym, tasks: tasks, todos: todos}; //TODO: this is really bad. I keep forgetting to put the new item here... duplication is bad!!!!
    },
    setData: function(model) {
        var name = model.name || '';
        var tasks = model.tasks || [];
        var acronym = model.acronym || '';
        this.setState({name: name, acronym: acronym, tasks: tasks});
    },
    //TODO: too long and two different ways of setting up model is bad.
    getData: function() {
        var model = {
            name: this.state.name,
            _id: this.props.data._id,
            tasks: this.state.tasks,
            todos: this.state.todos,
        };
        if(this.state.acronym && this.state.acronym != '')
            model.acronym = this.state.acronym;

        return model;
    },
    //TODO: code essentially duplicated in task. Could probably throw this into modelmixin, or make another helper mixin
    todoChanged: function(index, todo) {
        this.setState(React.addons.update(this.state, { todos: { $splice: [[index, 1, todo]] } }));
    },
    todoCreated: function(newTodo) {
        if(this.state.todos.length)
            newTodo.id = Math.max.apply(Math, this.state.todos);
        else
            newTodo.id = 0;

        this.setState(React.addons.update(this.state, { todos: { $push: [newTodo] } }));
        return newTodo;
    },
    //TODO: code essentially duplicated in task. Could probably throw this into modelmixin, or make another helper mixin
    taskChanged: function(index, task) {
        this.setState(React.addons.update(this.state, { tasks: { $splice: [[index, 1, task]] } }));
    },
    taskCreated: function(newTask) {
        if(this.state.tasks.length)
            newTask.id = Math.max.apply(Math, this.state.tasks);
        else
            newTask.id = 0;

        this.setState(React.addons.update(this.state, { tasks: { $push: [newTask] } }));
        return newTask;
    },
    //TODO: make a wrapper fucntion that provides vaule as a parameter instead of event.
    //TODO: better name to be similar to above Changed functions
    handleTitleChange: function(event) {
        this.setState({name: event.target.value});
    },
    handleAcronymChange: function(event) {
        this.setState({acronym: event.target.value});
    },
    componentDidMount: function() {
        //this.autosync = false;
    },
    modes: ['creatingTasks', 'creatingTodos'],
    expandTodoCreation: function() {
        this.toggleExclusiveState(this.modes[1], this.modes)();
        //Note: toggle state hasn't updated the variable yet, so we need to check the opposite.
        if(!this.state.creatingTodos) 
            this.setState({expanded: true});
    },
    expandTaskCreation: function() {
        this.toggleExclusiveState(this.modes[0], this.modes)();
        //Note: toggle state hasn't updated the variable yet, so we need to check the opposite.
        if(!this.state.creatingTasks)
            this.setState({expanded: true});
    },
    render: function() {
        //TODO: duplicated in project-form
        var colour = '#' + this.props.data.colour.reduce(function(collector, item) {
            return collector + ((item==0) ? '00' : item.toString(16)); //this is a lazy version. If any number is less than 16, then it won't give a 6 char hex
        }, '');
        console.log('render project: ', this.state);
        //TODO: display: none for for tasks when NOT expanded, otherwise display block. Or just set a show prop
        return (
            <div>
                <div style={Styles.with('columnRowTable', {backgroundColor: Palette.notice, color: Palette.noticeFG})}>
                    <div style={Styles.columnRowRow}>
                        { (this.state.tasks.length || this.state.todos.length) ? 
                            ((this.state.expanded)
                                ? <i className="fa fa-arrow-down" onClick={this.toggleState('expanded')}></i>
                                : <i className="fa fa-arrow-right" onClick={this.toggleState('expanded')}></i>)
                        : null }
                        <ContentEditable html={this.state.acronym} onChange={this.handleAcronymChange} style={{display: 'table-cell', verticalAlign: 'middle', height: '100%', width: 50, padding: 2, fontSize: 24, backgroundColor: 'white', color: colour}}></ContentEditable>
                        <ContentEditable html={this.state.name} onChange={this.handleTitleChange} style={{display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, padding: 2}}></ContentEditable>
                        <span style={ (this.state.creatingTasks) ? Styles.basicButtonPressed : Styles.basicButton } onClick={this.expandTaskCreation}>Create Tasks...</span>
                        <span style={ (this.state.creatingTodos) ? Styles.basicButtonPressed : Styles.basicButton } onClick={this.expandTodoCreation}>Create Todos...</span>
                    </div>
                </div>
                { this.state.creatingTasks ?
                    <Task editingTitle={true} data={{project: {_id: this.props.data._id, title: this.state.name, colour: this.props.data.colour, acronym: this.state.acronym}}} 
                            saveCreatedTask={this.taskCreated} editTask={this.taskChanged} /> : null }
                { this.state.creatingTodos ?
                    <Todo editingTitle={true} data={{project: {_id: this.props.data._id, title: this.state.name, colour: this.props.data.colour, acronym: this.state.acronym}}} createOverride={this.todoCreated} /> : null }
                { (this.state.expanded) ?
                    this.state.todos.map(function(item, index) {
                        return <Todo data={item} stateChanged={this.todoChanged.bind(this, index)} style={{marginLeft: 20}} />
                    }, this)
                : null }
                { (this.state.expanded) ?
                    this.state.tasks.map(function(item, index) {
                        return <Task data={item} stateChanged={this.taskChanged.bind(this, index)} style={{marginLeft: 20}} />
                    }, this)
                : null }
            </div>
        );
    },
});

//TODO: duplicated in project.jsx
function getAcronym(text) {
    return text.split(' ').reduce(function(collector, item) {
        return collector + item.substr(0,1);
    }, '');
}

module.exports = Project;
