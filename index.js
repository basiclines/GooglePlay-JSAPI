// Local files
var API = require('./api');

// API RESPONSE
var express = require("express");
var logfmt = require("logfmt");
var app = express();

// Set logger
app.use(logfmt.requestLogger());

// Routes definitions
var routes = {
	root: '/',
	app: '/app/*',
	search: '/search/*'
}

// Routing Root
app.get(routes.root, function(req, res) {
  res.send('Hello World!');
});

// Routing App
app.get(routes.app, function(req, res) {

	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	// Get options from request
	var options = {
		appID: req.url.replace(routes.app.split("*")[0], ""),
		lang: req.headers["accept-language"].split(",")[0].replace("-", "_")
	};

	API.getApp(options, res);
});

// Start listening
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


// foreman start
//  heroku ps:scale web=1
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#prerequisites
