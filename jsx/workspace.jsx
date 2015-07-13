var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');
var BasicList = require('./basic-list');
var TodoList = require('./todo-list');

var Workspace = React.createClass({
    render: function() {
        var leftStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, };
        var rightStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, left: '50%', };
        return (
            <div>
                <WorkspaceHeader></WorkspaceHeader>
                <div className="body">
                    <div style={leftStyle}>
                        <ColumnList collection="todo" />
                        <TodoList />
                    </div>
                    <BasicList collection="project" style={rightStyle} />
                </div>
            </div>
        );
    },
});

module.exports = Workspace;
