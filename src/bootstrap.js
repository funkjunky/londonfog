var React = require('react');
var Routes = require('./routes.js');

if(typeof window !== 'undefined') {
    window.onload = function() {
        React.renderComponent(Routes(), document);
    }
}
