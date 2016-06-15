app.controller('mapController', ['$state', '$window', '$scope', '$stateParams', 'UserAuthService', 'GetRequestService', 'GeocodingService',
	function($state, $window, $scope, $stateParams, UserAuthService, GetRequestService, GeocodingService) {
	$scope.orderId = $stateParams.id;
	
	var myLat = 32.062;
	var myLong = -84.924;
	var address = '';
	var sampleDescrip = '';
	// get the sample id from $stateParams.id and look up the address
	UserAuthService.checkToken().then(function(result) {
		if (result.success == 'validated') {
			GetRequestService.getSampleLocation($stateParams.id).then(function(data) {
				// get the address from the parsed data
				address = JSON.parse(data.orderData).address;
				// get the location description or sample type
				sampleDescrip = JSON.parse(data.orderData).location;
				
				GeocodingService.lookupAddress(address).then(function(data) {
					if (data == 'error') {
						$state.go('map.error', { problem: 'geocoding' });
					} else {
						myLat = data.lat;
						myLng = data.lng;
						var myMap = $window.L.map('sample-loc-map').setView([myLat, myLng], 15);
						
						$window.L.tileLayer('https://api.tiles.mapbox.com/v4/' + MAPBOX_PROJECT_ID + '/{z}/{x}/{y}.png?access_token=' + MAPBOX_ACCESS_TOKEN, {
							attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
							maxZoom: 18,
							id: MAPBOX_PROJECT_ID,
							accessToken: MAPBOX_ACCESS_TOKEN
						}).addTo(myMap);

						$window.L.marker([myLat, myLng]).addTo(myMap)
						.bindPopup("<b style='text-transform: capitalize'>" +
							$stateParams.type + " Sample</b><br />Description: " + sampleDescrip).openPopup();
					}
				});
			});
		} else {
			$state.go('login');
		}
	});
}]);