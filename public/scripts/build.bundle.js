webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _angularRoute = __webpack_require__(3);

	var _angularRoute2 = _interopRequireDefault(_angularRoute);

	var _AppConfig = __webpack_require__(5);

	var _AppConfig2 = _interopRequireDefault(_AppConfig);

	var _ACtrl = __webpack_require__(6);

	var _ACtrl2 = _interopRequireDefault(_ACtrl);

	var _QCtrl = __webpack_require__(7);

	var _QCtrl2 = _interopRequireDefault(_QCtrl);

	var _dataService = __webpack_require__(8);

	var _dataService2 = _interopRequireDefault(_dataService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = _angular2.default.module('qaApp', [_angularRoute2.default]).config(["$routeProvider", _AppConfig2.default]).service('dataService', ['$http', _dataService2.default]).controller('ACtrl', ['$scope', '$routeParams', "dataService", _ACtrl2.default]).controller('QCtrl', ['$scope', "dataService", _QCtrl2.default]);

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var AppConfig = function AppConfig($routeProvider) {
		return $routeProvider.when('/', {
			controller: 'QCtrl',
			templateUrl: 'templates/questions.html'
		}).when('/:id', {
			controller: 'ACtrl',
			templateUrl: 'templates/answers.html'
		}).otherwise({
			redirectTo: '/'
		});
	};

	exports.default = AppConfig;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var ACtrl = function ACtrl($scope, $routeParams, dataService) {

		$scope.getCurrentUser = function () {
			dataService.getCurrentUser(function (response) {
				$scope.currentUser = response.data.username;
			});
		};

		$scope.getCurrentUser();

		$scope.getQuestion = function () {
			dataService.getQuestion($routeParams.id, function (response) {
				$scope.question = response.data;
				$scope.answers = $scope.question.answers;
				$scope.answers.forEach(function (answer) {
					if (answer.createdBy !== $scope.currentUser) {
						answer.notMine = true;
					} else {
						answer.notMine = false;
					}
				});
			});
		};

		$scope.getQuestion();

		$scope.addAnswer = function () {
			if ($scope.input !== '' && $scope.input !== undefined) {
				var answer = {
					"text": $scope.input,
					"createdAt": Date.now(),
					"updatedAt": Date.now(),
					"votes": []
				};
				dataService.addAnswer($routeParams.id, answer, $scope.getQuestion);
				$scope.input = '';
			}
		};

		$scope.deleteAnswer = function (answer) {
			return dataService.deleteAnswer($routeParams.id, answer, $scope.getQuestion);
		};

		$scope.updateAnswer = function (answer) {
			answer.editing = false;
			answer.updatedAt = Date.now();
			dataService.updateAnswer($routeParams.id, answer, $scope.getQuestion);
		};

		$scope.upvote = function (answer) {
			if (answer.votes.indexOf($scope.currentUser) === -1) {
				answer.votes.push($scope.currentUser);
				dataService.updateAnswer($routeParams.id, answer, $scope.getQuestion);
			}
		};
	};

	exports.default = ACtrl;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var QCtrl = function QCtrl($scope, dataService) {

		$scope.getCurrentUser = function () {
			dataService.getCurrentUser(function (response) {
				$scope.currentUser = response.data.username;
			});
		};

		$scope.getCurrentUser();

		$scope.getQuestions = function () {
			dataService.getQuestions(function (response) {
				$scope.questions = response.data;
				$scope.questions.forEach(function (question) {
					if (question.createdBy !== $scope.currentUser) {
						question.notMine = true;
					} else {
						question.notMine = false;
					}
				});
			});
		};

		$scope.getQuestions();

		$scope.addQuestion = function () {
			if ($scope.input !== '' && $scope.input !== undefined) {
				var question = {
					"text": $scope.input,
					"createdAt": Date.now()
				};

				dataService.addQuestion(question, $scope.getQuestions);
				$scope.input = '';
			}
		};

		$scope.deleteQuestion = function (question) {
			dataService.deleteQuestion(question, $scope.getQuestions);
		};
	};

	exports.default = QCtrl;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var dataService = function dataService($http) {

		this.getCurrentUser = function (callback) {
			return $http.get('/api/username').then(callback);
		};

		this.getQuestions = function (callback) {
			return $http.get('/api/questions').then(callback);
		};

		this.addQuestion = function (question, callback) {
			return $http.post('/api/questions', question).then(callback);
		};

		this.deleteQuestion = function (question, callback) {
			return $http.delete('/api/questions/' + question._id).then(callback);
		};

		this.getQuestion = function (id, callback) {
			return $http.get('/api/questions/' + id).then(callback);
		};

		this.addAnswer = function (id, answer, callback) {
			return $http.post('/api/questions/' + id + '/answers', answer).then(callback);
		};

		this.deleteAnswer = function (id, answer, callback) {
			return $http.delete('/api/questions/' + id + '/answers/' + answer._id).then(callback);
		};

		this.updateAnswer = function (id, answer, callback) {
			return $http.put('/api/questions/' + id + '/answers/' + answer._id, answer).then(callback);
		};
	};

	exports.default = dataService;

/***/ })
]);