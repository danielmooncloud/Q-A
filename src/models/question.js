'use strict';

const mongoose = require('mongoose');


const sortFunction = (a, b) => {
	if(a.votes === b.votes) return b.updatedAt - a.updatedAt;
	return b.votes - a.votes;
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
	this.parent().save(callback);
})


const QuestionSchema = new mongoose.Schema({
	"text" : String,
	"createdAt" : {type: Date, default: Date.now},
	"createdBy"	: String,
	"answers" : [AnswerSchema]
})

QuestionSchema.pre("save", function(next) {
	this.answers.sort(sortFunction);
	next();
})

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
