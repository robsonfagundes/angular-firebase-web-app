'use strict';

var app = angular.module('angularFirebaseWebApp');

// article controller 
app.controller('ArticleCtrl',

	function($scope, $firebaseArray, $firebaseObject, loggedUserServ) {

		// show logged user
		$scope.username = loggedUserServ.getUser();

		// List all articles with angularfire
		let articlesRef = firebase.database().ref('Articles/').startAt($scope.username).endAt($scope.username); // database ref
		$scope.articles = $firebaseArray(articlesRef);

		// Show article to edit with angularfire
		$scope.showToEditArticle = function(id) {
			let articleRef = firebase.database().ref('Articles/').child(id); // database ref
			$scope.articleToUpdate = $firebaseObject(articleRef);
			$('#editModal').modal(); // triggers the modal pop up
		}

		// Remove article on firebase with angularfire
		$scope.showToRemoveArticle = function(id) {
			let articleRef = firebase.database().ref('Articles/').child(id); // database ref
			$scope.articleToDelete = $firebaseObject(articleRef);
			$('#deleteModal').modal();
		}

		// Update article with angularfire
		$scope.updateArticle = function() {
			$scope.articleToUpdate.$save({
					title: $scope.articleToUpdate.title,
					content: $scope.articleToUpdate.post,
					emailId: loggedUserServ.getUser()
				})
				// the promisse is optional
				.then(function(ref) {
					$('#editModal').modal('hide');
				}, function(error) {
					console.log("Error:", error);
				});
		}

		// Remove article with angularfire
		$scope.removeArticle = function() {
			$scope.articleToDelete.$remove($scope.articleToDelete.$id)
				.then(function(ref) {
					$('#deleteModal').modal('hide');
				}, function(error) {
					console.log("Error:", error);
				});
		}
	}
);