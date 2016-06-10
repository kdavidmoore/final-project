app.controller('resultsController', ['$state', '$scope', '$stateParams', 'UserAuthService', 'ResultsService',
	function($state, $scope, $stateParams, UserAuthService, ResultsService) {
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			$scope.orderId = $stateParams.id;
			$scope.orderType = $stateParams.type;
			// get results for selected order
			if ($stateParams.type == "water") {
				ResultsService.getOrderData($stateParams.id).then(function(data) {
					var parsedData = JSON.parse(data.orderData);
					var chosenOptions = [];
					for (key in parsedData) {
						// this is a list of properties from the parsed data to ignore
						var ignoreFields = ["address", "county", "sampleType", "wellDepth", "wellCasingDiam", "endUse", "testReasons"];
						if (!ignoreFields.hasOwnProperty(key)) {
							if (parsedData[key] == 1) {
								// we are adding the desired water quality parameters to an array
								chosenOptions.push(key);
							}
						}
					}
					// update the table header labels using the array we generated
					$scope.options = chosenOptions;
					$scope.note = "All values expressed as parts per billion (ppb) except pH.";
					// take the chosen options and generate random results
					ResultsService.genResults($stateParams.id, $stateParams.type, $scope.options).then(function(data) {
						$scope.results = data.results;
					});
				});
			} else {
				// generate table headers for the soil test results
				$scope.options = ["Nitrate (ppm)", "Phosphate (ppm)", "Potassium (ppm)", "pH", "Electrical conductivity (mS/cm)"];
				// generate random results from the standard test options
				ResultsService.genResults($stateParams.id, $stateParams.type, $scope.options).then(function(data) {
					$scope.results = data.results;
				});
			}
		} else {
			$state.go('login');
		}
	});
}]);