var React = require('react');
var Router = require('react-router');

var Home = React.createClass({displayName: "Home",
    render: function() {
        return (
            React.createElement("h2", null, "Home")
        );
    },
});

module.exports = Home;
