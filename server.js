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

// array to store all users
var users = [];

// ****************************************************
// html view routing (needs to be in file 'html-routes.js')
// ****************************************************
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});
// ****************************************************



// ****************************************************
// api routing (needs to be in file 'api-routes.js')
// ****************************************************
app.get("/api/friends", function(req, res) {
    res.json(users);
});

app.post("/api/friends", function(req, res) {
    var newUser = req.body;
    users.unshift(newUser);
    console.log(users);

    // compare newUser's answers array (newUser.scores) with each other user's scores array (users[i].scores)
    var match = [];
    match.push(newUser);
    // var totalDifference = 0;
    if (users.length < 2) {
        console.log("unable to do calculation; not enough users");
    } else {
        // var diff = Math.abs(parseInt(newUser.scores[0]) - parseInt(users[1].scores[0]));

        var curUserIndex = 1;
        var totDiffs = [];
        while (curUserIndex < users.length) {
        	var totalDifference = 0;
            for (var i = 0; i < newUser.scores.length; i++) {
                // if ((parseInt(users[curUserIndex].scores[i]) - parseInt(newUser.scores[i])) < 0) {
                //     totalDifference += (parseInt(users[curUserIndex].scores[i]) - parseInt(newUser.scores[i]) * -1);
                // } else {
                //     totalDifference += parseInt(users[curUserIndex].scores[i]) - parseInt(newUser.scores[i]);
                // }
                totalDifference += Math.abs(parseInt(users[curUserIndex].scores[i]) - parseInt(newUser.scores[i]));
            }
            totDiffs.push(totalDifference);
            curUserIndex++;
        }
        console.log("totDiffs: " + totDiffs);

    }
    // newUser.scores[0] - users[0].scores[0];
    // newUser.scores[1] - users[0].scores[1];
    // newUser.scores[2] - users[0].scores[2];
    // newUser.scores[3] - users[0].scores[3];
    // newUser.scores[4] - users[0].scores[4];
    // newUser.scores[5] - users[0].scores[5];
    // newUser.scores[6] - users[0].scores[6];
    // newUser.scores[7] - users[0].scores[7];
    // newUser.scores[8] - users[0].scores[8];
    // newUser.scores[9] - users[0].scores[9];

});

// ****************************************************

app.listen(PORT, function() {
    console.log("server listening on port: " + PORT);
});

exports.app = app;
