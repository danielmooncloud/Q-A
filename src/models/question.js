'use strict';

const mongoose = require('mongoose');


const sortFunction = (a, b) => {
	return a.votes.length === b.votes.length ? 
		b.updatedAt - a.updatedAt : 
		b.votes.length - a.votes.length;
}

const AnswerSchema = new mongoose.Schema({
	"text" : String,
	"createdAt" : {type: Date, default: Date.now},
	"createdBy" : String,
	"updatedAt" : {type: Date, default: Date.now},
	"votes" : {type: Array, default: []}
})

AnswerSchema.method("update", function(updates, callback) {
	Object.assign(this, updates);
	return this.parent().save(callback);
})


const QuestionSchema = new mongoose.Schema({
	"text" : String,
	"createdAt" : {type: Date, default: Date.now},
	"createdBy"	: String,
	"answers" : [AnswerSchema]
})

QuestionSchema.pre("save", function(next) {
	this.answers.sort(sortFunction);
	return next();
})

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
