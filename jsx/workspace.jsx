var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');

var Workspace = React.createClass({
    render: function() {
        return (
            <div>
                <WorkspaceHeader></WorkspaceHeader>
                <div className="body">
                    <ColumnList collection="todo" />
                    <ColumnList collection="project" />
                </div>
            </div>
        );
    },
});

module.exports = Workspace;
