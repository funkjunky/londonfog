var React = require('react');
var Router = require('react-router');
var Express = require('express');
var fs = require('fs');

var routes = require('./src/routes');

var app = Express();

app.use('/dist', Express.static(__dirname + '/dist'));

// if using express it might look like this
app.use(function (req, res) {
    // pass in `req.url` and the router will immediately match
    Router.run(routes, req.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler, null));
        var index = fs.readFileSync('index.html', {encoding: 'utf8'});
        res.send(index.replace('%%%content%%%', content));
    });
});

var server = app.listen(9001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
