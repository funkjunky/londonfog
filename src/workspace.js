var React = require('react');
var Router = require('react-router');

var WorkspaceHeader = require('./workspace-header');
var ColumnList = require('./column-list');

var Workspace = React.createClass({displayName: "Workspace",
    render: function() {
        //TODO: this well be gotten by ajax, given user and stuff...
        //This component should do everything and not be passed anything...
        //Although I could definitely pass some responsabilities to mixins or what ever... or maybe I could make mixins and allow all the components to use them???
        var todos = [
            {
                id: 'todo0',
                title: 'Im a todo...',
                status: 'new',
            },
            {
                id: 'todo1',
                title: 'another thing to finish..',
                status: 'active',
            },
        ];
        var projects = [
            {
                title: 'Super Project',
                tasks: [
                    {
                        id: 'task10',
                        title: 'create super logo',
                        body: 'Creat the super logo with colour and such... do i even need a body?? Might be too complex.',
                        todos: ['todo0'], 
                    },
                ],
            },
        ];

        return (
            React.createElement("div", null, 
                React.createElement(WorkspaceHeader, null), 
                React.createElement("div", {className: "body"}, 
                    React.createElement(ColumnList, {items: todos, tag: "todo"}), 
                    React.createElement(ColumnList, {items: projects, tag: "project"})
                )
            )
        );
    },
});

module.exports = Workspace;
