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
				// generate a standard set of options for a soil test
				$scope.options = ["Nitrate (ppm)", "Phosphate (ppm)", "Potassium (ppm)", "pH", "Electrical conductivity (µS/cm)"];
				ResultsService.genResults($stateParams.id, $stateParams.type, $scope.options).then(function(data) {
					$scope.results = data.results;
				});

			}
		} else {
			$state.go('login');
		}
	});
}]);