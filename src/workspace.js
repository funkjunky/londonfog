var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');
var BasicList = require('./basic-list');
var TodoList = require('./todo-list');

var SelectionModal = require('./selection-modal');

var Workspace = React.createClass({displayName: "Workspace",
    render: function() {
        var leftStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, };
        var rightStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, left: '50%', };
        return (
            React.createElement("div", null, 
                React.createElement(WorkspaceHeader, null), 
                React.createElement("div", {className: "body"}, 
                    React.createElement("div", {style: leftStyle}, 
                        React.createElement(ColumnList, {collection: "todo"}), 
                        React.createElement(TodoList, null)
                    ), 
                    React.createElement(BasicList, {collection: "project", style: rightStyle})
                )
            )
        );
    },
});

module.exports = Workspace;
