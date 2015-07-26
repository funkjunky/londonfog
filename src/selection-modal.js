var React = require('react');

//Props: options => Array, choiceCB => fnc, closeCB => fnc
var SelectionModal = React.createClass({displayName: "SelectionModal",
    componentDidMount: function() {
        React.findDOMNode(this.refs.filter).focus();
        if(this.props.options.length <= 0)
            throw "Modal needs options yo! The array was empty, or it's not an array.";

        //select the first option to start
        this.setState({selected: this.props.options[0].value});
    },

    getInitialState: function() {
        return {
            filter: '',
        };
    },

    render: function() {
        var options = this.props.options.filter(function(option) {
            return option.value.toUpperCase().indexOf(this.state.filter.toUpperCase()) !== -1;
        }.bind(this));

        var unselectedOption = {border: 'solid 1px black', width: 200, backgroundColor: 'white'};
        var selectedOption = {border: 'solid 1px black', width: 200, backgroundColor: '#EEEEFF', boxShadow: '0px 0px 10px 10px #8888FF', zIndex: 11};

        return (
            React.createElement("div", null, 
                React.createElement("div", {style: {position: 'fixed', top: 0, left: 0, backgroundColor: 'black', opacity: 0.5, width: '100%', height: '100%', zIndex: 100,}}), 
                React.createElement("div", {style: {position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', border: '1px dotted gray', padding: 5, zIndex: 102, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontSize: 24}, onClick: this.props.closeCB}, 
                    React.createElement("input", {ref: "filter", onClick: this.preventDefault, style: {fontSize: 24, width: 180, fontFamily: 'FontAwesome'}, type: "text", placeholder: "", onChange: this.setFilterValue, onKeyUp: this.handleKey}), 
                    options.map(function(item, index) {
                        var html = item.html || item.value;
                        return (
                            React.createElement("div", {style: (item.value == this.state.selected) ? selectedOption : unselectedOption, onClick: this.optionChoosen.bind(this, item.key)}, html)
                        );
                    }, this)
                )
            )
        );
    },

    setFilterValue: function(event) {
        this.setState({'filter': event.target.value});
    },

    //Keys: escape => close, enter => chooses visibly selected option, up/down => changes selection
    //note: as items are filtered, your selected item remains selected until it's no longer visible, then is unselected 
    handleKey: function(event) {
        event.preventDefault();

        //TODO: think of a nicer way to do this... it's duplicated and too much code...
        var options = this.props.options.filter(function(option) {
            return option.value.toUpperCase().indexOf(this.state.filter.toUpperCase()) !== -1;
        }.bind(this));

        //get the options index of the currently selected
        var index = options.findIndex(function(item) {
            return item.value == this.state.selected;
        }, this);

        //close modal if escape key was hit
        if(event.keyCode == 27)
            this.props.closeCB();

        //next step is setting selected back to 0 if old selection is gone.
        //If there are no options then we set to null and get out.
        if(index == -1) {
            if(!options.length) {
                this.setState({selected: null});
                return;
            }

            index = 0;
        }
            

        //move up or down on the index based on the key pressed. Or select an item if it's still visible.
        if(event.keyCode == 38 && index > 0)
            --index;
        else if(event.keyCode == 40 && index < (options.length - 1))
            ++index;
        else if(event.keyCode == 13 && index != -1) {
            this.optionChoosen(options[this.state.selIndex].value, event);
            this.closeCB();
        }

        //set new selected
        this.setState({selected: options[index].value});
    },

    preventDefault: function(event) {
        event.stopPropagation();
    },

    optionChoosen: function(item, event) {
        this.props.choiceCB(item);
        //closeCB is called automatically.
    },
});

module.exports = SelectionModal;
