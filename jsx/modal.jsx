var React = require('react');

var Styles = require('./styles');

var Modal = React.createClass({
    render: function() {
        return (
            <div>
                <div style={Styles.with('aboveOverlay', {position: 'relative', width: 320})}>
                    <i className="fa fa-times-circle-o" onClick={this.props.onClose} style={Styles.with('circleButton', {position: 'absolute', right: -8, top: -8, backgroundColor: 'white'})}></i>
                    {this.props.children}
                </div>
                <div style={Styles.overlay} onClick={this.props.onClose}></div>
            </div>
        );
    },
});

module.exports = Modal;
