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
    <Route name="index" path="/" handler={App}>
        <Route name="home" path="/home" handler={Home} />
        <Route name="workspace" path="/workspace" handler={Workspace} />
        <Route name="instanceitem" path="/:tag/:id" handler={ItemInstance} />
        <DefaultRoute handler={Home}/>
    </Route>
);

module.exports = routes;
