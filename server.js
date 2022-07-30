const express = require("express");

var app = express();

function add(name) {
    app.get(name, function(req, res) {
        //console.log(name);
        res.sendFile(__dirname + name);
    });
}

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

add("/video.mp4");

add("/script.js");

add("/img.jpg");

app.listen(3000, function() {
    console.log("Ready");
});
