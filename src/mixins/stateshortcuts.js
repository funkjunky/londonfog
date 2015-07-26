var stateShortcuts = {
    getInitialState: function() {
        return {};
    },
    //calls the provided function if enter is hit.
    enter: function(cb) {
        return function(event) {
            if(event.keyCode == 13)
                cb.call(this);
        }.bind(this);
    },
    //convinience function for setting states in react components
    toggleState: function(state) {
        return function() {
            var obj = {};
            obj[state] = !this.state[state];
            this.setState(obj);
        }.bind(this);
    },
    //sets the state for the item,but also falses all other 'states' when turned on.
    toggleExclusiveState: function(state, states) {
        return function() {
            console.log('this: ', this);
            var obj = {};
            obj[state] = !this.state[state];
            if(obj[state])
                states.forEach(function(item) {
                    if(item != state)
                        obj[item] = false;
                });
            this.setState(obj);
        }.bind(this);
    },
    setStateValue: function(key) {
        return function(value) {
            //TODO: find cleaner way to do this in JS
            var obj = {};
            obj[key] = value;
            this.setState(obj);
        }.bind(this);
    },
};

module.exports = stateShortcuts;
