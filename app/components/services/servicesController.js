app.controller('servicesController', ['$state', '$scope', 'HttpAbstractionService', function($state, $scope, HttpAbstractionService) {

	HttpAbstractionService.getLabServices().then(function(data) {
		// get a current list of services from the api
		$scope.services = data;
	});

	$scope.submitForm = function(formType) {
		// first, make sure the token validates
		// TODO...
		HttpAbstractionService.getUsername().then(function(data) {
			var username = data.username;
			HttpAbstractionService.postSampleData(formType, username, $scope.formData).then(function(result) {
				if (result.success == "added") {
					$state.go('payment');
				} else {
					// display an error message in the view
					// TODO...
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
}]);