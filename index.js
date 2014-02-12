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

server.listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');
