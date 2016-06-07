app.controller('mapController', ['$window', '$scope', '$http', '$stateParams', 'HttpAbstractionService', function($window, $scope, $http, $stateParams, HttpAbstractionService) {
	// get the sample id from $stateParams.path and look up the address
	HttpAbstractionService.getSampleLocation($stateParams.path).then(function(data) {
		var orderData = JSON.parse(data.orderData);
		console.log(orderData.address);
		// TODO: use geocoding to look up the geographic coordinates of the address
		// gonna need to add a geocoding service...
	});

	var myMap = $window.L.map('sample-loc-map').setView([32.062, -84.924], 15);

	$window.L.tileLayer('https://api.tiles.mapbox.com/v4/' + projectId + '/{z}/{x}/{y}.png?access_token=' + pubAccessToken, {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: projectId,
		accessToken: pubAccessToken
	}).addTo(myMap);
}]);