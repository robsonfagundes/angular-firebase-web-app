'use strict';

angular
	.module('angularFirebaseWebApp.HomeCtrl', [
		'ngRoute', 'firebase'
	])
	.controller('HomeCtrl',

		function($scope, $timeout, $firebaseArray, $firebaseObject, loggedUserServ) {

			// show logged user
			$scope.username = loggedUserServ.getUser();
			$scope.articles = {};

			// database ref
			let articlesRef = firebase.database().ref('Articles');

			// List all articles
			articlesRef.on("child_added",
				function(article) {
					//Running the code in $timeout ensures that Angular updates any affected views afterwards.
					$timeout(function() {
						//$firebaseArray will automatically synchronize changes to your template
						$scope.articles = $firebaseArray(articlesRef);
					});
				},
				function(errorObject) {
					console.log("The read article failed: " + errorObject.code);
				});


			// edit article post 
			$scope.editPost = function(id) {
				console.log(id);

				let articlesRef = firebase.database().ref('Articles');

				articlesRef.child(id).once('value').then(
					function(articleToUpdate) {
						$timeout(function() {
							let post = articleToUpdate.val();
							$scope.postToUpdate = post;
							console.log($scope.postToUpdate)
						});
					});



				$('#editModal').modal(); // triggers the modal pop up
			}

		});