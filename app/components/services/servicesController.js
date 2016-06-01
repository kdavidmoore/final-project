app.controller('servicesController', function($state, $scope, $http){
	// make an http request to the server
	// get an array of objects back containing the services
	// set the results equal to $scope.services

	$scope.services = [
	{
		title: "Water Testing",
		description: "let us handle all of your groundwater testing needs",
		param: "water"
	}
	];
});