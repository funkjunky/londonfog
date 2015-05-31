var React = require('react');

var Styles = require('./styles');

var Modal = require('./modal');
var ProjectForm = require('./project-form');
var stateShortcuts = require('./mixins/stateShortcuts');


var WorkspaceHeader = React.createClass({
    mixins: [stateShortcuts],
    //TODO: yell at ReactJS developers for making this necessary... this is what should happen by default, without me putting the function
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div style={Styles.with('fullWidth', {height: 55, border: 'solid 1px red'})}>
                <button type="button" onClick={this.toggleState('showCreateProject')}>Create Project</button>
                {this.state.showCreateProject ? <Modal onClose={this.toggleState('showCreateProject')}><ProjectForm onSave={this.toggleState('showCreateProject')} /></Modal> : null }
            </div>
        );
    },
});

module.exports = WorkspaceHeader;
