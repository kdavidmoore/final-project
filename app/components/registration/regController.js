app.controller('regController', ['$state', '$scope', 'UserAuthService', 'PostRequestService',
	function($state, $scope, UserAuthService, PostRequestService) {
	// if the user is already logged in, send them on to the services page
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			$state.go('services');
		}
	});

	$scope.registerForm = function() {
		if ($scope.password == $scope.password2) {
			PostRequestService.postRegData($scope.username, $scope.password, $scope.email).then(function(data) {
				if (data == "success") {
					$state.go('services');
				} else if (data == "usernameExists") {
					$state.go('register.error', { problem: 'username' });
				} else {
					$state.go('register.error', { problem: 'unknown' });
				}
			});
		} else {
			$state.go('register.error', { problem: 'password' });
		}
	};
}]);