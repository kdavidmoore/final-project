app.controller('regController', function($state, $scope, $http, $cookies, UserAuthService) {
	// if the user is already logged in, send them on to the services page
	UserAuthService.checkToken().then(function(data) {
		if (data) {
			$state.go('services');
		}
	});

	$scope.registerForm = function() {

		if ($scope.password == $scope.password2) {
			$http({
				method: 'POST',
				url: API_URL + '/register',
				data: {
					username: $scope.username,
					password: $scope.password,
					email: $scope.email
				}
			}).then(function successCallback(response) {
				if (response.data.success == 'added') {
					var expDate = new Date();
  					expDate.setDate(expDate.getTime() + (30 * 60000));
					// get a token back from the API and store it inside cookies with an expiration date of 30 minutes from now
					$cookies.put('token', response.data.token, { 'path': '/', 'expires': expDate });
					// redirect to services page
					$state.go('services');
				} else if (response.data.failure == 'notUnique') {
					// redirect to the register.error state, passing a parameter containing info on the error
					$state.go('.error', { problem: 'username' });
				}
			}, function errorCallback(response) {
				console.log(response.status);
			});
		} else {
			// redirect to the register.error state, passing a parameter containing info on the error
			$state.go('.error', { problem: 'password' });
		}
	};
});