var React = require('react');

var TaskBadge = React.createClass({displayName: "TaskBadge",
    //TODO: add colours and borders nicely according to the task colour?
    //the border and font should be the colour, while the background is a much ligher shade
   render: function() {
        return (
            React.createElement("span", null, 
                React.createElement("span", null, this.project.acronym || this.task.title)
            )
        )
   },
});

module.exports = TaskBadge;
