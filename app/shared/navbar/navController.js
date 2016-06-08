app.controller('navController', ['$scope', '$location', 'UserAuthService', function($scope, $location, UserAuthService) {
	// watch for path changes
	$scope.$watch(function(){
		return $location.path();
	},
	function(a){
		// when the path changes, check to see if the user is logged in
		// show or hide navbar links accordingly
		UserAuthService.checkToken().then(function(data) {
			if (data.success == "validated") {
				$scope.loggedIn = true;
			} else {
				$scope.loggedIn = false;
			}
		});
	});
}]);