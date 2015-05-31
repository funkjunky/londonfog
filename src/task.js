var React = require('react');

var Styles = require('./styles');
var Palette = require('./palette');

var ContentEditable = require('./content-editable');
var ProjectBadge = require('./project-badge');

function getNewTask() {
    return {
        title: '',
        status: 'new',
    };
}

var Task = React.createClass({displayName: "Task",
    states: {
        new: {active: 'Start',},
        active: {paused: 'Pause', finished: 'Finish',},
        paused: {active: 'Continue', frozen: 'Freeze',},
        frozen: {paused: 'Unfreeze',},
        finished: {active: 'Not Yet Done',},
    },

    getInitialState: function() {
        //TODO: all the code in this function is too inconsistent. I need a better way to say x = z.y or default. Regardless of whether z is undefined or not.
        var initialState = {
            title: (this.props.data) ? this.props.data.title : '',
            expanded: false,
        };
        if(this.props.data) {
            initialState.project = this.props.data.project;
            initialState.status = this.props.data.status || 'new';
        }

        return initialState;
    },

    saveAndClear: function() {
        this.props.stateChanged();
        this.setState(getNewTask());
    },

    handleTitleChange: function(event) {
        this.setState({title: event.target.value});
    },

    render: function() {
        var isNew = !this.props._id && !this.props.data._id;
        return (
            React.createElement("div", {style: Styles.with('columnRowTable', {backgroundColor: Palette[this.state.status]})}, 
                 isNew
                    ? React.createElement("span", {style: Styles.with('rowButton', {backgroundColor: 'white', fontSize: 20}), onClick: this.saveModelAndClear}, "Create")
                    : objmap(this.states[this.state.status], function(item, key) {
                        console.log('key, item: ', key, item);
                        return ( React.createElement("button", {style: {height: 16, fontSize: 10, verticalAlign: 'center'}, type: "button", onClick:  this.setState.bind(this, {status: key}, null) }, item) );
                    }, this), 
                
                React.createElement(ContentEditable, {autofocus: this.props.autofocus, html: this.state.title, onChange: this.handleTitleChange, onSubmit: this.saveModelAndClear, style: {backgroundColor: Palette[status + 'light'], display: 'table-cell', verticalAlign: 'middle', height: '100%', minWidth: 50, margin: 2}}), 
                React.createElement(ProjectBadge, {project: this.state.project})
            )
        );
    },
});

module.exports = Task;
