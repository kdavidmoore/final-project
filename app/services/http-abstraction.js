app.factory('HttpAbstractionService', function($http, $cookies) {
	
	function getServices() {
		return $http({
			method: 'GET',
			url: API_URL + '/getServices'
		}).then(function successCallback(result) {
			return result.data.results;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function getUsername() {
		return $http({
			method: 'POST',
			url: API_URL + '/getUsername',
			data: {
				token: $cookies.get('token')
			}
		}).then(function successCallback(result) {
			return result.data.username;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function postFormData(type, user, data) {
		return $http({
			method: 'POST',
			url: API_URL + '/submitServicesForm',
			data: {
				username: user,
				token: $cookies.get('token'),
				orderType: type,
				orderData: JSON.stringify(data),
				orderStatus: "unpaid"
			}
		}).then(function successCallback(result) {
			return result.data;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function getOrderId() {
		return $http({
			method: 'POST',
			url: API_URL + '/getOrderId',
			data: {
				token: $cookies.get('token')
			}
		}).then(function successCallback(result) {
			return result.data.orderId;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	return {
		getServices: getServices,
		getUsername: getUsername,
		postFormData: postFormData,
		getOrderId: getOrderId
	}
});