app.controller('ordersController', ['$scope', 'HttpAbstractionService', function($scope, HttpAbstractionService) {
	// add token authentication here
	// TODO...
	HttpAbstractionService.getUsername().then(function(data) {
		var username = data.username;
		HttpAbstractionService.getOrders(username).then(function(data) {
			$scope.orders = data.results;
		});
	});
}]);