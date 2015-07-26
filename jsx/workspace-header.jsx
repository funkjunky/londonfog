var React = require('react');

var Styles = require('./styles');

var Modal = require('./modal');
var ProjectForm = require('./project-form');
var StateShortcuts = require('./mixins/stateShortcuts');

var WorkspaceHeader = React.createClass({
    mixins: [StateShortcuts],
    render: function() {
        return (
            <div style={Styles.with('fullWidth', {height: 55, border: 'solid 1px red', display: 'flex', flexDirection: 'row', alignItems: 'center'})}>
                <input type="text" style={{fontFamily: 'FontAwesome', width: 300, fontSize: 24, marginLeft: 10}} placeholder="&#xf002;" ref="filter" onChange={this.setFilterValue} />
                <button type="button" onClick={this.toggleState('showCreateProject')} style={{fontSize: 24, marginLeft: 10}}><i className="fa fa-plus-square-o"></i> Create Project</button>
                {this.state.showCreateProject ? <Modal onClose={this.toggleState('showCreateProject')}><ProjectForm onSave={this.toggleState('showCreateProject')} /></Modal> : null }
            </div>
        );
    },

    setFilterValue: function(event) {
        this.props.filterUpdated(event.target.value);
    },
});

module.exports = WorkspaceHeader;
