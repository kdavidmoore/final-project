app.controller('mapController', ['$window', '$scope', '$http', '$stateParams', 'HttpAbstractionService', 'GeocodingService',
	function($window, $scope, $http, $stateParams, HttpAbstractionService, GeocodingService) {
	
	var myLat = 32.062;
	var myLong = -84.924;
	var address = '';
	// get the sample id from $stateParams.path and look up the address
	HttpAbstractionService.getSampleLocation($stateParams.path).then(function(data) {
		address = JSON.parse(data.orderData).address;

		GeocodingService.lookupAddress(address).then(function(data) {
			myLat = data.lat;
			myLong = data.lng;
			var myMap = $window.L.map('sample-loc-map').setView([myLat, myLong], 15);
			
			$window.L.tileLayer('https://api.tiles.mapbox.com/v4/' + projectId + '/{z}/{x}/{y}.png?access_token=' + pubAccessToken, {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,
				id: projectId,
				accessToken: pubAccessToken
			}).addTo(myMap);

			$window.L.marker([myLat, myLong]).addTo(myMap);

		});
	});
}]);