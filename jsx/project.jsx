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

    mixins: [SocketMixin, ModelMixin, stateShortcuts],
    getDefaultProps: function() {
        //TODO: should use getNewItem() function for data, but apparently 'this' isn't instantiated yet.
        return {collection: 'project', data: {name: '', tasks: [],}};
    },
    getInitialState: function() {
        //TODO: yuck...
        this.props.data.tasks = this.props.data.tasks || []; //TODO: remove... shouldn't be needed. getNewProject should have this instead
        var acronym = this.props.data.acronym || '';
        return {expanded: false, name: this.props.data.name, acronym: acronym};
    },
    setData: function(model) {
        this.setState({data: model});
    },
    //TODO: too long and two different ways of setting up model is bad.
    getData: function() {
        var model = {
            name: this.state.name,
            _id: this.props.data._id,
        };
        console.log('acronym: ', this.state.acronym);
        if(this.state.acronym && this.state.acronym != '')
            model.acronym = this.state.acronym;

        return model;
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
    handleAcronymChange: function(event) {
        this.setState({acronym: event.target.value});
    },
    componentDidMount: function() {
        //this.autosync = false;
    },
    render: function() {
        var modes = ['creatingTasks', 'creatingTodos'];
        //TODO: duplicated in project-form
        var colour = '#' + this.props.data.colour.reduce(function(collector, item) {
            return collector + ((item==0) ? '00' : item.toString(16)); //this is a lazy version. If any number is less than 16, then it won't give a 6 char hex
        }, '');
        //TODO: display: none for for tasks when NOT expanded, otherwise display block. Or just set a show prop
        return (
            <div>
                <div style={Styles.with('columnRowTable', {backgroundColor: Palette.notice, color: Palette.noticeFG})}>
                    <div style={Styles.columnRowRow}>
                        <i className="fa fa-arrow-right" onClick={this.setState.bind(this, {expanded: true}, null)}></i>
                        <ContentEditable html={this.state.acronym} onChange={this.handleAcronymChange} style={{display: 'table-cell', verticalAlign: 'middle', height: '100%', width: 50, padding: 2, fontSize: 24, backgroundColor: 'white', color: colour}}></ContentEditable>
                        <ContentEditable html={this.state.name} onChange={this.handleTitleChange} style={{display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, padding: 2}}></ContentEditable>
                        <span style={ (this.state.creatingTasks) ? Styles.basicButtonPressed : Styles.basicButton } onClick={this.toggleExclusiveState(modes[0], modes)}>Create Tasks...</span>
                        <span style={ (this.state.creatingTodos) ? Styles.basicButtonPressed : Styles.basicButton } onClick={this.toggleExclusiveState(modes[1], modes)}>Create Todos...</span>
                    </div>
                </div>
                { this.state.creatingTasks ?
                    <Task data={{project: {_id: this.props.data._id, title: this.state.name, colour: this.props.data.colour, acronym: this.state.acronym}}} /> : null }
                { this.state.creatingTodos ?
                    <Todo data={{project: {_id: this.props.data._id, title: this.state.name, colour: this.props.data.colour, acronym: this.state.acronym}}} /> : null }
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

//TODO: duplicated in project.jsx
function getAcronym(text) {
    return text.split(' ').reduce(function(collector, item) {
        return collector + item.substr(0,1);
    }, '');
}

module.exports = Project;
