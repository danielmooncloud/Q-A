
const QCtrl = function($scope, dataService) {
	

	$scope.addQuestion = async () => {
		if($scope.input === '' || $scope.input === undefined) return;
		try {
			var question = {
				"text" : $scope.input,
				"createdAt" : Date.now()
			} 
			await dataService.addQuestion(question);
			$scope.input = '';
			getQuestions();
		} catch(err) {
			console.error(err)
		}	
	}

	$scope.deleteQuestion = async (question) => {
		try {
			await dataService.deleteQuestion(question);
			getQuestions();
		} catch(err) {
			console.error(err)
		}
	}


	const getCurrentUser = async () => {
		try {
			const response = await dataService.getCurrentUser();
			$scope.currentUser = response.data.username;
			$scope.$apply();
		} catch(err) {
			console.error(err)
		}
	} 

	
	const getQuestions = async () => {
		try {
			const response = await dataService.getQuestions();
			$scope.questions = response.data;
			$scope.questions.forEach((question) => {
				question.notMine = (question.createdBy !== $scope.currentUser)
			});
			$scope.$apply();
		} catch(err) {
			console.error(err)
		}
	}

	$scope.error = {
		current: false,
		message: ""
	}
	

	getCurrentUser(); 
	getQuestions();
}

export default QCtrl;