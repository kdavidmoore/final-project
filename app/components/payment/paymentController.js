app.controller('paymentController', function($scope, HttpAbstractionService) {
	
	// add the current order id to a hidden input field 
	// order id will get sent to the api for payment processing
	HttpAbstractionService.getOrderId().then(function(data) {
		$scope.orderId = data;
	});
});