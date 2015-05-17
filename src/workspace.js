var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');

var Workspace = React.createClass({displayName: "Workspace",
    render: function() {
        var leftStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, };
        var rightStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, left: '50%', };
        return (
            React.createElement("div", null, 
                React.createElement(WorkspaceHeader, null), 
                React.createElement("div", {className: "body"}, 
                    React.createElement(ColumnList, {collection: "todo", style: leftStyle}), 
                    React.createElement(ColumnList, {collection: "project", style: rightStyle})
                )
            )
        );
    },
});

module.exports = Workspace;
