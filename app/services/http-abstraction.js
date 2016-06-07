app.factory('HttpAbstractionService', function($http, $cookies) {
	
	function getLabServices() {
		return $http({
			method: 'GET',
			url: API_URL + '/getLabServices'
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
			url: API_URL + '/submitSampleForm',
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

	function getOrders(user) {
		return $http({
			method: 'POST',
			url: API_URL + '/getOrders',
			data: {
				username: user
			}
		}).then(function successCallback(result) {
			console.log(result.data);
			return result.data;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	return {
		getLabServices: getLabServices,
		getUsername: getUsername,
		postFormData: postFormData,
		getOrderId: getOrderId,
		getOrders: getOrders
	}
});