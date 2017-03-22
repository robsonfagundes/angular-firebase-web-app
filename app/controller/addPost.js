(function() {
	'use strict';

	angular
		.module('angularFirebaseWebApp.AddPostCtrl', [
			'ngRoute', 'firebase'
		])
		.controller('AddPostCtrl',

			function($scope, $location, $firebase) {

				// Get a reference to the database service
				let database = firebase.database();

				// Add new Post 
				$scope.AddPost = function() {
					let title = $scope.article.title;
					let post = $scope.article.post;
					writeUserData(title, post);
				}

			});

		
	// write post on firebase
	function writeUserData(title, post) {
		let userId = firebase.auth().currentUser.uid;
		firebase.database().ref('posts/' + userId)
			.set({
				title: title,
				post: post
			});
	}


})();