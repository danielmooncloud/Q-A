'use strict';

const express = require('express');
const User = require('../models/user');
const mid = require('../middleware');
const router = express.Router();
const passError = require("../util");

const setSession = (req, res, next, url) => (err, user) => {
	if(err) return next(err);
	req.session.userId = user._id;
	req.session.username = user.username;
	return res.redirect(url);
}

const renderTemplate = template => (req, res, next) => {
	return res.render(template);
}


router.get('/qa', mid.requiresLogin, renderTemplate("index"));


router.get('/register', mid.loggedOut, renderTemplate("register"));


router.post('/register', (req, res, next) => {
	const { name, username, password, confirmPassword } = req.body;
	if(!(name && username && password && confirmPassword)) {
		return next(passError("All Fields Required.", 400));
	} else if(password !== confirmPassword) {
		return next(passError('Passwords must match.', 400));
		//Make sure the user doesn't already exist
	} else {
		const userData = { name, username, password };
		//Checks to make sure the user doesn't already exist before creating it
		return User.findOne({ username })
			.exec((err, user) => {
				if(err) return next(err);
				else if(!user) User.create(userData, setSession(req, res, next, "/qa"));
				else return next(passError("Sorry, that username is taken.", 400));
			})
		
	}
});


router.get('/logout', (req, res, next) => {
	if(!req.session) return
	req.session.destroy((err) => {
		if(err) return next(err)
		res.redirect('/');
	})
})


router.get('/', mid.loggedOut, renderTemplate("login"));


//When a user logs in, the User model retrieves the record matching the username, 
//authenticates the supplied password and sets properties on the session object

router.post('/', (req, res, next) => {
	const { username, password } = req.body;
	if(username && password) {
		User.authenticate(username, password, setSession(req, res, next, "/qa"));
	} else {
		return next(passError('Username and Password are required.', 401));
	}
})

module.exports = router;











