(function() {
	'use strict';

	angular
		.module('angularFirebaseWebApp.RegisterCtrl', [
			'ngRoute', 'firebase'
		])
		.controller('RegisterCtrl',

			function($scope, $firebaseAuth) {

				// register new user
				$scope.SignUp = function(event) {
					event.preventDefault(); // To prevent form refresh

					let email = $scope.user.email;
					let password = $scope.user.password;

					firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
						// Handle Errors here.
						let errorCode = error.code;
						let errorMessage = error.message;

						console.log(errorCode)
						console.log(errorMessage)
					});

				}

			});

})();