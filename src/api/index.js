'use strict';

const express = require('express');
const Question = require('../models/question');
const User = require('../models/user');
const router = express.Router();
const mid = require('../middleware');
const passError = require('../util')


router.param("qID", (req, res, next, id) => {
	return Question.findById(id, (err, question) => {
		if(err) return next(err);
		if(!question) return next(passError("Not Found", 404));
		req.question = question;
		return next();
	})
})

router.param("aID", (req, res, next, id) => {
	req.answer = req.question.answers.id(id);
	if(!req.question) return next(passError("Not Found", 404));
	return next();
})


router.get('/username', mid.requiresLogin, (req, res, next) => {
	return res.json({"username" : req.session.username}); 
})

router.get('/questions', (req, res, next) => {
	return Question.find({})
			.sort({"createdAt" : -1})
	 		.exec((err, questions) => {
				if (err) return next(err); 
				return res.json(questions);
			})
})

router.post('/questions', (req, res, next) => {
	const question = req.body;
	req.body.createdBy = req.session.username;
	return Question.create(question, (err, question) => {
		if(err) return next(err);
		return res.status(201).json(question);	
	}) 
})

router.delete('/questions/:qID', (req, res, next) => {
	return req.question.remove((err) => {
		if (err) return next(err);
		return res.json({"message" : "This question has been deleted"})
	})
})

router.get('/questions/:qID', (req, res, next) => {
	return res.json(req.question);
})

router.post('/questions/:qID/answers', (req, res, next) => {
	req.body.createdBy = req.session.username;
	req.question.answers.push(req.body);
	return req.question.save((err, question) => {
		if(err) return next(err);
		return res.status(201).json(question);
	})
})

router.delete('/questions/:qID/answers/:aID', (req, res, next) => {
	return req.answer.remove((err) => {
		if(err) return next(err);
		return req.question.save((err, question) => {
			if(err) return next(err);
			return res.json(question);
		})
	})
})

router.put('/questions/:qID/answers/:aID', (req, res, next) => {
	return req.answer.update(req.body, (err, question) => {
		if(err) return next(err);
		return res.status(201).json(question);
	})
})



module.exports = router;