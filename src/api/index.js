'use strict';

var express = require('express');
var Question = require('../models/question');
var User = require('../models/user');
var router = express.Router();
var mid = require('../middleware');


router.param("qID", function(req, res, next, id) {
	Question.findById(id, function(err, question) {
		if(err) return next(err);
		if(!question) {
			var err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.question = question;
		return next();
	})
})

router.param("aID", function(req, res, next, id) {
	req.answer = req.question.answers.id(id);
	if(!req.question) {
		var err = new Error("Not Found");
		err.status = 404;
		return next(err);
	}
	next();
})


router.get('/username', mid.requiresLogin, function(req, res, next) {
	res.json({"username" : req.session.username});
}) 

router.get('/questions', function(req, res, next) {
	Question.find({})
			.sort({"createdAt" : -1})
	 		.exec(function(err, questions) {
				if (err) return next(err); 
				res.json(questions);
			})
})

router.post('/questions', function(req, res, next) {
	var question = req.body;
	req.body.createdBy = req.session.username;
	Question.create(question, function(err, question) {
		if(err) return next(err);
		res.status(201).json(question);	
	}) 
})

router.delete('/questions/:qID', function(req, res, next) {
	req.question.remove(function(err) {
		if (err) return next(err);
		res.json({"message" : "This question has been deleted"})
	})
})

router.get('/questions/:qID', function(req, res, next) {
	res.json(req.question)

})

router.post('/questions/:qID/answers', function(req, res, next) {
	req.body.createdBy = req.session.username;
	req.question.answers.push(req.body);
	req.question.save(function(err, question) {
		if(err) return next(err);
		res.status(201).json(question);
	})
})

router.delete('/questions/:qID/answers/:aID', function(req, res, next) {
	req.answer.remove(function(err) {
		if(err) return next(err);
		req.question.save(function(err, question) {
			if(err) return next(err);
			res.json(question);
		})
	})
})

router.put('/questions/:qID/answers/:aID', function(req, res, next) {
	req.answer.update(req.body, function(err, question) {
		if(err) return next(err);
		res.status(201).json(question);
	})
})



module.exports = router;