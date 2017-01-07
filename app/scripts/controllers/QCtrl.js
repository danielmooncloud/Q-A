'use strict';

var angular = require('angular');

angular.module('qaApp').controller('QCtrl', ['$scope','dataService', function($scope, dataService) {


	$scope.getCurrentUser = function() {
		dataService.getCurrentUser(function(response) {
			$scope.currentUser = response.data.username;
		})
	} 

	$scope.getCurrentUser(); 



	$scope.getQuestions = function() {
		dataService.getQuestions(function(response) {
			$scope.questions = response.data;
			$scope.questions.forEach(function(question) {
				if(question.createdBy !== $scope.currentUser) {
					question.notMine = true;
				} else {
					question.notMine = false;
				}
			})
		})
	}

	$scope.getQuestions();
	

	$scope.addQuestion = function() {
		if($scope.input !== '' && $scope.input !== undefined) {
			var question = {
				"text" : $scope.input,
				"createdAt" : Date.now()
			} 

			dataService.addQuestion(question, $scope.getQuestions);
			$scope.input = '';
		}
		
	}

	$scope.deleteQuestion = function(question) {
		dataService.deleteQuestion(question, $scope.getQuestions);
	}

	
}])