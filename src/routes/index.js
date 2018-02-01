'use strict';

const express = require('express');
const User = require('../models/user');
const mid = require('../middleware');
const router = express.Router();



router.get('/qa', mid.requiresLogin, (req, res, next) =>  {
	res.render('index');
})

router.get('/register', mid.loggedOut, (req, res, next) => {
	res.render('register');
});

router.post('/register', (req, res, next) => {
	if(req.body.name && req.body.username && req.body.password && req.body.confirmPassword) {
		if(req.body.password !== req.body.confirmPassword) {
			const err = new Error('Passwords must match');
			err.status = 400;
			return next(err);
		} else {
			const userData = {
				name: req.body.name,
				username: req.body.username,
				password: req.body.password
			}

			User.create(userData, (err, user) => {
				if(err) return next(err);
				req.session.userId = user._id;
				req.session.username = user.username;
				return res.redirect('/qa');
			});
		}

	} else {
		const err = new Error('All Fields Required.');
		err.status = 400;
		return next(err);
	}
});


router.get('/logout', (req, res, next) => {
	if(req.session) {
		req.session.destroy((err) => {
			if(err) return next(err)
			res.redirect('/');
		})
	}
})

router.get('/', mid.loggedOut, (req, res, next) => {
	res.render('login');
});


//When a user logs in, the User model retrieves the record matching the username, 
//authenticates the supplied password and sets properties on the session object

router.post('/', (req, res, next) => {
	if(req.body.username && req.body.password) {
		User.authenticate(req.body.username, req.body.password, (error, user) => {
			if(error) return next(error);
			req.session.userId = user._id;
			req.session.username = user.username;
			res.redirect('/qa');
		})
	} else {
		const err = new Error('Username and Password are required.')
		err.status = 401;
		return next(err);
	}
})

module.exports = router;











