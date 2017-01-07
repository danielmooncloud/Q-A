'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');

var app = angular.module('qaApp', [ngRoute])
.config(function($routeProvider) {
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

require('./scripts/controllers/QCtrl.js');
require('./scripts/controllers/ACtrl.js');
require('./scripts/services/dataService.js');