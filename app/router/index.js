angular.module('router', ['ui.router']).config(routerConfig);

routerConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

function routerConfig($stateProvider, $locationProvider, $urlRouterProvider) {

	$locationProvider.html5Mode({enabled: true, requireBase: false});

	$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/views/main.html',
				controller: 'mainCtrl'
			});

	$urlRouterProvider.otherwise('/');
}
