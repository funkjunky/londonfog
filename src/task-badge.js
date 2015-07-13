var React = require('react');

var TaskBadge = React.createClass({displayName: "TaskBadge",
    types: {
        bug: 'fa fa-bug',
        feature: 'fa fa-star',
        upgrade: 'fa fa-level-up',
    },
    //TODO: add colours and borders nicely according to the task colour?
    //the border and font should be the colour, while the background is a much ligher shade
   render: function() {
        return (
            React.createElement("span", {style: {border: 'solid 1px blue'}}, 
                React.createElement("i", {className: this.types[this.props.task.type]}), React.createElement("span", null, " #", this.props.task.id)
            )
        )
   },
});

module.exports = TaskBadge;
