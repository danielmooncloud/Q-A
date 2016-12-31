'use strict';

var express = require('express');
var parser = require('body-parser').json;
var routes = require('./api');
var app = express();

app.use(parser());

app.use('/', express.static('public'));

require('./database');




app.use('/api', routes);



//Route Not Found
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
})

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({error : {message : err.message}});
})



app.listen(3000, function() {
	console.log("The server is now running on port 3000");
}) 




