

const ACtrl = ($scope, $routeParams, dataService) => {
	
	$scope.getCurrentUser = () => {
		dataService.getCurrentUser((response) => {
			$scope.currentUser = response.data.username;
		})
	} 

	$scope.getCurrentUser(); 


	$scope.getQuestion = () => {
		dataService.getQuestion($routeParams.id, (response) => {
			$scope.question = response.data;
			$scope.answers = $scope.question.answers;
			$scope.answers.forEach((answer) => {
				if(answer.createdBy !== $scope.currentUser) {
					answer.notMine = true;
				} else {
					answer.notMine = false;
				}
			})
		})
	} 

	$scope.getQuestion();
	
	$scope.addAnswer = () => {
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

	$scope.deleteAnswer = (answer) => dataService.deleteAnswer($routeParams.id, answer, $scope.getQuestion);
	

	$scope.updateAnswer = (answer) => {
		answer.editing = false;
		answer.updatedAt = Date.now();
		dataService.updateAnswer($routeParams.id, answer, $scope.getQuestion);
	}

	$scope.upvote = (answer) => {
		if(answer.votes.indexOf($scope.currentUser) === -1) {
			answer.votes.push($scope.currentUser);
			dataService.updateAnswer($routeParams.id, answer, $scope.getQuestion);
		}
		
	}

};

export default ACtrl;





