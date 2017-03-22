(function() {
	'use strict';

	angular
		.module('angularFirebaseWebApp.RegisterCtrl', [
			'ngRoute', 'firebase'
		])
		.controller('RegisterCtrl',

			function($scope, $location, $firebaseAuth) {



				// register new user
				$scope.signUp = function() {

					if (!$scope.regForm.$invalid) {
						console.log('Valid form submission');
						
						let email = $scope.user.email;
						let password = $scope.user.password;

						firebase.auth().createUserWithEmailAndPassword(email, password)
							.then(function() {
								// Sign-out successful.
								console.log('SignUp successful.');
								$location.path('/home');
							})
							.catch(function(error) {
								// Handle Errors here.
								let errorCode = error.code;
								let errorMessage = error.message;

								$scope.regError = true;
								$scope.regErrorMessage = error.message;

								console.log(errorCode)
								console.log(errorMessage)
							});
					}

				}


			});

})();