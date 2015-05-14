var React = require('react');

var SocketMixin = require('./mixins/socketmixin');
var ModelMixin = require('./mixins/socketmodelmixin');

var Project = React.createClass({displayName: "Project",
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, ModelMixin],
    getDefaultProps: function() {
        return {collection: 'project'};
    },
    getInitialState: function() {
        return {expanded: false, data: this.props.data};
    },
    //TODO: this is bad practice... you're not supposed to set props. So figure out a way to build a new project to replace this one?
    setData: function(model) {
        this.setProps({ data: model });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h2", {onClick:  function() { this.setState({expanded: true}); }}, "Project ", this.props.data.title), 
                 this.state.expanded ? this.props.data.tasks.map(function(item) {
                    return React.createElement(Task, {data: item});
                }) : null
            )
        );
    },
});

module.exports = Project;
