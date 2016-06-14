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

	function getUserId() {
		return $http({
			method: 'GET',
			url: API_URL + '/getUserId/' + $cookies.get('token')
		}).then(function successCallback(result) {
			return result.data.id;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function getOrderId(user) {
		return $http({
			method: 'GET',
			url: API_URL + '/getOrderId/' + user
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
		getUserId: getUserId,
		getOrderId: getOrderId,
		getOrders: getOrders,
		getSampleLocation: getSampleLocation
	};
});