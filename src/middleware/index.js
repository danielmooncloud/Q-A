'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');

const loggedOut = (req, res, next) => {
	if(!(req.session && req.session.userId)) return next();
	res.redirect("/qa");
}

const requiresLogin = (req, res, next) => {
	if(req.session.userId) return next();
	const err = new Error('You must be logged in to view this page!')
	err.status = 401;
	return next(err);
}


module.exports = {
	loggedOut,
	requiresLogin
}