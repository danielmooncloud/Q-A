webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_route__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular_route___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular_route__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_config_AppConfig_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scripts_controllers_ACtrl_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scripts_controllers_QCtrl_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scripts_services_dataService_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scss_application_scss__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scss_application_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__scss_application_scss__);








const app = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('qaApp', [__WEBPACK_IMPORTED_MODULE_1_angular_route___default.a]).config(["$routeProvider", __WEBPACK_IMPORTED_MODULE_2__scripts_config_AppConfig_js__["a" /* default */]]).service('dataService', ['$http', __WEBPACK_IMPORTED_MODULE_5__scripts_services_dataService_js__["a" /* default */]]).controller('ACtrl', ['$scope', '$routeParams', "dataService", __WEBPACK_IMPORTED_MODULE_3__scripts_controllers_ACtrl_js__["a" /* default */]]).controller('QCtrl', ['$scope', "dataService", __WEBPACK_IMPORTED_MODULE_4__scripts_controllers_QCtrl_js__["a" /* default */]]);

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const AppConfig = function ($routeProvider) {
	$routeProvider.when('/', { controller: 'QCtrl', templateUrl: 'templates/questions.html' }).when('/:id', { controller: 'ACtrl', templateUrl: 'templates/answers.html' }).otherwise({ redirectTo: '/' });
};

/* harmony default export */ __webpack_exports__["a"] = (AppConfig);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ACtrl = function ($scope, $routeParams, dataService) {

	$scope.addAnswer = _asyncToGenerator(function* () {
		if ($scope.inupt === "" || $scope.input === undefined) return;
		try {
			const answer = {
				"text": $scope.input,
				"createdAt": Date.now(),
				"updatedAt": Date.now(),
				"votes": []
			};
			yield dataService.addAnswer($routeParams.id, answer);
			getQuestion();
			$scope.input = '';
		} catch (err) {
			console.error(err);
		}
	});

	$scope.deleteAnswer = (() => {
		var _ref2 = _asyncToGenerator(function* (answer) {
			try {
				yield dataService.deleteAnswer($routeParams.id, answer);
				getQuestion();
			} catch (err) {
				console.error(err);
			}
		});

		return function (_x) {
			return _ref2.apply(this, arguments);
		};
	})();

	$scope.upvote = (() => {
		var _ref3 = _asyncToGenerator(function* (answer) {
			if (answer.votes.indexOf($scope.currentUser) !== -1) return;
			try {
				answer.votes.push($scope.currentUser);
				yield dataService.updateAnswer($routeParams.id, answer);
				getQuestion();
			} catch (err) {
				console.error(err);
			}
		});

		return function (_x2) {
			return _ref3.apply(this, arguments);
		};
	})();

	const getCurrentUser = (() => {
		var _ref4 = _asyncToGenerator(function* () {
			try {
				const response = yield dataService.getCurrentUser();
				$scope.currentUser = response.data.username;
			} catch (err) {
				console.error(err);
			}
		});

		return function getCurrentUser() {
			return _ref4.apply(this, arguments);
		};
	})();

	const getQuestion = (() => {
		var _ref5 = _asyncToGenerator(function* () {
			try {
				const response = yield dataService.getQuestion($routeParams.id);
				$scope.question = response.data;
				$scope.answers = $scope.question.answers;
				$scope.answers.forEach(function (answer) {
					answer.notMine = answer.createdBy !== $scope.currentUser;
				});
				$scope.$apply();
			} catch (err) {
				console.error(err);
			}
		});

		return function getQuestion() {
			return _ref5.apply(this, arguments);
		};
	})();

	const updateAnswer = (() => {
		var _ref6 = _asyncToGenerator(function* (answer) {
			try {
				answer.editing = false;
				answer.updatedAt = Date.now();
				yield dataService.updateAnswer($routeParams.id, answer);
				getQuestion();
			} catch (err) {
				console.error(err);
			}
		});

		return function updateAnswer(_x3) {
			return _ref6.apply(this, arguments);
		};
	})();

	getCurrentUser();
	getQuestion();
};

/* harmony default export */ __webpack_exports__["a"] = (ACtrl);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const QCtrl = function ($scope, dataService) {

	$scope.addQuestion = _asyncToGenerator(function* () {
		if ($scope.input === '' || $scope.input === undefined) return;
		try {
			var question = {
				"text": $scope.input,
				"createdAt": Date.now()
			};
			yield dataService.addQuestion(question);
			getQuestions();
			$scope.input = '';
		} catch (err) {
			console.error(err);
		}
	});

	$scope.deleteQuestion = (() => {
		var _ref2 = _asyncToGenerator(function* (question) {
			try {
				yield dataService.deleteQuestion(question);
				getQuestions();
			} catch (err) {
				console.error(err);
			}
		});

		return function (_x) {
			return _ref2.apply(this, arguments);
		};
	})();

	const getCurrentUser = (() => {
		var _ref3 = _asyncToGenerator(function* () {
			try {
				const response = yield dataService.getCurrentUser();
				$scope.currentUser = response.data.username;
			} catch (err) {
				console.error(err);
			}
		});

		return function getCurrentUser() {
			return _ref3.apply(this, arguments);
		};
	})();

	const getQuestions = (() => {
		var _ref4 = _asyncToGenerator(function* () {
			try {
				const response = yield dataService.getQuestions();
				$scope.questions = response.data;
				$scope.questions.forEach(function (question) {
					question.notMine = question.createdBy !== $scope.currentUser;
				});
				$scope.$apply();
			} catch (err) {
				createErrorMessage("Oops! Something went wrong. Please Try Again.");
			}
		});

		return function getQuestions() {
			return _ref4.apply(this, arguments);
		};
	})();

	$scope.error = {
		current: false,
		message: ""
	};

	const createErrorMessage = message => {
		$scope.error.current = true;
		$scope.error.message = message;
	};

	const clearErrorMessage = () => {
		$scope.error.current = false;
		$scope.error.message = "";
	};

	getCurrentUser();
	getQuestions();
};

/* harmony default export */ __webpack_exports__["a"] = (QCtrl);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const dataService = function ($http) {

	this.getCurrentUser = () => {
		return $http.get('/api/username');
	};

	this.getQuestions = () => {
		return $http.get('/api/questions');
	};

	this.addQuestion = question => {
		return $http.post('/api/questions', question);
	};

	this.deleteQuestion = question => {
		return $http.delete('/api/questions/' + question._id);
	};

	this.getQuestion = id => {
		return $http.get('/api/questions/' + id);
	};

	this.addAnswer = (id, answer) => {
		return $http.post('/api/questions/' + id + '/answers', answer);
	};

	this.deleteAnswer = (id, answer) => {
		return $http.delete('/api/questions/' + id + '/answers/' + answer._id);
	};

	this.updateAnswer = (id, answer) => {
		return $http.put('/api/questions/' + id + '/answers/' + answer._id, answer);
	};
};

/* harmony default export */ __webpack_exports__["a"] = (dataService);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[2]);