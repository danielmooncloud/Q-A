'use strict';

var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	"text" : String,
	"createdAt" : {type: Date, default: Date.now}
})

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
