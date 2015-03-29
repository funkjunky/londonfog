var React = require('react');

var TaskBadge = React.createClass({
    //TODO: add colours and borders nicely according to the task colour?
    //the border and font should be the colour, while the background is a much ligher shade
   render: function() {
        return (
            <span>
                <span>{this.project.acronym || this.task.title}</span>
            </span>
        )
   },
});

module.exports = TaskBadge;
