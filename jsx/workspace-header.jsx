var React = require('react');
var _ = require('underscore');

var Styles = require('./styles');
var Palette = require('./palette');

var WorkspaceHeader = React.createClass({
    render: function() {
        var border = '2px solid ' + Palette.lightest;
        return (
            <div style={Styles.with('fullWidth', {height: 80})}>
                <p style={{position: 'absolute', padding: 0, left: 0, top: 0, backgroundColor: Palette.brown, borderRight: border, borderBottom: border, color: Palette.lightest, fontSize: 16, padding: 5}}>London Fog</p>
                <div style={{position: 'absolute', right: 0, top: 0, fontSize: 14, padding: 5}}>
                    <span>Jason </span>
                    | <a>Logoff</a>
                </div>
            </div>
        );
    },
});

module.exports = WorkspaceHeader;

