var React = require('react');

var Styles = require('./styles');
var Palette = require('./palette');

var SocketMixin = require('./mixins/socketmixin');
var ModelMixin = require('./mixins/socketmodelmixin');
var stateShortcuts = require('./mixins/stateShortcuts');

var ContentEditable = require('./content-editable');
var Task = require('./task');
var Todo = require('./todo');

var Project = React.createClass({
    url: 'http://localhost:1212/',
    dataKey: 'data',

    mixins: [SocketMixin, ModelMixin, stateShortcuts],
    getDefaultProps: function() {
        //TODO: should use getNewItem() function for data, but apparently 'this' isn't instantiated yet.
        return {collection: 'project', data: {name: '', tasks: [],}};
    },
    getInitialState: function() {
        this.props.data.tasks = this.props.data.tasks || []; //TODO: remove... shouldn't be needed. getNewProject should have this instead
        return {expanded: false, name: this.props.data.name};
    },
    //TODO: this is bad practice... you're not supposed to set props. So figure out a way to build a new project to replace this one?
    setData: function(model) {
        this.setProps({ data: model });
    },
    taskChanged: function(index, newTask) {
        this.setState({ data: { tasks: { $splice: [[index, 1, newTask]] } } });
    },
    taskCreated: function(newTask) {
        this.setState({ data: { tasks: { $push: newTask } } });
    },
    //TODO: make a wrapper fucntion that provides vaule as a parameter instead of event.
    //TODO: better name to be similar to above Changed functions
    handleTitleChange: function(event) {
        this.setState({name: event.target.value});
    },
    componentDidMount: function() {
        this.autosync = false;
    },
    render: function() {
        var modes = ['creatingTasks', 'creatingTodos'];
        //TODO: display: none for for tasks when NOT expanded, otherwise display block. Or just set a show prop
        return (
            <div>
                <div style={Styles.with('columnRowTable', {backgroundColor: Palette.notice, color: Palette.noticeFG})}>
                    <div style={Styles.columnRowRow}>
                        <i className="fa fa-arrow-right" onClick={this.setState.bind(this, {expanded: true}, null)}></i>
                        <ContentEditable html={this.state.name} onChange={this.handleTitleChange} style={{display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2}}></ContentEditable>
                        <span style={ (this.state.creatingTasks) ? Styles.basicButtonPressed : Styles.basicButton } onClick={this.toggleExclusiveState(modes[0], modes)}>Create Tasks...</span>
                        <span style={ (this.state.creatingTodos) ? Styles.basicButtonPressed : Styles.basicButton } onClick={this.toggleExclusiveState(modes[1], modes)}>Create Todos...</span>
                    </div>
                </div>
                { this.state.creatingTasks ?
                    <Task data={{project: {_id: this.props.data._id, title: this.state.name}}} /> : null }
                { this.state.creatingTodos ?
                    <Todo data={{project: {_id: this.props.data._id, title: this.state.name}}} /> : null }
                { this.state.expanded ?
                    <div style={Styles.columnRowRow}>
                        { this.props.data.tasks.map(function(item, index) {
                            return <Task data={item} index={index} statechanged={this.taskChanged} />
                        })}
                    </div> : null }
            </div>
        );
    },
});

module.exports = Project;
