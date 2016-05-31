finalProject.controller('logoutController', function($http, $cookies) {
	// destroy the cookies!

	// wait 10 seconds, then redirect to the home page so the navbar updates
	// or just reload the current state
	$state.reload()
});