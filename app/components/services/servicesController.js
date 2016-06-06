app.controller('servicesController', function($state, $scope, $http, GetServices) {
	// make an http request to the server
	// get an array of objects back containing the services
	// set the resulting data equal to $scope.services

	GetServices.getServices().then(function(data) {
		console.log(data);
		$scope.services = data;
	});

	// submit formData to the server
	// abstract this to a custom service at some point
	$scope.submitForm = function() {
		
		$http({
			method: 'POST',
			url: API_URL + '/submitServicesForm',
			data: $scope.formData
		}).then(function successCallback(response) {
			if (response.data.success == "added") {
				$state.go('payment');
			} else {
				console.log(response.data);
				// display an error message in the view...
			}
		}, function errorCallback(response) {
			console.log(response.status);
		});
	}

	// for demonstration purposes, this function fills out the form with some dummy info
	$scope.autoFill = function(type) {
		if (type == 'soil') {
			$scope.formData =
			{
				location: "canola field",
				address: "345 Flint Dr",
				county: "Dougherty",
				canolaSpringType: 1
			}
		} else if (type == 'water') {
			$scope.formData =
			{
				address: "123 Long Branch Rd",
				county: "Baldwin",
				sampleType: "householdWell",
				wellDepth: 25,
				wellCasingDiam: 18,
				endUse: "drinking",
				testReasons: "granite bedrock and old pipes",
				basicTest: 1,
				lead: 1,
				radon: 1
			}
		}
	}
});