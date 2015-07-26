var React = require('react');

var ContentEditable = React.createClass({
    getInitialState: function() {
        var state = {};
        state.html = this.props.html || '';
        return state;
    },
    render: function(){
        //TODO: find where html=undefined and fix it! So I can remove this? Maybe I should keep this safety.
        var html = this.state.html || '';
        return <span id="contenteditable"
            style={this.props.style}
            onKeyUp={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable
            autoFocus={this.props.autofocus}
            placeholder={this.props.placeholder}
            dangerouslySetInnerHTML={{__html: html}}></span>;
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return nextState.html !== this.getDOMNode().innerHTML;
    },
    
    emitChange: function(event){
        if(event.keyCode == 13) {
            this.props.onSubmit();
            return;
        }

        var html = this.getDOMNode().innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
});

module.exports = ContentEditable;
