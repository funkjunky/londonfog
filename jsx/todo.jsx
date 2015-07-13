var React = require('react/addons');
var _ = require('underscore');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SocketModelMixin = require('./mixins/socketmodelmixin');
var StateShortcuts = require('./mixins/stateshortcuts');
var SocketMixin = require('./mixins/socketmixin');
var Palette = require('./palette');
var Styles = require('./styles');

//Note: during getDefaultProps, none of the member methods exist yet. Further AFTERWARDS, getDefaultProps no longer exists... so I have to rely on an external function.
function blankTodo() {
    return {title: '',};
}

var Todo = React.createClass({
    url: 'http://localhost:1212/',
    dataKey: '#root', //this means we put the data directly in the state.
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
            console.log('focusing: ', this.state.title);
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
            <div style={Styles.with('columnRowTable', style)}>
                { this.isNew()
                ?   <span onClick={this.saveModelAndClear} style={Styles.with('rowButton', {backgroundColor: 'white', fontSize: 20})}>Create</span>
                :   <span onClick={this.complete} style={Styles.with('rowButton', {backgroundColor: 'white'})}>
                        <input type="hidden" value={this.state.completed} />
                        { this.state.complete ? <i className="fa fa-check"></i> : <i className="fa"></i> }
                    </span> }
                { this.state.editingTitle
                    ? <input ref="todoTitle" onBlur={this.toggleState('editingTitle')} onChange={this.handleTitleChange} onKeyUp={this.enter(this.saveModelAndClear)} style={inputStyle} value={this.state.title} />
                    : <span onClick={this.toggleState('editingTitle')} style={inputStyle}>{this.state.title}</span> }
                { this.state.task ? ( <TaskBadge task={this.state.task} />  ) : null }
                { this.state.task ? ( <ProjectBadge project={this.state.task.project} />  ) : null }
                { this.state.project ? <ProjectBadge project={this.state.project} /> : null }
                { (!this.state.task && !this.state.project) ? <span style={Styles.with('rowBadge', {backgroundColor: 'white'})}>Task?</span> : null }
            </div>
        );
   },
});

module.exports = Todo;
