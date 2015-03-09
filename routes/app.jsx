var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <header>
                    <h1>The Header</h1>
                </header>

                <RouteHandler />
            </div>
        );
    },
});

module.exports = App;
