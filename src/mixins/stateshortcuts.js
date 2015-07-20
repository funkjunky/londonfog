var stateShortcuts = {
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
            console.log('this: ', this);
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
            this.setState(key, value);
            console.log('current state: ', this.state);
        };
    },
};

module.exports = stateShortcuts;
