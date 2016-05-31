finalProject.controller('navController', function($scope, $location, $cookies){
	// watch for path changes
	$scope.$watch(function(){
		return $location.path();
	},
	function(a){
		// when the path changes, check to see if the user is logged in
		// show or hide navbar links appropriately
		if($cookies.get('token')){
			$scope.loggedIn = true;
		} else {
			$scope.loggedIn = false;
		}
	});
});