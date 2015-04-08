var React = require('react');
var Routes = require('./routes.jsx');

if(typeof window !== 'undefined') {
    window.onload = function() {
        React.renderComponent(Routes(), document);
    }
}
