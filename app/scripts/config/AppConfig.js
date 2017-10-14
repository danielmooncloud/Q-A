const AppConfig = $routeProvider => 
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


export default AppConfig;