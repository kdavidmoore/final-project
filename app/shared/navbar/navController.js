app.controller('navController', function($scope, $location, $cookies, UserAuthService){
	// watch for path changes
	$scope.$watch(function(){
		return $location.path();
	},
	function(a){
		// when the path changes, check to see if the user is logged in
		// show or hide navbar links appropriately
		UserAuthService.checkToken().then(function(data) {
			console.log(data);
			if (data.success == "validated") {
				$scope.loggedIn = true;
			} else {
				$scope.loggedIn = false;
			}
		});
	});
});