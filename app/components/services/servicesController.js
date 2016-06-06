app.controller('servicesController', function($state, $scope, $http, ServicesService) {

	ServicesService.getServices().then(function(data) {
		// get a current list of services from the api
		$scope.services = data;
	});

	$scope.submitForm = function(formType) {
		ServicesService.getUsername().then(function(data) {
			var username = data.username;

			ServicesService.postFormData(formType, username, $scope.formData).then(function(result) {
				if (result.success == "added") {
					$state.go('payment');
				} else {
					console.log(response.data);
					// display an error message in the view...
				}
			})
		});
	}

	$scope.autoFill = function(type) {
	// for demonstration purposes, this function fills out the form with some dummy info
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