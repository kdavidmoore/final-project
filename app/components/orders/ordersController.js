app.controller('ordersController', function($scope, HttpAbstractionService) {
	
	HttpAbstractionService.getUsername().then(function(data) {
		var username = data.username;
		HttpAbstractionService.getOrders(username).then(function(data) {
			$scope.orders = data.results;
		});
	});
});