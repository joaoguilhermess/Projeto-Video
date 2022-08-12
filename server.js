const express = require("express");

var app = express();

function add(name) {
	app.get(name, function(req, res) {
		res.sendFile(__dirname + name);
	});
}

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

add("/video.mp4");

add("/editor.js");

add("/util.js");

add("/img.jpg");

add("/whitneymedium.woff");

app.listen(3000, function() {
	console.log("Ready");
});