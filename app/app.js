'use strict';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCWLr1J-XCNxwQmcC7rFH6pfJUZMLTxa4s",
	authDomain: "angular-firebase-45775.firebaseapp.com",
	databaseURL: "https://angular-firebase-45775.firebaseio.com",
	storageBucket: "angular-firebase-45775.appspot.com",
	messagingSenderId: "574471434764"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
var app = angular.module('angularFirebaseWebApp', [
	'ngRoute', 'firebase' 
]);

// We can catch the error thrown when the $requireSignIn promise is rejected
// and redirect the user back to the home page
app.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		if (error === "AUTH_REQUIRED") {
			$location.path("/login");
		}
	});
}]);

// Routes
app.config(['$routeProvider', '$httpProvider', '$locationProvider',
	function($routeProvider, $httpProvider, $locationProvider) {

		$routeProvider

			// login
			.when('/login', {
				templateUrl: 'view/login.html',
				controller: 'LoginCtrl'
			})
			// register
			.when('/register', {
				templateUrl: 'view/register.html',
				controller: 'RegisterCtrl'
			})
			// articles
			.when('/articles', {
				templateUrl: 'view/article.html',
				controller: 'ArticleCtrl',
				resolve: {
					'currentAuth': ['Auth', function(Auth) {
						return Auth.$waitForSignIn();
					}]
				}
			})
			// add new article
			.when('/newarticle', {
				templateUrl: 'view/addArticle.html',
				controller: 'AddArticleCtrl'
			})
			// default
			.otherwise({
				redirectTo: '/login'
			}),
			// Enable cross domain calls
			$httpProvider.defaults.useXDomain = true,
			//Remove the header used to identify ajax call  that would prevent CORS from working
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

		// Previne hash bang hell.
		$locationProvider.hashPrefix('');
	}
]);

// Auth
app.factory('Auth', ['$firebaseAuth',
	function($firebaseAuth) {
		return $firebaseAuth();
	}
]);