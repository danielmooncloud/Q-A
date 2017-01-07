'use strict';

var angular = require('angular');

angular.module('qaApp').service('dataService', ['$http', function($http) {
	
	
	this.getCurrentUser = function(callback) {
		return $http.get('/api/username').then(callback);
	} 

	this.getQuestions = function(callback) {
		return $http.get('/api/questions').then(callback);
	}

	this.addQuestion = function(question, callback) {
		return $http.post('/api/questions', question).then(callback);
	}

	this.deleteQuestion = function(question, callback) {
		return $http.delete('/api/questions/' + question._id).then(callback);
	}

	this.getQuestion = function(id, callback) {
		return $http.get('/api/questions/' + id).then(callback);
	}

	this.addAnswer = function(id, answer, callback) {
		return $http.post('/api/questions/' + id + '/answers', answer).then(callback);
	}

	this.deleteAnswer = function(id, answer, callback) {
		return $http.delete('/api/questions/' + id + '/answers/' + answer._id).then(callback);
	}

	this.updateAnswer = function(id, answer, callback) {
		return $http.put('/api/questions/' + id + '/answers/' + answer._id, answer).then(callback);
	}

	
}])