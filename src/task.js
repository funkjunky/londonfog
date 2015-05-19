var React = require('react');

var Styles = require('./styles');
var Palette = require('./palette');

var Task = React.createClass({displayName: "Task",
    states: {
        new: {active: 'Start',},
        active: {paused: 'Pause', finished: 'Finish',},
        paused: {active: 'Continue', frozen: 'Freeze',},
        frozen: {paused: 'Unfreeze',},
        finished: {active: 'Not Yet Done',},
    },

    render: function() {
        return (
            React.createElement("div", {style: Styles.with('columnRow', {backgroundColor: Palette[status]})}, 
                objmap(this.states[this.state.status], function(item, key) {
                    console.log('key, item: ', key, item);
                    return ( React.createElement("button", {style: {height: 16, fontSize: 10, verticalAlign: 'center'}, type: "button", onClick:  this.setState.bind(this, {status: key}, null) }, item) );
                }, this), 
                React.createElement("p", null, "Task ", this.props.id)
            )
        );
    },
});

module.exports = Task;
