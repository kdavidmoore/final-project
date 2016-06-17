app.controller("cancelController", ['$state', '$scope', '$stateParams', 'UserAuthService', 'CancelService',
	function($state, $scope, $stateParams, UserAuthService, CancelService) {
	UserAuthService.checkToken().then(function(data) {
		if (data.success == 'validated') {
			CancelService.deleteOrder($stateParams.id).then(function(result) {
				/* the deleteOrder function of the CancelService factory deletes the requested order
				from the database and returns "done" when successful */
				if (result == 'done') {
					$state.go('cancel.success');
				} else {
					$state.go('cancel.error');
				}
			});
		}
	});
}]);