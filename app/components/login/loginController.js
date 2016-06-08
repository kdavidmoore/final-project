app.controller('loginController', ['$state', '$scope', 'UserAuthService', 'PostRequestService',
	function($state, $scope, UserAuthService, PostRequestService) {
	// if the user is already logged in, send them on to the services page
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			$state.go('services');
		}
	});

	$scope.loginForm = function() {
		PostRequestService.postLoginData($scope.username, $scope.password).then(function(data) {
			if (data == "success") {
				$state.go('services');
			} else if (data == "passwordError") {
				$state.go('login.error', { problem: 'password' });
			} else if (data == "userError") {
				$state.go('login.error', { problem: 'username' });
			} else {
				$state.go('login.error', { problem: 'unknown' });
			}
		});
	}
}]);