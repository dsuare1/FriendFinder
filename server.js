var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// used to serve the static files (style.css, imgs, etc.)
app.use("/assets", express.static(__dirname + "/assets"));

// ****************************************************
// routing (needs to be in file 'html-routes.js')
// ****************************************************
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});
// ****************************************************

app.listen(PORT, function() {
	console.log("server listening on port: " + PORT);
});

// exports.server = server;