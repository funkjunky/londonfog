var React = require('react');

var Styles = require('./styles');

var Modal = React.createClass({displayName: "Modal",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {style: Styles.with('aboveOverlay', {position: 'relative', width: 320})}, 
                    React.createElement("i", {className: "fa fa-times-circle-o", onClick: this.props.onClose, style: Styles.with('circleButton', {position: 'absolute', right: -8, top: -8, backgroundColor: 'white'})}), 
                    this.props.children
                ), 
                React.createElement("div", {style: Styles.overlay, onClick: this.props.onClose})
            )
        );
    },
});

module.exports = Modal;
