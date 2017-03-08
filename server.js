var express = require("express");
var app = express();
var redis = require("redis");
var redisClient = redis.createClient();
var RedisCommander = require("./RedisCommander");
var redisCommander = new RedisCommander({redisClient: redisClient});

app.get("/", function (req, res) {
	
});

app.get("/search/:searchTerm", function (req, res) {
	var searchTerm = req.params.searchTerm;
	redisCommander.scan(searchTerm + "*", 0, function (error, results) {
		if (error) {
			res.status(500).json({error: error});
		} else {
			res.status(200).json(results);
		}
	});
});

app.get("/keys/:keyName", function (req, res) {
	var keyName = req.params.keyName;
	redisCommander.getKey(key, function (error, results) {

	});
});

app.listen(3000, function () {
  	console.log("Listening on port 3000...")
});