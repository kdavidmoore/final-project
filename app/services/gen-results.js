app.factory('GenerateResultsService', function($http) {
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

	return {
		getOrderData: getOrderData
	};
});