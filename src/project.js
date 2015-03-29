var React = require('react');
var Router = require('react-router');

var Project = React.createClass({displayName: "Project",
    getInitialState: function() {
        return {expanded: false};
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h2", {onClick:  function() { this.setState({expanded: true}); }}, "Project ", this.props.data.title), 
                 this.state.expanded ? this.props.data.tasks.map(function(item) {
                    return React.createElement(Task, {data: item});
                }) : null
            )
        );
    },
});

module.exports = Project;
