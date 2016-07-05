var config = require('../../config/config.js'),
	userModel 	= require("../modules/users/usersModel"),
	mongoose = require('mongoose'),
	rl = require('readline'),
    csvtojson = require("csvtojson").Converter;

var importData = function (filename) {
	var converter = new csvtojson({});
	converter.fromFile("data/"+filename,function(err,result){
		if(err) {
			console.log('\n\n***Unable to process CSV ' + err+"****\n\n");
		} else {
			//MongoDB Connection
			mongoose.connect(config.db);
			var db = mongoose.connection;
			db.on('error', function () {
			  console.log('\n\n***Unable to connect to database at ' + config.db +"****\n\n");
			});
			var csvRecords = result, updated = 0;
			
			csvRecords.forEach(function(row){
				if(row.user_name!="") {
					userModel.findByUsername({"username":row.user_name}, function(response){
						if(response.data != null) {
							var feed = {
								"id_str": row.id_str,
								"post_type": row.post_type,
								"post_text": row.post_text,
								"likes_count": row.likes_count,
								"comments_count": row.comments_count,
								"created_at": row.created_at,
								"media_url": row.media_url,
								"link_url": row.link_url
							};
							userModel.findAndUpdateFeed({"username":row.user_name}, feed, function(processResponse){
								//console.log(processResponse);
							});
						}
					});
				}
			});
			//process.exit(0);
			console.log("\n\nCSV Imported successfully !!");
			process.exit(0);
		}
	});
};


var inputSelection = function () {
	var prompts = rl.createInterface(process.stdin, process.stdout);
	
	console.log('\n\n');
	console.log('==================================================================');
	console.log('To import the feeds of user please follow the steps.');
	console.log('==================================================================\n');
	console.log('1. Upload the file to server/feed/data/file-to-import.csv');
	console.log('2. Make sure to give the read permission to file.');
	console.log('3. Give file name when script prompts you to enter file name. \n   e.g. file-to-import.csv');
	console.log('==================================================================\n\n');

	prompts.question('Please insert the name of the file to be Import ? ', function (option) {
		importData(option);
		prompts.close();
	});
}();