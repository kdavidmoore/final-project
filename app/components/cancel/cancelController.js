app.controller("cancelController", ['$state', '$scope', '$stateParams', 'UserAuthService', 'CancelService',
	function($state, $scope, $stateParams, UserAuthService, CancelService) {
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			CancelService.deleteOrder($stateParams.id).then(function(result) {
				if (result.data == "done") {
					$state.go('cancel.success');
				} else {
					$state.go('cancel.error');
				}
			});
		}
	});
}]);