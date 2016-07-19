var htmlRoutes = function() {
	this.app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "home.html"));
	});
}

exports.htmlRoutes = htmlRoutes;