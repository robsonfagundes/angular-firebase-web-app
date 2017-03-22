(function() {
	'use strict';

	// Declare app level module which depends on views, and components
	angular
		.module('angularFirebaseWebApp', [
			'ngRoute',
			'angularFirebaseWebApp.LoginCtrl',
			'angularFirebaseWebApp.RegisterCtrl'
		])
		.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

			// routes 
			$routeProvider

				.when('/login', {
					templateUrl: 'view/login.html',
					controller: 'LoginCtrl'
				})

				// register
				.when('/register', {
					templateUrl: 'view/register.html',
					controller: 'RegisterCtrl'
				})
				// default
				.otherwise({
					redirectTo: '/login'
				}),

				// Enable cross domain calls
				$httpProvider.defaults.useXDomain = true,

				//Remove the header used to identify ajax call  that would prevent CORS from working
				delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}]);
})();