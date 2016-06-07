app.factory('UserAuthService', function($http, $cookies) {
	return {
		checkToken: function() {
			return $http({
				method: 'POST',
				url: API_URL + '/checkToken',
				data: {
					token: $cookies.get('token')
				}
			}).then(function successCallback(result) {
				return result.data;
			}, function errorCallback(result) {
				return result.status;
			});
		}
	};
});