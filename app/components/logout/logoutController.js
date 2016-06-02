app.controller('logoutController', function($cookies) {
	$cookies.remove('token', { 'path': '/' });
});