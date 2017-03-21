'use strict';

angular.module('angular-firebase-web-app', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	// Routes will be here

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);