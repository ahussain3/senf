/*
    This file declares the user schema and make it available to mongoose.
*/
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    username: String,
    password: String,
    admin: Boolean,
	user_profile_image_url: String,
	feeds: [{
		id_str: String,
		post_type: String,
		post_text: String,
		likes_count: String,
		comments_count: String,
		created_at: Date,
		media_url: String,
		link_url: String
	}]
}));