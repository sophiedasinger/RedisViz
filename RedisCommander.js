"use strict";

function RedisCommander (options) {
	var redisClient = options.redisClient;

	this.scan = function (pattern, cursor, callback) {
		var matches = [];
		redisClient.scan(0, "MATCH", pattern, function (error, results) {
			if (error) {
				return callback(error);
			}

			var cursor = results[0];
			matches = matches.concat(results[1]);
			if (cursor === '0') {
				callback(null, matches);
			} else {
				scan(pattern, cursor, callback);
			}
		});
	};

	this.getKey = function (key, callback) {
		redisClient.type(key, function (error, type) {
			if (error) {
				return callback(error);
			}

			var command = typeToCmd[type];
			redisClient[command](key, function (error, results) {
				if (error) {
					callback(error);
				} else {
					callback(null, results);
				}
			});
		});
	};
 }

module.exports = RedisCommander;