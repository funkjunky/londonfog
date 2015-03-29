var React = require('react');

var ContentEditable = React.createClass({displayName: "ContentEditable",
    render: function(){
        return React.createElement("div", {id: "contenteditable", 
            onInput: this.emitChange, 
            onBlur: this.emitChange, 
            contentEditable: true, 
            dangerouslySetInnerHTML: {__html: this.props.html}});
    },
    shouldComponentUpdate: function(nextProps){
        return nextProps.html !== this.getDOMNode().innerHTML;
    },
    
    componentDidUpdate: function() {
        if ( this.props.html !== this.getDOMNode().innerHTML ) {
           this.getDOMNode().innerHTML = this.props.html;
        }
    },
        
    emitChange: function(){
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
