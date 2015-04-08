var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

//TODO: dynamically load each route somehow...
var App = require('./app');
var Home = require('./home');
var ItemInstance = require('./item-instance');
var Todo = require('./todo');
var Task = require('./task');
var Project = require('./project');
var Workspace = require('./workspace');

var Routes = React.createClass({displayName: "Routes",
    render: function() {
        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "React London Fog thingy")
                ), 
                React.createElement("body", null, 
                    React.createElement(Locations, {path: this.props.path}, 
                        React.createElement(Location, {path: "/", handler: Home}), 
                        React.createElement(Location, {path: "/home", handler: Home}), 
                        React.createElement(Location, {path: "/workspace", handler: Workspace}), 
                        React.createElement(Location, {path: "/:tag/:id", handler: ItemInstance})
                    ), 
                    React.createElement("script", {src: "dist/bundle.js"})
                )
            )
        );
    },
});

module.exports = Routes;
