'use strict';

var express = require('express');
var User = require('../models/user');
var mid = require('../middleware');
var router = express.Router();



router.get('/qa', mid.requiresLogin, function(req, res, next) {
	return res.render('index');
})

router.get('/register', mid.loggedOut, function(req, res, next) {
	return res.render('register');
})

router.post('/register', function(req, res, next) {
	if(req.body.name && req.body.username && req.body.password && req.body.confirmPassword) {
		if(req.body.password !== req.body.confirmPassword) {
			var err = new Error('Passwords must match');
			err.status = 400;
			return next(err);
		} else {
			var userData = {
				name: req.body.name,
				username: req.body.username,
				password: req.body.password
			}

			User.create(userData, function(err, user) {
				if(err) return next(err);
				req.session.userId = user._id;
				req.session.username = user.username;
				return res.redirect('/qa');
			})
		}

	} else {
		var err = new Error('All Fields Required.')
		err.status = 400;
		return next(err);
	}
})
 
router.get('/logout', function(req, res, next) {
	if(req.session) {
		req.session.destroy(function(err) {
			if(err) return next(err)
			res.redirect('/');
		})
	}
})

router.get('/', mid.loggedOut, function(req, res, next) {
	return res.render('login');
})

router.post('/', function(req, res, next) {
	if(req.body.username && req.body.password) {
		User.authenticate(req.body.username, req.body.password, function(error, user) {
			if(error) return next(error);
			req.session.userId = user._id;
			req.session.username = user.username;
			res.redirect('/qa');
		})
	} else {
		var err = new Error('Username and Password are required.')
		err.status = 401;
		return next(err);
	}
})

module.exports = router;











