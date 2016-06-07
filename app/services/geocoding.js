app.factory('GeocodingService', function($http) {
	return {
		lookupAddress: function(addr) {
			return $http({
				method: 'GET',
				url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + GOOGLE_MAPS_API_KEY
			}).then(function successCallback(result) {
				return result.data.results[0].geometry.location;
			}, function errorCallback(result) {
				console.log(result.status);
			});
		}
	};
});