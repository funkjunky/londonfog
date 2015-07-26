var React = require('react');

var Styles = require('./styles');

var Modal = require('./modal');
var ProjectForm = require('./project-form');
var StateShortcuts = require('./mixins/stateShortcuts');

var WorkspaceHeader = React.createClass({displayName: "WorkspaceHeader",
    mixins: [StateShortcuts],
    render: function() {
        return (
            React.createElement("div", {style: Styles.with('fullWidth', {height: 55, border: 'solid 1px red', display: 'flex', flexDirection: 'row', alignItems: 'center'})}, 
                React.createElement("input", {type: "text", style: {fontFamily: 'FontAwesome', width: 300, fontSize: 24, marginLeft: 10}, placeholder: "", ref: "filter", onChange: this.setFilterValue}), 
                React.createElement("button", {type: "button", onClick: this.toggleState('showCreateProject'), style: {fontSize: 24, marginLeft: 10}}, React.createElement("i", {className: "fa fa-plus-square-o"}), " Create Project"), 
                this.state.showCreateProject ? React.createElement(Modal, {onClose: this.toggleState('showCreateProject')}, React.createElement(ProjectForm, {onSave: this.toggleState('showCreateProject')})) : null
            )
        );
    },

    setFilterValue: function(event) {
        this.props.filterUpdated(event.target.value);
    },
});

module.exports = WorkspaceHeader;
