'use strict';

angular.module('angular-firebase-web-app', [
	'ngRoute',
	'angular-firebase-web-app.home'
]).
config(['$routeProvider', function($routeProvider) {
	// Routes will be here
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
}]);