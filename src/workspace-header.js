var React = require('react');

var Styles = require('./styles');

var Modal = require('./modal');
var ProjectForm = require('./project-form');
var stateShortcuts = require('./mixins/stateShortcuts');


var WorkspaceHeader = React.createClass({displayName: "WorkspaceHeader",
    mixins: [stateShortcuts],
    //TODO: yell at ReactJS developers for making this necessary... this is what should happen by default, without me putting the function
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            React.createElement("div", {style: Styles.with('fullWidth', {height: 55, border: 'solid 1px red'})}, 
                React.createElement("button", {type: "button", onClick: this.toggleState('showCreateProject')}, "Create Project"), 
                this.state.showCreateProject ? React.createElement(Modal, {onClose: this.toggleState('showCreateProject')}, React.createElement(ProjectForm, {onSave: this.toggleState('showCreateProject')})) : null
            )
        );
    },
});

module.exports = WorkspaceHeader;
