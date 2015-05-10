var React = require('react');

var Task = React.createClass({
    render: function() {
        return (
            <h2>Task {this.props.id}</h2>
        );
    },
});

module.exports = Task;
