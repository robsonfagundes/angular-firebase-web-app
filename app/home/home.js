'use strict';

angular.module('angularFirebaseWebApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$firebaseAuth', function($scope, $firebaseAuth) {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCWLr1J-XCNxwQmcC7rFH6pfJUZMLTxa4s",
		authDomain: "angular-firebase-45775.firebaseapp.com",
		databaseURL: "https://angular-firebase-45775.firebaseio.com",
		storageBucket: "angular-firebase-45775.appspot.com",
		messagingSenderId: "574471434764"
	};
	firebase.initializeApp(config);

	var firebaseObj = firebase.database().ref();
	var loginObj = $firebaseAuth(firebaseObj);

	$scope.user = {};
	$scope.SignIn = function(e) {
		e.preventDefault();
		var username = $scope.user.email;
		var password = $scope.user.password;
		loginObj.$login('password', {
				email: username,
				password: password
			})
			.then(function(user) {
				//Success callback
				console.log('Authentication successful');
			}, function(error) {
				//Failure callback
				console.log('Authentication failure');
			});
	}
}]);