var React = require('react');

var SocketMixin = require('./mixins/socketmixin');
var ModelMixin = require('./mixins/socketmodelmixin');

var Project = React.createClass({
    url: 'http://localhost:1212/',
    dataKey: 'data',

    mixins: [SocketMixin, ModelMixin],
    getDefaultProps: function() {
        //TODO: should use getNewItem() function for data, but apparently 'this' isn't instantiated yet.
        return {collection: 'project', data: {title: ''}};
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
