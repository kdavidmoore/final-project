app.factory('UserAuthService', function($http, $cookies) {
	return {
		checkToken: function() {
			return $http({
				method: 'GET',
				url: API_URL + '/checkToken/' + $cookies.get('token')
			}).then(function successCallback(result) {
				return result.data;
			}, function errorCallback(result) {
				return result.status;
			});
		}
	};
});