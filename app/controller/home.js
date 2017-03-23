'use strict';

angular
	.module('angularFirebaseWebApp.HomeCtrl', [
		'ngRoute', 'firebase'
	])
	.controller('HomeCtrl',

		function($scope, $timeout, $firebaseArray, loggedUserServ) {

			// show logged user
			$scope.username = loggedUserServ.getUser();
			$scope.articles = {};
			
			// List all articles
			let articlesRef = firebase.database().ref('Articles');
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
			

		});