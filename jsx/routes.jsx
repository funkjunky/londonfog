var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

//TODO: dynamically load each route somehow...
var Home = require('./home');
var ItemInstance = require('./item-instance');
var Todo = require('./todo');
var Task = require('./task');
var Project = require('./project');
var Workspace = require('./workspace');

var Routes = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>React London Fog thingy</title>
                    <script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
                </head>
                <body>
                    <Locations path={this.props.path}>
                        <Location path="/" handler={<Home />} />
                        <Location path="/home" handler={<Home />} />
                        <Location path="/workspace" handler={<Workspace />} />
                        <Location path="/:tag/:id" handler={<ItemInstance />} />
                    </Locations>
                    <script src="dist/bootstrap.js"></script>
                </body>
            </html>
        );
    },
});

module.exports = Routes;
