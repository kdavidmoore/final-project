var app = angular.module('app', ['ui.router', 'ngCookies']);

const API_URL = 'http://localhost:3090';

app.config(function($stateProvider, $urlRouterProvider) {
	// for any unmatched url, redirect to /home
	$urlRouterProvider.otherwise("/home");
	// now set up the states
	$stateProvider
	.state('home', {
		url: "/home",
		templateUrl: "app/components/home/homeView.html"
	})
	.state('register', {
		url: "/register",
		templateUrl: "app/components/registration/regView.html"
	})
	.state('register.error', {
		url: "/error/:problem",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($stateParams, $scope) {
			if ($stateParams.problem == "username") {
				$scope.errorMessage = "That username is taken.";
			} else if ($stateParams.problem == "password") {
				$scope.errorMessage = "The passwords entered do not match.";
			}
		}
	})
	.state('login', {
		url: "/login",
		templateUrl: "app/components/login/loginView.html"
	})
	.state('login.error', {
		url: "/error/:problem",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($stateParams, $scope) {
			if ($stateParams.problem == "username") {
				$scope.errorMessage = "The username entered does not exist in our system.";
			} else if ($stateParams.problem == "password") {
				$scope.errorMessage = "The password entered does not match our records.";
			} 
		}
	})
	.state('map', {
		url: "/map",
		templateUrl: "app/components/map/mapView.html"
	})
	.state('logout', {
		url: "/logout",
		templateUrl: "app/components/logout/logoutView.html"
	});
});