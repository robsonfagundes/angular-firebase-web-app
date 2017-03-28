'use strict';

angular
    .module('angularFirebaseWebApp.LoginCtrl', [
        'ngRoute', 'firebase'
    ])
    .controller('LoginCtrl',

        function($scope, $timeout, $location, $firebaseAuth, loggedUserServ) {
            $scope.user = {};

            // login
            $scope.SignIn = function() {

                let email = $scope.user.email;
                let password = $scope.user.password;

                if (email && password) {
                    // signIn wWith email and password
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(function(users) {
                            // Sign-out successful.
                            $timeout(function() {
                                console.log('SignIn successful.');
                                loggedUserServ.setUser(users.email);
                                $location.path('/home');
                            });
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            let errorCode = error.code;
                            let errorMessage = error.message;

                            console.log(errorCode);
                            $scope.regError = true;
                            $scope.regErrorMessage = error.message;
                        });
                }
            }

            // logout
            $scope.Logout = function() {
                // logout to firebase
                firebase.auth().signOut()
                    .then(function() {
                        // Sign-out successful.
                        $location.path('/login');
                    })
                    .catch(function(error) {
                        // An error happened.
                    });
            }

        })
    .service('loggedUserServ', function() {

        let user = '';

        return {
            getUser: function() {
                return user;
            },
            setUser: function(value) {
                user = value;
            }
        };
    });