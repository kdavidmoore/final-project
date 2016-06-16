app.config(function($cookiesProvider, $stateProvider, $urlRouterProvider) {
	// set defaults for the $cookiesProvider to be used by $cookies
	$cookiesProvider.defaults.domain = 'kdavidmoore.com';
	$cookiesProvider.defaults.path = '/';

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
			switch ($stateParams.problem) {
				case "username":
					$scope.errorMessage = "That username is taken.";
					break;
				case "password":
					$scope.errorMessage = "The passwords entered do not match.";
					break;
				case "unknown":
					$scope.errorMessage = "The server is probably down.";
					break;
				default:
					$scope.errorMessage = "Something went wrong.";
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
			switch ($stateParams.problem) {
				case "username":
					$scope.errorMessage = "The username entered does not exist in our system.";
					break;
				case "password":
					$scope.errorMessage = "The password entered does not match our records.";
					break;
				case "unknown":
					$scope.errorMessage = "The server is probably down.";
					break;
				default:
					$scope.errorMessage = "Something went wrong.";
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
			switch ($stateParams.problem) {
				case "login":
					$scope.errorMessage = "You must be logged in to post a sample submission form.";
					break;
				case "postingForm":
					$scope.errorMessage = "Something went wrong.";
					break;
				default:
					$scope.errorMessage = "Something went wrong.";
			}
		}
	})
	.state('payment', {
		url: "/payment/:type",
		templateUrl: "app/components/payment/paymentView.html"
	})
	.state('cancel', {
		url: "/cancel/:id",
		templateUrl: "app/components/cancel/cancelView.html"
	})
	.state('cancel.success', {
		url: "/success",
		templateUrl: "app/components/cancel/successView.html"
	})
	.state('cancel.error', {
		url: "/error",
		templateUrl: "app/shared/error/errorView.html",
		controller: function($scope) {
			$scope.errorMessage = "For some reason, your order could not be deleted form the database.";
		}
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
		url: "/map/:type/:id",
		templateUrl: "app/components/map/mapView.html"
	})
	.state('map.error', {
		url: "/error/:problem",
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