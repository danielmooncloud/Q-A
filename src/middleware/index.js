'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');

var loggedOut = function(req, res, next) {
	if(req.session && req.session.userId) {
		res.redirect('/qa');
	} else {
		next();
	}
}

var requiresLogin = function(req, res, next) {
	if(req.session.userId) {
		return next();
	} else {
		var err = new Error('You must be logged in to view this page!')
		err.status = 401;
		return next(err);
	}

}



module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;

