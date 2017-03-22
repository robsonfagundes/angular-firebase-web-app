(function() {
    'use strict';

    angular
        .module('angularFirebaseWebApp.HomeCtrl', [
            'ngRoute', 'firebase'
        ])
        .controller('HomeCtrl', 

            function($scope, loggedUserServ) {

                $scope.username = loggedUserServ.getUser();
                
            });
})();