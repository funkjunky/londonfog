var React = require('react');
var Router = require('react-router');

var Project = React.createClass({displayName: "Project",
    mixins: [Router.State],
    render: function() {
        return (
            React.createElement("h2", null, "Project ", this.getParams().projectID)
        );
    },
});

module.exports = Project;
