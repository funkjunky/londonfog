var React = require('react');
var request = require('superagent');

var Styles = require('./styles');

var RotatingColours = require('./rotating-colours');
var colourIndex = Math.floor(Math.random() * RotatingColours.length);

var ProjectForm = React.createClass({
    //TODO: yell at ReactJS developers for making this necessary... this is what should happen by default, without me putting the function
    getInitialState: function() {
        return {};
    },
    render: function() {
        var colour = '#' + RotatingColours[colourIndex].reduce(function(collector, item) {
            return collector + ((item==0) ? '00' : item.toString(16)); //this is a lazy version. If any number is less than 16, then it won't give a 6 char hex
        }, '');
        return (
            <div>
                <input type="text" placeholder="Project Name" onChange={this.setStateToInput('name')} style={Styles.fullWidth} />
                <input type="text" placeholder="Project Acronym" onChange={this.setStateToInput('acronym')} style={Styles.fullWidth} /><span style={{fontSize: 24, color: colour}}>{this.state.acronym}</span>
                <input type="text" placeholder="https://github.com/funkjunky/londonfog" onChange={this.setStateToInput('github')} style={Styles.fullWidth} />
                {this.state.githubValid
                    ? <p>TODO: show github stuff here...</p>
                    : <p>Fill in github project url to use github project description and details or...</p> }
                <button type="button">Custom Project Details</button><br />
                {//I'll eventually add description etc here, for the foolish people who don't want to just use githubs data...
                }
                <button type="button" onClick={this.save}>Create Project</button><br />
            </div>
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
                acronym: this.state.acronym,
                colour: RotatingColours[colourIndex],
                github: this.state.github,
                tasks: [],
                todos: [],
            }).end(function(err, res) {
                console.log('done saving project: ', err, res);
                this.props.onSave(res);
                
                if(colourIndex < RotatingColours.length)    ++colourIndex;
                else                                        colourIndex = 0;
            }.bind(this));
    },
});

module.exports = ProjectForm;
