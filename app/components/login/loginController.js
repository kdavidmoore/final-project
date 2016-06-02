app.controller('loginController', function($state, $scope, $http, $cookies, UserAuthService) {
	// if the user is already logged in, send them on to the services page
	UserAuthService.checkToken().then(function(data) {
		if (data) {
			$state.go('services');
		}
	});

	$scope.loginForm = function() {
		$http({
			method: 'POST',
			url: API_URL + '/login',
			data: {
				username: $scope.username,
				password: $scope.password
			}
		}).then(function successCallback(response) {
			if (response.data.failure == 'noMatch') {
				// redirect to the register.error state, passing a parameter containing info on the error
				$state.go('.error', { problem: 'password' });
			} else if (response.data.failure == 'noUser') {
				// redirect to the register.error state, passing a parameter containing info on the error
				$state.go('.error', { problem: 'username' });
			} else if (response.data.success == 'match') {
				var expDate = new Date();
  				expDate.setDate(expDate.getTime() + (30 * 60000));
				// store the token inside cookies with an expiration date of 30 minutes from now
				$cookies.put('token', response.data.token, { 'path': '/', 'expires': expDate });
				//redirect to services page
				$state.go('services');
			}
		}, function errorCallback(response) {
			console.log(response.status);
		});
	};
});