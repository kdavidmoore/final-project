app.factory('ResultsService', function($http) {
	function getOrderData(id) {
		return $http({
			method: 'GET',
			url: API_URL + '/getOrderData/' + id
		}).then(function successCallback(result) {
			return result.data.orderData;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function genResults(id, type, options) {
		return $http({
			method: 'POST',
			url: API_URL + '/results',
			data: {
				orderId: id,
				orderType: type,
				options: options
			}
		}).then(function successCallback(result) {
			return result.data.results;
		}, function errorCallback(result) {
			return result.status;
		});
	}

	return {
		getOrderData: getOrderData,
		genResults: genResults
	};
});