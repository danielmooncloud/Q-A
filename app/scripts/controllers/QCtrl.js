'use strict';

var angular = require('angular');

angular.module('qaApp').controller('QCtrl', ['$scope', 'dataService', function($scope, dataService) {

	$scope.getQuestions = function() {
		dataService.getQuestions(function(response) {
			$scope.questions = response.data.questions;
		})
	}

	$scope.getQuestions();
	

	$scope.addQuestion = function() {
		var question = {
			"text" : $scope.question,
			"createdAt" : Date.now()
		}

		dataService.addQuestion(question);
		$scope.getQuestions();
		$scope.question = '';
	}

	$scope.deleteQuestion = function(question) {
		dataService.deleteQuestion(question);
		$scope.getQuestions();
	}

	$scope.logindex = function($index) {
		console.log($index)
	} 
	

	
}])