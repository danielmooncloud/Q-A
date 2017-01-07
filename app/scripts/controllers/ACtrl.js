'use strict';

var angular = require('angular');

angular.module('qaApp').controller('ACtrl', ['$scope', '$routeParams', 'dataService', function($scope, $routeParams, dataService) {
	
	$scope.getCurrentUser = function() {
		dataService.getCurrentUser(function(response) {
			$scope.currentUser = response.data.username;
		})
	} 

	$scope.getCurrentUser(); 


	$scope.getQuestion = function() {
		dataService.getQuestion($routeParams.id, function(response) {
			$scope.question = response.data;
			$scope.answers = $scope.question.answers;
			$scope.answers.forEach(function(answer) {
				if(answer.createdBy !== $scope.currentUser) {
					answer.notMine = true;
				} else {
					answer.notMine = false;
				}
			})
		})
	} 

	$scope.getQuestion();
	
	$scope.addAnswer = function() {
		if($scope.input !== '' && $scope.input !== undefined) {
			var answer = {
			"text" : $scope.input,
			"createdAt" : Date.now(),
			"updatedAt" : Date.now(),
			"votes" : []
		}
			dataService.addAnswer($routeParams.id, answer, $scope.getQuestion);
			$scope.input = '';
		}
	}

	$scope.deleteAnswer = function(answer) {
		dataService.deleteAnswer($routeParams.id, answer, $scope.getQuestion);
	}

	$scope.updateAnswer = function(answer) {
		answer.editing = false;
		answer.updatedAt = Date.now();
		dataService.updateAnswer($routeParams.id, answer, $scope.getQuestion);
	}

	$scope.upvote = function(answer) {
		if(answer.votes.indexOf($scope.currentUser) === -1) {
			answer.votes.push($scope.currentUser);
			dataService.updateAnswer($routeParams.id, answer, $scope.getQuestion);
		}
		
	}

}])





