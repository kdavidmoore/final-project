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
	.state('register.userError', {
		url: "/error",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($scope) {
			$scope.errorMessage = "That username is taken.";
		}
	})
	.state('register.passwordError', {
		url: "/error",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($scope) {
			$scope.errorMessage = "The passwords entered do not match.";
		}
	})
	.state('login', {
		url: "/login",
		templateUrl: "app/components/login/loginView.html"
	})
	.state('login.error', {
		url: "/error",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($scope) {
			$scope.errorMessage = "The username or password entered does not match our records.";
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