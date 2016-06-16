app.factory('CancelService', function($http) {
	return {
		deleteOrder: function(orderId) {
			return $http({
				method: 'POST',
				url: API_URL + '/cancel',
				data: {
					orderId: orderId
				}
			}).then(function successCallback(result) {
				return result;
			}, function errorCallback(result) {
				return result.status;
			});
		}
	};
});