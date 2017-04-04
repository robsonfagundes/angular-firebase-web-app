'use strict';

var app = angular.module('angularFirebaseWebApp');

// Auth
app.factory('Auth', ['$firebaseAuth',
	function($firebaseAuth) {
		return $firebaseAuth();
	}
]);