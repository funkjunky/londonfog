var React = require('react');

var WorkspaceHeader = React.createClass({displayName: "WorkspaceHeader",
    render: function() {
        return (
            React.createElement("h1", null, "Some Guys Work Space")
        );
    },
});

module.exports = WorkspaceHeader;

