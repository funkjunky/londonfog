var Express = require('express');
var url = require('url');
require('node-jsx').install({extension: '.jsx'});
var ReactAsync = require('react-async');

var Routes = require('./routes/routes.jsx');

var app = Express();

app.use('/dist', Express.static(__dirname + '/dist'));

// if using express it might look like this
app.get('*', function (req, res) {
    var path = url.parse(req.url).pathname;
    ReactAsync.renderComponentToStringWithAsyncState(Routes({path: path}), function(err, markup) {
        res.send('<!DOCTYPE html>'+markup);
    });
});

var server = app.listen(9001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
