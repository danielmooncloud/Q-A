
const QCtrl = ($scope, dataService) => {

	$scope.getCurrentUser = () => {
		dataService.getCurrentUser((response) => {
			$scope.currentUser = response.data.username;
		})
	} 

	$scope.getCurrentUser(); 



	$scope.getQuestions = () => {
		dataService.getQuestions((response) => {
			$scope.questions = response.data;
			$scope.questions.forEach((question) => {
				if(question.createdBy !== $scope.currentUser) {
					question.notMine = true;
				} else {
					question.notMine = false;
				}
			})
		})
	}

	$scope.getQuestions();
	

	$scope.addQuestion = () => {
		if($scope.input !== '' && $scope.input !== undefined) {
			var question = {
				"text" : $scope.input,
				"createdAt" : Date.now()
			} 

			dataService.addQuestion(question, $scope.getQuestions);
			$scope.input = '';
		}
		
	}

	$scope.deleteQuestion = (question) => {
		dataService.deleteQuestion(question, $scope.getQuestions);
	}
}

export default QCtrl;