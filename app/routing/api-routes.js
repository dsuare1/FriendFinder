var api = function() {
    this.jsonFriends = function(app, friends) {
            app.get("/api/friends", function(req, res) {
                res.json(friends);
            });
        },
        this.postUser = function(app, friends) {
            app.post("/api/friends", function(req, res) {                
                var newUser = req.body;
                if (friends.length < 1) {
                    console.log("unable to do calculation; not enough users");
                } else {

                    var curUserIndex = 0;
                    var totDiffs = [];
                    while (curUserIndex < friends.length) {
                        var totalDifference = 0;
                        for (var i = 0; i < newUser.scores.length; i++) {
                            totalDifference += Math.abs(parseInt(friends[curUserIndex].scores[i]) - parseInt(newUser.scores[i]));
                        }
                        totDiffs.push(totalDifference);
                        curUserIndex++;
                    }
                    console.log("totDiffs: " + totDiffs);

                    var lowest = totDiffs[0];
                    for (var i = 0; i < totDiffs.length; i++) {
                    	console.log("find lowest");
                        if (totDiffs[i] < lowest) {
                            lowest = totDiffs[i];
                        }
                    }
                    console.log("index of lowest: " + totDiffs.indexOf(lowest));
                    var bestMatch = totDiffs.indexOf(lowest);
                    res.send(friends[bestMatch]);
                }
                friends.push(newUser);
            });
        }
};

module.exports = api;



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
