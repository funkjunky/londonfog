var React = require('react');

var Styles = require('./styles');

var ProjectBadge = React.createClass({displayName: "ProjectBadge",
    //TODO: add colours and borders nicely according to the task colour?
    //the border and font should be the colour, while the background is a much ligher shade
   render: function() {
        console.log('badge props: ', this.props);
        var acronym = this.props.project.acronym || getAcronym(this.props.project.title);
        return (
            React.createElement("span", null, 
                React.createElement("span", {style: Styles.badgeFont}, acronym.toUpperCase())
            )
        )
   },
});

function getAcronym(text) {
    return text.split(' ').reduce(function(collector, item) {
        return collector + item.substr(0,1);
    }, '');
}

module.exports = ProjectBadge;
