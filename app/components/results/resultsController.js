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
						// wow this is bad
						if (key !== "address" && key !== "county" && key !== "sampleType" && key !== "wellDepth" && key !== "wellCasingDiam" && key !== "endUse" && key !== "testReasons") {
							if (parsedData[key] == 1) {
								chosenOptions.push(key);
							}
						}
					}
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