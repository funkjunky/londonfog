var React = require('react');
var Router = require('react-router');

var WorkspaceHeader = require('./workspace-header.jsx');
var ColumnList = require('./column-list.jsx');

var Workspace = React.createClass({
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
            <div>
                <WorkspaceHeader></WorkspaceHeader>
                <div className="body">
                    <ColumnList items={todos} tag="todo" />
                    <ColumnList items={projects} tag="project" />
                </div>
            </div>
        );
    },
});

module.exports = Workspace;
