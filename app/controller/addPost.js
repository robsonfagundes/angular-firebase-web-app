'use strict';

angular
	.module('angularFirebaseWebApp.AddPostCtrl', [
		'ngRoute', 'firebase'
	])
	.controller('AddPostCtrl',

		function($scope, $location, $firebase, loggedUserServ) {

			// Add new article post 
			$scope.AddPost = function() {

				// write post on firebase
				firebase.database().ref('Articles/')
					.push({
						title: $scope.article.title,
						content: $scope.article.post,
						emailId: loggedUserServ.getUser()
					})
					.then(function(ref) {
						console.log(ref);
						$location.path('/home');
					}, function(error) {
						console.log("Error:", error);
					});
			}

		});


