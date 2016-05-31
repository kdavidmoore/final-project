finalProject.controller('regController', function($http, $cookies) {
	// if the user is already logged in, send them back to the home page (until more pages are up)
	if ($cookies.get('token')) {
		$state.go('home');
	}

	$scope.registerForm = function() {

		if ($scope.password == $scope.password2) {
			$http({
				method: 'POST',
				url: API_URL + '/register',
				data: {
					username: $scope.username,
					password: $scope.password,
					password2: $scope.password2,
					email: $scope.email
				}
			}).then(function successCallback(response) {
				if (response.data.success == 'added') {
					var expDate = new Date();
  					expDate.setDate(expDate.getTime() + (30 * 60000));
					// get a random token back from the API and store it inside cookies with an expiration date of 30 minutes from now
					$cookies.put('token', response.data.token, {'expires': expDate});
					//redirect to home page until more pages are up
					$state.go('home');
				} else if (response.data.failure == 'notUnique') {
					$state.go('.userError');
				}
			}, function errorCallback(response) {
				console.log(response.status);
			});
		} else {
			$state.go('.passwordError');
		}
	};
});