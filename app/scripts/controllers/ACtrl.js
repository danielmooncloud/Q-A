

const ACtrl = function($scope, $routeParams, dataService) {
	
	$scope.addAnswer = async () => {
		if($scope.inupt === "" || $scope.input === undefined) return;
		try {
			const answer = {
				"text" : $scope.input,
				"createdAt" : Date.now(),
				"updatedAt" : Date.now(),
				"votes" : []
			}
			await dataService.addAnswer($routeParams.id, answer);
			getQuestion();
			$scope.input = '';
		} catch(err) {
			console.error(err)
		}
	}


	$scope.deleteAnswer = async (answer) => {
		try {
			await dataService.deleteAnswer($routeParams.id, answer);
			getQuestion();
		} catch(err) {
			console.error(err)
		}
	}


	$scope.upvote = async (answer) => {
		if(answer.votes.indexOf($scope.currentUser) !== -1) return;
		try {
			answer.votes.push($scope.currentUser);
			await dataService.updateAnswer($routeParams.id, answer);
			getQuestion();
		} catch(err) {
			console.error(err)
		}
	}


	const getCurrentUser = async () => {
		try {
			const response = await dataService.getCurrentUser();
			$scope.currentUser = response.data.username;
		} catch(err) {
			console.error(err)
		}
	}


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
			console.error(err)
		}
	}


	const updateAnswer = async (answer) => {
		try {
			answer.editing = false;
			answer.updatedAt = Date.now();
			await dataService.updateAnswer($routeParams.id, answer);
			getQuestion();
		} catch(err) {
			console.error(err)
		}
	}


	getCurrentUser();
	getQuestion();

};

export default ACtrl;





