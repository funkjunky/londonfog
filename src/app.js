var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({displayName: "App",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("header", null, 
                    React.createElement("h1", null, "The Header")
                ), 

                React.createElement(RouteHandler, null)
            )
        );
    },
});

module.exports = App;
