/*
	Users model defines and declared all the methods which we can use to deal with users schema in mongoDB.
*/
var User = require('./usersSchema');

function find(req, callback){
	var response = {};
	User.find({}, function(err, users){
		if(err) {
			response = {status:"fail", statuscode:400, data: err};
		} else {
			response = {status:"ok", statuscode:200, data: users};
		}
		callback(response);
	});
}

function findByUsername(query, callback){
	var response = {};
	User.findOne(query, function(err, users){
		if(err) {
			response = {status:"fail", statuscode:400, data: err};
		} else {
			response = {status:"ok", statuscode:200, data: users};
		}
		callback(response);
	});
}

function findAndUpdateFeed(query, feed, callback){
	User.update(query, {$push: {feeds: feed}},{safe: true}, function(err, model) {
		if(err) {
			callback(err);
		} else {
			callback(model);
		}
	});
}

module.exports.find = find;
module.exports.findByUsername = findByUsername;
module.exports.findAndUpdateFeed = findAndUpdateFeed;