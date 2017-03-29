'use strict';

angular
	.module('angularFirebaseWebApp.RegisterCtrl', [
		'ngRoute', 'firebase'
	])
	.controller('RegisterCtrl',

		function($scope, $timeout, $location, $firebaseAuth) {

			// register new user
			$scope.signUp = function() {

				if (!$scope.regForm.$invalid) {
					console.log('Valid form submission');

					let email = $scope.user.email;
					let password = $scope.user.password;

					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then(function() {
							$timeout(function() {
								// Sign-out successful.
								console.log('SignUp successful.');
								$location.path('/article');
							});
						})
						.catch(function(error) {
							// Handle Errors here.
							$timeout(function() {
								$scope.regError = true;
								$scope.regErrorMessage = error.message;
							});
						});
				}

			}


		});