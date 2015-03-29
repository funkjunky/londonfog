var React = require('react');
var Router = require('react-router');

var Task = React.createClass({displayName: "Task",
    mixins: [Router.State],
    render: function() {
        return (
            React.createElement("h2", null, "Task ", this.getParams().id)
        );
    },
});

module.exports = Task;
