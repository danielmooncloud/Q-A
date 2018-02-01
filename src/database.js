'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qa', (err) => {
	if(err) {

		console.log("There was an error connecting to the database", err);
	} else {
		console.log("Successfully connected to the database");
	}
}) 

const db = mongoose.connection;

module.exports = db;
