var stateShortcuts = {
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
};

module.exports = stateShortcuts;
