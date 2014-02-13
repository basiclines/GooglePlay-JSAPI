// Google Play Store custom API
var API = require('./api');

// Routing
var express = require("express");
var logfmt = require("logfmt");
var app = express();

// Set logger
app.use(logfmt.requestLogger());

// Routes definitions
var routes = {
	root: '/',
	app: '/app/:appID',
	search: '/search/*'
}

// API response headers
var apiHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	'Access-Control-Allow-Headers': 'Content-Type'
}

// Routing Root
app.get(routes.root, function(req, res) {
  res.send('Hello World!');
});

// Routing App
app.get(routes.app, function(req, res) {

	res.writeHead(200, apiHeaders);

	// Get options from request
	var options = {
		appID: req.params.appID,
		lang: req.headers["accept-language"].split(",")[0].replace("-", "_")
	};

	API.getApp(options, res);
});

// Initialize
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
