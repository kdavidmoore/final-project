app.controller('ordersController', ['$state', '$scope', 'UserAuthService', 'GetRequestService',
	function($state, $scope, UserAuthService, GetRequestService) {
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			GetRequestService.getUsername().then(function(data) {
				var username = data.username;
				GetRequestService.getOrders(username).then(function(data) {
					$scope.orders = data.results;
				});
			});
		} else {
			$state.go('login');
		}
	});
}]);