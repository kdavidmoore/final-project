app.factory('PostRequestService', function($http, $cookies) {

	function postRegData(user, pass, email) {
		return $http({
			method: 'POST',
			url: API_URL + '/register',
			data: {
				username: user,
				password: pass,
				email: email
			}
		}).then(function successCallback(result) {
			if (result.data.success == 'added') {
				var expDate = new Date();
				expDate.setDate(expDate.getTime() + (30 * 60000));
				// get a token back from the API and store it inside cookies with an expiration date of 30 minutes from now
				$cookies.put('token', result.data.token, { 'path': '/', 'expires': expDate });
				return 'success';
			} else if (result.data.failure == 'notUnique') {
				return 'usernameExists';
			} else {
				return 'someProblem';
			}
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function postLoginData(user, pass) {
		return $http({
			method: 'POST',
			url: API_URL + '/login',
			data: {
				username: user,
				password: pass
			}
		}).then(function successCallback(result) {
			if (result.data.failure == 'noMatch') {
				return 'passwordError';
			} else if (result.data.failure == 'noUser') {
				return 'userError';
			} else if (result.data.success == 'match') {
				var expDate = new Date();
  				expDate.setDate(expDate.getTime() + (30 * 60000));
				// store the token inside cookies with an expiration date of 30 minutes from now
				$cookies.put('token', result.data.token, { 'path': '/', 'expires': expDate });
				return 'success';
			} else {
				return 'someProblem';
			}
		}, function errorCallback(result) {
			return result.status;
		});
	}

	function postSampleData(type, user, data) {
		return $http({
			method: 'POST',
			url: API_URL + '/postSampleData',
			data: {
				username: user,
				token: $cookies.get('token'),
				orderType: type,
				orderData: JSON.stringify(data),
				orderStatus: "unpaid"
			}
		}).then(function successCallback(result) {
			if (result.data.success == "added") {
				return "ok";
			} else {
				return "error";
			}
		}, function errorCallback(result) {
			return result.status;
		});
	}

	return {
		postRegData: postRegData,
		postLoginData: postLoginData,
		postSampleData: postSampleData
	};
});