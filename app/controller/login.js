'use strict';

angular

    .module('angularFirebaseWebApp.LoginCtrl', [
        'ngRoute', 'firebase'
    ])
    .controller('LoginCtrl', ['$scope', '$firebaseAuth',

        function($scope, $firebaseAuth) {

            $scope.user = {};
            $scope.SignIn = function(e) {
                e.preventDefault();
                var username = $scope.user.email;
                var password = $scope.user.password;
                console.log(username)
            }
        }

    ]);