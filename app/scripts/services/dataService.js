'use strict';

var angular = require('angular');

angular.module('qaApp').service('dataService', ['$http', function($http) {
	
	this.getQuestions = function(callback) {
		$http.get('/api/questions').then(callback);
	}

	this.addQuestion = function(question) {
		$http.post('/api/questions', question);
	}

	this.deleteQuestion = function(question) {
		$http.delete('/api/questions/' + question._id);
	}

	
}])