var React = require('react/addons');
var _ = require('underscore');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SocketModelMixin = require('./mixins/socketmodelmixin');
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

    mixins: [SocketMixin, SocketModelMixin],
    getDefaultProps: function() {
        return {collection: 'todo', data: blankTodo()};
    },
    getInitialState: function() {
        return this.props.data;
    },
    saveModelAndClear: function() {
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
    render: function() {
        var status = this.getStatus();
        var isNew = !this.props._id && !this.props.data._id;
console.log('AUTOFOCUS: ', this.props.autofocus);
        return (
            <div style={Styles.with('columnRowTable', {backgroundColor: Palette[status]})}>
                { isNew
                ?   <span onClick={this.saveModelAndClear} style={Styles.with('rowButton', {backgroundColor: 'white', fontSize: 20})}>Create</span>
                :   <span onClick={this.complete} style={Styles.with('rowButton', {backgroundColor: 'white'})}>
                        <input type="hidden" value={this.state.completed} />
                        { this.state.complete ? <i className="fa fa-check"></i> : <i className="fa"></i> }
                    </span> }
                <ContentEditable autofocus={this.props.autofocus} html={this.state.title} onChange={this.handleTitleChange} onSubmit={this.saveModelAndClear} style={{backgroundColor: Palette[status + 'light'], display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2}}></ContentEditable>
                { this.state.task ? <TaskBadge task={this.state.task} /> : null }
                { this.state.project ? <ProjectBadge project={this.state.project} /> : null }
                { (!this.state.task && !this.state.project) ? <span style={Styles.with('rowBadge', {backgroundColor: 'white'})}>Task?</span> : null }
            </div>
        );
   },
});

function objmap(obj, fnc, context) {
    var arr = [];
    for(var k in obj)
        arr.push(fnc.call(context, obj[k], k, obj));

    return arr;
}

module.exports = Todo;
