
const QCtrl = function($scope, dataService) {
	

	$scope.addQuestion = async () => {
		try {
			if($scope.input === "" || $scope.input === undefined) return;
			var question = {
				"text" : $scope.input,
				"createdAt" : Date.now()
			}; 
			await dataService.addQuestion(question);
			$scope.input = "";
			getQuestions();
		} catch(err) {
			$scope.error = true;
		}	
	};

	$scope.deleteQuestion = async (question) => {
		try {
			await dataService.deleteQuestion(question);
			getQuestions();
		} catch(err) {
			$scope.error = true;
		}
	};


	const getCurrentUser = async () => {
		try {
			const response = await dataService.getCurrentUser();
			$scope.currentUser = response.data.username;
			$scope.$apply();
		} catch(err) {
			$scope.error = true;
		}
	}; 

	
	const getQuestions = async () => {
		try {
			const response = await dataService.getQuestions();
			$scope.questions = response.data;
			$scope.questions.forEach((question) => {
				question.notMine = (question.createdBy !== $scope.currentUser);
			});
			$scope.$apply();
		} catch(err) {
			$scope.error = true;
		}
	};
	

	getCurrentUser(); 
	getQuestions();
};

export default QCtrl;