app.controller('loginController', function($http, $cookies) {
	// if the user is already logged in, send them back to the home page (until more pages are up)
	if ($cookies.get('token')) {
		$state.go('home');
	}

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
				$state.go('.error');
			} else if (response.data.failure == 'noUser') {
				$state.go('.error');
			} else if (response.data.success == 'match') {
				var expDate = new Date();
  				expDate.setDate(expDate.getTime() + (30 * 60000));
				// store the token inside cookies with an expiration date of 30 minutes from now
				$cookies.put('token', response.data.token, {'expires': expDate});
				//redirect to home page until more pages are up
				$state.go('home');
			}
		}, function errorCallback(response) {
			console.log(response.status);
		});
	};
});