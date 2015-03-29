var React = require('react');
var Router = require('react-router');

var Task = React.createClass({
    mixins: [Router.State],
    render: function() {
        return (
            <h2>Task {this.getParams().id}</h2>
        );
    },
});

module.exports = Task;
