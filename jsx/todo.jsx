var React = require('react/addons');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SocketModelMixin = require('./mixins/socketmodelmixin');
var SocketMixin = require('./mixins/socketmixin');

//Note: during getDefaultProps, none of the member methods exist yet. Further AFTERWARDS, getDefaultProps no longer exists... so I have to rely on an external function.
function blankTodo() {
    return {title: '', status: 'new',};
}

var Todo = React.createClass({
    url: 'http://localhost:1212/',
    dataKey: '#root', //this means we put the data directly in the state.
    //the button states and labels displayed while in each state.
    states: {
        new: {active: 'Start',},
        active: {paused: 'Pause', finished: 'Finish',},
        paused: {active: 'Continue', frozen: 'Freeze',},
        frozen: {paused: 'Unfreeze',},
        finished: {active: 'Not Yet Done',},
    },

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
    handleChange: function(event) {
        this.setState({title: event.target.value});
    },
    render: function() {
        return (
            <div>
                {objmap(this.states[this.state.status], function(item, key) {
                    console.log('key, item: ', key, item);
                    return ( <button type="button" onClick={ this.setState.bind(this, {status: key}, null) }>{item}</button> );
                }, this)}
                <p><ContentEditable html={this.state.title} onChange={this.handleChange} onSubmit={this.saveModelAndClear}></ContentEditable></p>
                <span>
                    { this.state.task ? <TaskBadge task={this.state.task} /> : null }
                    { this.state.project ? <ProjectBadge project={this.state.project} /> : null }
                    { (!this.state.task && !this.state.project) ? <button type="button">Assign</button> : null }
                </span>
                {(!this.props._id && !this.props.data._id) ? <button type="button" onClick={this.saveModelAndClear}>Create</button> : null }
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
