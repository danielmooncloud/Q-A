

const ACtrl = function($scope, $routeParams, dataService) {
	


	$scope.addAnswer = async () => {
		try {
			if($scope.inupt === "" || $scope.input === undefined) return;
			const answer = {
				"text" : $scope.input,
				"createdAt" : Date.now(),
				"updatedAt" : Date.now(),
				"votes" : []
			};
			await dataService.addAnswer($routeParams.id, answer);
			getQuestion();
			$scope.input = "";
		} catch(err) {
			$scope.error = true;
		}
	};


	$scope.deleteAnswer = async (answer) => {
		try {
			await dataService.deleteAnswer($routeParams.id, answer);
			getQuestion();
		} catch(err) {
			$scope.error = true;
		}
	};


	$scope.upvote = async (answer) => {
		try {
			if(answer.votes.indexOf($scope.currentUser) !== -1) return;
			answer.votes.push($scope.currentUser);
			await dataService.updateAnswer($routeParams.id, answer);
			getQuestion();
		} catch(err) {
			$scope.error = true;
		}
	};


	const getCurrentUser = async () => {
		try {
			const response = await dataService.getCurrentUser();
			$scope.currentUser = response.data.username;
		} catch(err) {
			$scope.error = true;
		}
	};


	const getQuestion = async () => {
		try {
			const response = await dataService.getQuestion($routeParams.id);
			$scope.question = response.data;
			$scope.answers = $scope.question.answers;
			$scope.answers.forEach((answer) => {
				answer.notMine = (answer.createdBy !== $scope.currentUser);
			});
			$scope.$apply();
		} catch(err) {
			$scope.error = true;
		}
	};

	getCurrentUser();
	getQuestion();

};

export default ACtrl;





