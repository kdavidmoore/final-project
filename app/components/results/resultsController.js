app.controller('resultsController', ['$state', '$scope', '$stateParams', 'UserAuthService', 'GenerateResultsService',
	function($state, $scope, $stateParams, UserAuthService, GenerateResultsService) {
	UserAuthService.checkToken().then(function(data) {
		if (data.success == "validated") {
			$scope.orderId = $stateParams.id;
			$scope.orderType = $stateParams.type;
			// get results for selected order
			if ($stateParams.type == "water") {
				GenerateResultsService.getOrderData($stateParams.id).then(function(data) {
					var parsedData = JSON.parse(data.orderData);
					var chosenOptions = [];
					for (key in parsedData) {
						if (key !== "address" && key !== "county" && key !== "sampleType" && key !== "wellDepth" && key !== "wellCasingDiam" && key !== "endUse" && key !== "testReasons") {
							if (parsedData[key] == 1) {
								chosenOptions.push(key);
							}
						}
					}
					$scope.options = chosenOptions;
					// TODO: take the chosen options and generate random results

				});
			} else {
				$scope.options = ["standard soil test"];
			}
		} else {
			$state.go('login');
		}
	});
}]);