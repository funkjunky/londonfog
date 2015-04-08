var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

//TODO: dynamically load each route somehow...
var Home = require('./home.jsx');
var ItemInstance = require('./item-instance.jsx');
var Todo = require('./todo.jsx');
var Task = require('./task.jsx');
var Project = require('./project.jsx');
var Workspace = require('./workspace.jsx');

var Routes = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>React London Fog thingy</title>
                </head>
                <body>
                    <Locations path={this.props.path}>
                        <Location path="/" handler={Home} />
                        <Location path="/home" handler={Home} />
                        <Location path="/workspace" handler={Workspace} />
                        <Location path="/:tag/:id" handler={ItemInstance} />
                    </Locations>
                    <script src="dist/bundle.js"></script>
                </body>
            </html>
        );
    },
});

module.exports = Routes;
