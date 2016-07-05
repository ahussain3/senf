var express 	= require('express');
var mongoose 	= require('mongoose');
var bodyParser 	= require('body-parser');

var usersRoute 	= require('./server/modules/users/route');

var connectioString = "mongodb://localhost:27017/test";

mongoose.connect(connectioString, function(err){
	console.log("DB Connected ");
}); // connect to database

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", usersRoute);

app.use(express.static(__dirname+"/"));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});