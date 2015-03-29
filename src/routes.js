var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

//TODO: dynamically load each route somehow...
var App = require('./app');
var Home = require('./home');
var ItemInstance = require('./item-instance');
var Todo = require('./todo');
var Task = require('./task');
var Project = require('./project');
var Workspace = require('./workspace');

var routes = (
    React.createElement(Route, {name: "index", path: "/", handler: App}, 
        React.createElement(Route, {name: "home", path: "/home", handler: Home}), 
        React.createElement(Route, {name: "workspace", path: "/workspace", handler: Workspace}), 
        React.createElement(Route, {name: "instanceitem", path: "/:tag/:id", handler: ItemInstance}), 
        React.createElement(DefaultRoute, {handler: Home})
    )
);

module.exports = routes;
