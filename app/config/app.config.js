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
		templateUrl: function ($stateParams) {
			// build the templateUrl (the html that is loaded into the view) based on
			// the path variable (passed into the state from the link that was clicked on)
			return 'app/components/services/' + $stateParams.path + 'FormView.html';
		}
	})
	.state('services.error', {
		url: "/error/:problem",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($stateParams, $scope) {
			if ($stateParams.problem == "login") {
				$scope.errorMessage = "You must be logged in to post a sample submission form.";
			} else if ($stateParams.problem == "postingForm") {
				$scope.errorMessage = "Something went wrong.";
			}
		}
	})
	.state('payment', {
		url: "/payment",
		templateUrl: "app/components/payment/paymentView.html"
	})
	.state('orders', {
		url: "/orders",
		templateUrl: "app/components/orders/ordersView.html"
	})
	.state('results', {
		url: "/results/:type/:id",
		templateUrl: "app/components/results/resultsView.html"
	})
	.state('map', {
		url: "/map/*path",
		templateUrl: "app/components/map/mapView.html"
	})
	.state('map.error', {
		url: "/error",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($stateParams, $scope) {
			if ($stateParams.problem == "geocoding") {
				$scope.errorMessage = "The geocoding service was unable to look up the requested address.";
			}
		}
	})
	.state('logout', {
		url: "/logout",
		templateUrl: "app/components/logout/logoutView.html"
	});
});