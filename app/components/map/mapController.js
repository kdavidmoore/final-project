finalProject.controller('mapController', ['$window', function($window) {

	var testMap = $window.L.map('test-map').setView([32.062, -84.924], 15);

	$window.L.tileLayer('https://api.tiles.mapbox.com/v4/' + projectId + '/{z}/{x}/{y}.png?access_token=' + pubAccessToken, {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: projectId,
		accessToken: pubAccessToken
	}).addTo(testMap);
}]);