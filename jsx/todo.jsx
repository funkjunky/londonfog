var React = require('react/addons');

var TaskBadge = require('./task-badge');
var ProjectBadge = require('./project-badge');
var ContentEditable = require('./content-editable');
var SocketModelMixin = require('./mixins/socketmodelmixin');
var SocketMixin = require('./mixins/socketmixin');

var Todo = React.createClass({
    url: 'http://localhost:1212/',
    mixins: [SocketMixin, SocketModelMixin],
    getDefaultProps: function() {
        return {collection: 'todo'};
    },
    getInitialState: function() {
        //TODO: there must be a better way... I can't just return props.data, because then they reference the same object.
        console.log('props data: ', this.props.data);
        return {
            title: this.props.data.title,
            status: this.props.data.status,
            project: this.props.data.project,
            task: this.props.data.task,
        };
    },
    getData: function() {
        return React.addons.update(this.props.data, {
            title: {$set: this.state.title},
            status: {$set: this.state.status}
        });
    },
    setData: function(model) {
        //TODO: maybe put this in the model mixin? It's annoying, but it seems if you setData and nothing has changed, it still triggers componentDidUpda
        if(model.title == this.state.title && model.status == this.state.status)
            return;

        this.setState({ title: model.title, status: model.status });
    },
    //TODO: this is duplicated in column-list
    getNewItem: function() { //This is for collection mixin. TODO: make it more obvious this is for a mixin.
        return {title: '', status: 'new',};
    },
    saveModelAndClear: function() {
        console.log('save and clear called');
        this.saveModel(this._getData(), function() {
            this._setData(this.getNewItem());
        }.bind(this));
        return false;
    },
    handleChange: function(event) {
        console.log('new todo title: ', event.target.value);
        //TODO: don't call setState twice
        this.setState({title: event.target.value});
    },
    changeStatus: function(status) {
        this.setState({status: status});
    },
    render: function() {
        var self = this;
        console.log('this.state.title: ', this.state.title);
        return (
            <div>
                {!this.props.disabled ? <span>
                    { this.state.status == 'new'    ? <button type="button" onClick={ this.changeStatus.bind(this, 'active') }>Start</button> : null }
                    { this.state.status == 'active' ? <button type="button" onClick={ this.changeStatus.bind(this, 'paused') }>Pause</button> : null }
                    { this.state.status == 'active' ? <button type="button" onClick={ this.changeStatus.bind(this, 'finished') }>Finish</button> : null }
                    { this.state.status == 'paused' ? <button type="button" onClick={ this.changeStatus.bind(this, 'active') }>Continue</button> : null }
                    { this.state.status == 'paused' ? <button type="button" onClick={ this.changeStatus.bind(this, 'frozen') }>Freeze</button> : null }
                    { this.state.status == 'frozen' ? <button type="button" onClick={ this.changeStatus.bind(this, 'paused') }>Unfreeze</button> : null }
                    { this.state.status == 'finished' ? <button type="button" onClick={ this.changeStatus.bind(this, 'paused') }>Undo Finished</button> : null }
                </span> : null }
                <p><ContentEditable html={this.state.title} onChange={this.handleChange} onSubmit={this.saveModelAndClear}></ContentEditable></p>
                <span>
                    { this.state.task ? <TaskBadge task={this.state.task} /> : null }
                    { this.state.project ? <ProjectBadge project={this.state.project} /> : null }
                    { (!this.state.task && !this.state.project) ? <button type="button">Assign</button> : null }
                </span>
                {(!this.props._id && !this.props.data._id) ? <button type="button" onClick={this.saveModelAndClear}>Create</button> : null }
            </div>
        );
   },
});

module.exports = Todo;
