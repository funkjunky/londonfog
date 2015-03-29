var React = require('react');
var Router = require('react-router');

var Project = React.createClass({
    getInitialState: function() {
        return {expanded: false};
    },
    render: function() {
        return (
            <div>
                <h2 onClick={ function() { this.setState({expanded: true}); } }>Project {this.props.data.title}</h2>
                { this.state.expanded ? this.props.data.tasks.map(function(item) {
                    return <Task data={item} />;
                }) : null}
            </div>
        );
    },
});

module.exports = Project;
