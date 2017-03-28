
			// List all articles
			let articlesRef = firebase.database().ref('Articles/'); // database ref
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


			// Edit article post 
			$scope.editPost = function(id) {
				console.log(id);
				idArticleToUpdate = id;
				firebase.database().ref('Articles/').child(id).once('value')
					.then(
						function(articleToUpdate) {
							$timeout(function() {
								let post = articleToUpdate.val();
								$scope.postToUpdate = post;
							});
						});

				$('#editModal').modal(); // triggers the modal pop up
			}


			// Update article post 
			$scope.updatePost = function() {

				firebase.database().ref('Articles/').child(idArticleToUpdate)
					.update({
						$id: idArticleToUpdate,
						title: $scope.postToUpdate.title,
						content: $scope.postToUpdate.post,
						emailId: loggedUserServ.getUser()
					})
					.then(function(ref) {
						console.log(ref);
						$('#editModal').modal('hide');
					}, function(error) {
						console.log("Error:", error);
					});
			}



