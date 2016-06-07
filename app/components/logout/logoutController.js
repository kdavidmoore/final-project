app.controller('logoutController', ['$cookies', function($cookies) {
	$cookies.remove('token', { 'path': '/' });
}]);