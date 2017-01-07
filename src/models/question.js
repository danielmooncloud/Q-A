'use strict';

var mongoose = require('mongoose');


var sortFunction = function(a, b) {
	if(a.votes === b.votes) {
		return b.updatedAt - a.updatedAt;
	}
	return b.votes - a.votes;
}

var AnswerSchema = new mongoose.Schema({
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


var QuestionSchema = new mongoose.Schema({
	"text" : String,
	"createdAt" : {type: Date, default: Date.now},
	"createdBy"	: String,
	"answers" : [AnswerSchema]
})

QuestionSchema.pre("save", function(next) {
	this.answers.sort(sortFunction);
	next();
})

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
