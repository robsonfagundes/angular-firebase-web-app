'use strict';

angular
    .module('angularFirebaseWebApp.LoginCtrl', [
        'ngRoute', 'firebase'
    ])
    .controller('LoginCtrl',

        function($scope, $timeout, $location, $firebaseAuth, loggedUserServ) {
            $scope.user = {};

            // show the loading indicator
            var login = {};
            $scope.login = login;

            // login
            $scope.SignIn = function() {

                login.loading = true;

                let email = $scope.user.email;
                let password = $scope.user.password;

                if (email && password) {
                    // signIn wWith email and password
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(function(users) {
                            // Sign-out successful.
                            $timeout(function() {
                                loggedUserServ.setUser(users.email);
                                $location.path('/articles');
                            });
                            login.loading = false;
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            $timeout(function() {
                                let errorMessage = error.message;
                                $scope.regError = true;
                                $scope.regErrorMessage = error.message;
                            });
                            login.loading = false;
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
    })
    .directive('laddaLoading', [
        function() {
            return {
                link: function(scope, element, attrs) {
                    var Ladda = window.Ladda;
                    var ladda = Ladda.create(element[0]);
                    // Watching login.loading for change
                    scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                        // Based on the value start and stop the indicator
                        if (newVal) {
                            ladda.start();
                        } else {
                            ladda.stop();
                        }
                    });
                }
            };
        }
    ]);