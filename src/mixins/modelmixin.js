var _ = require('underscore');

var ModelMixin = {
    ModelMixin: {
        url: null,
        save: function() { throw 'Save Not Implemented'; },
        delete: function() { },
    },
    ComponentWillMount: function() {
    },
    ComponentDidUpdate: function(prevProps, prevState) {
        _.debounce(this.ModelMixin.save, 100)();
    },
};

module.exports = ModelMixin;
