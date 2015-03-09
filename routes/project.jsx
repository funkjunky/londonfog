var React = require('react');
var Router = require('react-router');

var Project = React.createClass({
    mixins: [Router.State],
    render: function() {
        return (
            <h2>Project {this.getParams().projectID}</h2>
        );
    },
});

module.exports = Project;
