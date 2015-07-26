var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');
var BasicList = require('./basic-list');
var TodoList = require('./todo-list');

var SelectionModal = require('./selection-modal');

var StateShortcuts = require('./mixins/stateShortcuts');

var Workspace = React.createClass({
    mixins: [StateShortcuts],
    render: function() {
        var leftStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, };
        var rightStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, left: '50%', };
        return (
            <div>
                <WorkspaceHeader filterUpdated={this.setStateValue('filter')}></WorkspaceHeader>
                <div className="body">
                    <div style={leftStyle}>
                        <ColumnList collection="todo" filter={this.state.filter} />
                        <TodoList filter={this.state.filter} />
                    </div>
                    <BasicList collection="project" style={rightStyle} filter={this.state.filter} />
                </div>
            </div>
        );
    },
});

module.exports = Workspace;
