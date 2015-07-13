var React = require('react');

var TaskBadge = React.createClass({
    types: {
        bug: 'fa fa-bug',
        feature: 'fa fa-star',
        upgrade: 'fa fa-level-up',
    },
    //TODO: add colours and borders nicely according to the task colour?
    //the border and font should be the colour, while the background is a much ligher shade
   render: function() {
        return (
            <span style={{border: 'solid 1px blue'}}>
                <i className={this.types[this.props.task.type]}></i><span> #{this.props.task.id}</span>
            </span>
        )
   },
});

module.exports = TaskBadge;
