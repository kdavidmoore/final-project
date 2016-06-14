app.controller('ordersController', ['$state', '$scope', 'UserAuthService', 'GetRequestService',
	function($state, $scope, UserAuthService, GetRequestService) {
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			GetRequestService.getUserId().then(function(data) {
				GetRequestService.getOrders(data.id).then(function(data) {
					$scope.orders = data.results;
				});
			});
		} else {
			$state.go('login');
		}
	});
}]);