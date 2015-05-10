var React = require('react');

var Task = React.createClass({displayName: "Task",
    render: function() {
        return (
            React.createElement("h2", null, "Task ", this.props.id)
        );
    },
});

module.exports = Task;
