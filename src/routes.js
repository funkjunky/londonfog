var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

//TODO: dynamically load each route somehow...
var App = require('./app');
var Home = require('./home');
var Projects = require('./projects');
var Project = require('./project');

var routes = (
    React.createElement(Route, {name: "index", path: "/", handler: App}, 
        React.createElement(Route, {name: "home", path: "/home", handler: Home}), 
        React.createElement(Route, {name: "projects", path: "/projects", handler: Projects}), 
        React.createElement(Route, {name: "project", path: "project/:projectID", handler: Project}), 
        React.createElement(DefaultRoute, {handler: Home})
    )
);

module.exports = routes;
