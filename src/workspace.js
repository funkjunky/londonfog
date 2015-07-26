var React = require('react');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');
var BasicList = require('./basic-list');
var TodoList = require('./todo-list');

var SelectionModal = require('./selection-modal');

var StateShortcuts = require('./mixins/stateShortcuts');

var Workspace = React.createClass({displayName: "Workspace",
    mixins: [StateShortcuts],
    render: function() {
        var leftStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, };
        var rightStyle = {width: '45%', height: '100%', border: 'solid 1px black', position: 'absolute', top: 80, margin: 10, left: '50%', };
        return (
            React.createElement("div", null, 
                React.createElement(WorkspaceHeader, {filterUpdated: this.setStateValue('filter')}), 
                React.createElement("div", {className: "body"}, 
                    React.createElement("div", {style: leftStyle}, 
                        React.createElement(ColumnList, {collection: "todo", filter: this.state.filter}), 
                        React.createElement(TodoList, {filter: this.state.filter})
                    ), 
                    React.createElement(BasicList, {collection: "project", style: rightStyle, filter: this.state.filter})
                )
            )
        );
    },
});

module.exports = Workspace;
