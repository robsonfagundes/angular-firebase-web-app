'use strict';

angular.module('angularFirebaseWebApp', [
	'ngRoute',
	'angularFirebaseWebApp.home'
])

.config(['$routeProvider', function($routeProvider) {
	// Routes will be here

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);