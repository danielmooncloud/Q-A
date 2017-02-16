'use strict';

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qa', function(err) {
	if(err) {
		console.log("There was an error connecting to the database");
	} else {
		console.log("Successfully connected to the database");
	}
}) 

var db = mongoose.connection;

module.exports = db;
