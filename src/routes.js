var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

//TODO: dynamically load each route somehow...
var Header = require('./header');
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
                    React.createElement("title", null, "React London Fog thingy"), 
                    React.createElement("script", {src: "https://cdn.socket.io/socket.io-1.3.5.js"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/reset.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"})
                ), 
                React.createElement("body", null, 
                    React.createElement(Header, null), 
                    React.createElement(Locations, {path: this.props.path}, 
                        React.createElement(Location, {path: "/", handler: React.createElement(Home, null)}), 
                        React.createElement(Location, {path: "/home", handler: React.createElement(Home, null)}), 
                        React.createElement(Location, {path: "/workspace", handler: React.createElement(Workspace, null)}), 
                        React.createElement(Location, {path: "/:tag/:id", handler: React.createElement(ItemInstance, null)})
                    ), 
                    React.createElement("script", {src: "dist/bootstrap.js"})
                )
            )
        );
    },
});

module.exports = Routes;
