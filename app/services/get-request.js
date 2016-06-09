app.factory('GetRequestService', function($http, $cookies) {
	
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
			method: 'GET',
			url: API_URL + '/getUsername/' + $cookies.get('token')
		}).then(function successCallback(result) {
			return result.data.username;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function getOrderId() {
		return $http({
			method: 'GET',
			url: API_URL + '/getOrderId/' + $cookies.get('token')
		}).then(function successCallback(result) {
			return result.data.orderId;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function getOrders(user) {
		return $http({
			method: 'GET',
			url: API_URL + '/getOrders/' + user
		}).then(function successCallback(result) {
			return result.data;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function getSampleLocation(id) {
		return $http({
			method: 'GET',
			url: API_URL + '/getOrderData/' + id
		}).then(function successCallback(result) {
			return result.data.orderData;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	return {
		getLabServices: getLabServices,
		getUsername: getUsername,
		getOrderId: getOrderId,
		getOrders: getOrders,
		getSampleLocation: getSampleLocation
	};
});