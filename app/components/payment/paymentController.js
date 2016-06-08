app.controller('paymentController', ['$scope', 'GetRequestService', function($scope, GetRequestService) {	
	// add the current order id to a hidden input field 
	// order id will get sent to the api for payment processing
	GetRequestService.getOrderId().then(function(data) {
		console.log(data);
		$scope.orderId = data;
	});
}]);