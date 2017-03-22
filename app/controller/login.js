(function() {
    'use strict';

    angular
        .module('angularFirebaseWebApp.LoginCtrl', [
            'ngRoute', 'firebase'
        ])
        .controller('LoginCtrl',

            function($scope, $firebaseAuth, $location) {

                $scope.user = {};
                $scope.SignIn = function(e) {
                    e.preventDefault();

                    let email = $scope.user.email;
                    let password = $scope.user.password;

                    // signIn wWith email and password
                    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;

                        console.log(errorCode)

                        // if user not found open register
                        if (errorCode) {
                            $location.path('/register')
                        } else {
                            console.log('Valid User!!!')
                        }
                    });
                }
            });
})();