var app = angular.module('app', ['ui.router', 'ngCookies']);

const API_URL = 'http://localhost:3090';

app.factory('UserAuthService', function($cookies, $http) {
	return {
		checkToken: function() {
			return $http({
				method: 'POST',
				url: API_URL + '/checkToken',
				data: { token: $cookies.get('token') }
			}).then(function(result) {
				return result.data;
			});
		}
	}
});


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
	.state('services', {
		url: "/services",
		templateUrl: "app/components/services/servicesView.html"
	})
	.state('services.service', {
		url: "/*path",
		templateUrl: function ($stateParams){
			// build the templateUrl (the html that is loaded into the view) based on
			// the path variable (passed into the state from the link that was clicked on)
			return 'app/components/services/' + $stateParams.path + 'FormView.html';
		}
	})
	.state('payment', {
		url: "/payment",
		templateUrl: "app/components/payment/paymentView.html"
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