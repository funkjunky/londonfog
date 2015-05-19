var _ = require('underscore');

var Palette = require('./palette');


var Styles = {};

Styles.with = function(key, additionalStyles) {
    return _.extend(_.clone(Styles[key]), additionalStyles);
};

Styles.fullWidth = {width: '100%'};
Styles.columnRow = _.extend(Styles.fullWidth, {overflow: 'auto', padding: 0, height: 30, marginBottom: 2, marginTop: 2, display: 'table', position: 'relative'});
Styles.rowButton = {borderRadius: 5, width: 24, border: '2px solid black', fontSize: 21, display: 'table-cell', height: '100%'};
Styles.rowBadge = {width: 50, height: 19, padding: 6, fontSize: 20, display: 'table-cell', textAlign: 'center', position: 'absolute', right: 0, top: 0};

module.exports = Styles;
