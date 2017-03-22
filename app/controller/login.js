(function() {
    'use strict';

    angular
        .module('angularFirebaseWebApp.LoginCtrl', [
            'ngRoute', 'firebase'
        ])
        .controller('LoginCtrl',

            function($scope, $location, $firebaseAuth) {
                $scope.user = {};

                let firebaseObj = firebase.database().ref();

                $scope.SignIn = function() {

                    let email = $scope.user.email;
                    let password = $scope.user.password;

                    // signIn wWith email and password
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(function(users) {
                            // Sign-out successful.
                            console.log('SignIn successful.');
                            console.log(users.email)
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
            });
})();