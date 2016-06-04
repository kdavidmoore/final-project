app.controller('servicesController', function($state, $scope, $http) {
	// make an http request to the server
	// get an array of objects back containing the services
	// set the results equal to $scope.services

	$scope.services = [
	{
		title: "Water Testing",
		description: "let us handle all of your water testing needs",
		param: "water"
	}
	];

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
	$scope.autoFill = function() {
		
		$scope.formData = {
			address: "123 Long Branch Rd",
			county: "Baldwin",
			sampleType: "householdWell",
			wellDepth: 25,
			wellCasingDiam: 18,
			endUse: "drinking",
			testReasons: "old pipes",
			basicTest: 1,
			lead: 1
		}
	}

});