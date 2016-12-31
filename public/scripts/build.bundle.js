webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	var ngRoute = __webpack_require__(3);

	var app = angular.module('qaApp', [ngRoute])
	.config(function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				controller: 'QCtrl',
				templateUrl: 'templates/questions.html'		
			})
			.when('/:id', {
				controller: 'ACtrl',
				templateUrl: 'templates/answers.html'
			})
			.otherwise({
				redirectTo: '/'
			})
	})

	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(7);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('qaApp').controller('ACtrl', ['$scope', '$routeParams', 'dataService', function($scope, $routeParams, dataService) {
		
	}])

/***/ }
]);