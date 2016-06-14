app.controller('paymentController', ['$state', '$scope', '$stateParams', 'UserAuthService', 'GetRequestService',
	function($state, $scope, $stateParams, UserAuthService, GetRequestService) {	
	UserAuthService.checkToken().then(function(result) {
		if (result.success == 'validated') {
			
			$scope.orderType = $stateParams.type;
			GetRequestService.getUserId().then(function(data) {
				GetRequestService.getOrderId(data.id).then(function(data) {
					$scope.orderId = data;
				});
			});
		} else {
			$state.go('login');
		}
	});
}]);