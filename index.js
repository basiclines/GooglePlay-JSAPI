// Local files
var apiRequest = require('./request');

// API RESPONSE
var http = require('http');
var sys = require('sys');
var server = http.createServer(function(req, res) {

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    var param = req.url.split("/")[1];
    apiRequest.getContent(param, res);
});

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
	console.log('listening on '+port);
});
