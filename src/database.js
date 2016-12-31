'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa', function(err) {
	if(err) {
		console.log("There was an error connecting to the database");
	} else {
		console.log("Successfully connected to the database");
	}
}) 