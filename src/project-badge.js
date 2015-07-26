var React = require('react');

var Styles = require('./styles');

var ProjectBadge = React.createClass({displayName: "ProjectBadge",
    //TODO: add colours and borders nicely according to the task colour?
    //the border and font should be the colour, while the background is a much ligher shade
   render: function() {
        var acronym = this.props.project.acronym || getAcronym(this.props.project.title);
        //TODO: duplicated in project-form
        var colour = '#' + this.props.project.colour.reduce(function(collector, item) {
            return collector + ((item==0) ? '00' : item.toString(16)); //this is a lazy version. If any number is less than 16, then it won't give a 6 char hex
        }, '');
        return (
            React.createElement("span", null, 
                React.createElement("span", {style: Styles.with('badgeFont', {color: colour})}, acronym.toUpperCase())
            )
        )
   },
});

//TODO: duplicated in project.jsx
function getAcronym(text) {
    return text.split(' ').reduce(function(collector, item) {
        return collector + item.substr(0,1);
    }, '');
}

module.exports = ProjectBadge;
