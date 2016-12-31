'use strict';

var express = require('express');
var Question = require('../models/question');
var router = express.Router();


router.get('/questions', function(req, res, next) {
	Question.find({})
			.sort({"createdAt" : -1})
	 		.exec(function(err, questions) {
				if (err) {
					return next(err);
				} else {
					res.json({"questions" : questions})
				}
			})
})

router.post('/questions', function(req, res, next) {
	var question = req.body;
	Question.create(question, function(err) {
		if(err) {
			return next(err);
		} else {
			res.json({"question" : question, "message" : "question was created!"})
		}
	})
})

router.delete('/questions/:qID', function(req, res, next) {
	var id = req.params.qID;
	Question.remove({"_id" : id}, function(err) {
		if(err) {
			return next(err);
		} else {
			res.json({"message" : "question was deleted!"});
		}
	})
})



module.exports = router;