'use strict';

angular.module('angular-firebase-web-app.home', ['ngRoute', 'firebase', 'firebaseSimpleLogin'])

// Declared route 
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

// Home controller
.controller('HomeCtrl', [
	'$scope',
	'$firebase',
	'$firebaseSimpleLogin',

	function($scope) {

		var firebaseObj = new Firebase("https://angular-firebase-45775.firebaseio.com");	
		var loginObj = $firebaseSimpleLogin(firebaseObj);

		$scope.SignIn = function(event) {
			event.preventDefault(); // To prevent form refresh
			var username = $scope.user.email;
			var password = $scope.user.password;

			loginObj.$login('password', {
					email: username,
					password: password
				})
				.then(function(user) {
					// Success callback
					console.log('Authentication successful');
				}, function(error) {
					// Failure callback
					console.log('Authentication failure');
				});
		}
	}
]);