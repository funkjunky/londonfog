var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');

var Workspace = React.createClass({displayName: "Workspace",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(WorkspaceHeader, null), 
                React.createElement("div", {className: "body"}, 
                    React.createElement(ColumnList, {collection: "todo"}), 
                    React.createElement(ColumnList, {collection: "project"})
                )
            )
        );
    },
});

module.exports = Workspace;
