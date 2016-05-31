var finalProject = angular.module('finalProject', ['ui.router', 'ngCookies']);

finalProject.config(function($stateProvider, $urlRouterProvider) {
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
	.state('login', {
		url: "/login",
		templateUrl: "app/components/login/loginView.html"
	})
	.state('map', {
		url: "/map",
		templateUrl: "app/components/map/mapView.html"
	});
});