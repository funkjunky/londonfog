var React = require('react');
var request = require('superagent');

var Styles = require('./styles');

var ProjectForm = React.createClass({displayName: "ProjectForm",
    //TODO: yell at ReactJS developers for making this necessary... this is what should happen by default, without me putting the function
    getInitialState: function() {
        return {};
    },
    render: function() {
        console.log('fullWidth: ', Styles.fullWidth);
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "text", placeholder: "Project Name", onChange: this.setStateToInput('name'), style: Styles.fullWidth}), 
                React.createElement("input", {type: "text", placeholder: "https://github.com/funkjunky/londonfog", onChange: this.setStateToInput('github'), style: Styles.fullWidth}), 
                this.state.githubValid
                    ? React.createElement("p", null, "TODO: show github stuff here...")
                    : React.createElement("p", null, "Fill in github project url to use github project description and details or..."), 
                React.createElement("button", {type: "button"}, "Custom Project Details"), React.createElement("br", null), 
                //I'll eventually add description etc here, for the foolish people who don't want to just use githubs data...
                
                React.createElement("button", {type: "button", onClick: this.save}, "Create Project"), React.createElement("br", null)
            )
        );
    },

    setStateToInput: function(state) {
        return function(event) {
            var obj = {};
            obj[state] = event.target.value;
            this.setState(obj);
        }.bind(this);
    },

    save: function() {
        request('post', 'http://localhost:1212/project')
            .send({
                name: this.state.name,
                github: this.state.github
            }).end(function(err, res) {
                console.log('done saving project: ', err, res);
                this.props.onSave(res);
            }.bind(this));
    },
});

module.exports = ProjectForm;
