var _ = require('underscore');

var Palette = require('./palette');


var Styles = {};

Styles.with = function(key, additionalStyles) {
    return _.extend(_.clone(Styles[key]), additionalStyles);
};

Styles.fullWidth = {width: '100%'};
Styles.columnRow = _.extend(Styles.fullWidth, {overflow: 'hidden', padding: 2, height: 30});

module.exports = Styles;
