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
    <Route name="index" path="/" handler={App}>
        <Route name="home" path="/home" handler={Home} />
        <Route name="projects" path="/projects" handler={Projects} />
        <Route name="project" path="project/:projectID" handler={Project} />
        <DefaultRoute handler={Home}/>
    </Route>
);

module.exports = routes;
