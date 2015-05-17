var React = require('react');
var _ = require('underscore');

var Styles = require('./styles');
var Palette = require('./palette');

var WorkspaceHeader = React.createClass({displayName: "WorkspaceHeader",
    render: function() {
        var border = '2px solid ' + Palette.lightest;
        return (
            React.createElement("div", {style: Styles.with('fullWidth', {height: 80})}, 
                React.createElement("p", {style: {position: 'absolute', padding: 0, left: 0, top: 0, backgroundColor: Palette.brown, borderRight: border, borderBottom: border, color: Palette.lightest, fontSize: 16, padding: 5}}, "London Fog"), 
                React.createElement("div", {style: {position: 'absolute', right: 0, top: 0, fontSize: 14, padding: 5}}, 
                    React.createElement("span", null, "Jason "), 
                    "| ", React.createElement("a", null, "Logoff")
                )
            )
        );
    },
});

module.exports = WorkspaceHeader;

