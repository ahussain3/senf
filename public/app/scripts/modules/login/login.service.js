/*
	Login service hold the methods which does the authentication against database, storing credentials in localstorage and clearing credentials from local storage upon doing logout activity.
*/
angular.module("gravityApp").factory("loginService", ["$http", "$window", function($http, $window){
	
	var responseData = {};

	var authenticateUser = function(username, password, callback){
		$http.get("/api/users")
			.success(function(response){
				if(response.status == 'ok') {
					var users = angular.fromJson(response.data);
					angular.forEach(users, function(user){
						if(user.username === username && user.password === password) {
							rememberCredential(username, password);
							responseData = {success:true, message:"logged in"};
							callback(responseData);
						}
					});
					responseData = {success:false, message:"invalid credentials"};
					callback(responseData);
				}
			})
			.error(function(error){
				responseData = {success:false, message:"prolem connecting server :("};
				callback(responseData);
			});
	};

	var rememberCredential = function(username, password) {
		$credentials = {};
		$credentials.currentuser = { username:username, password: password };
		$window.localStorage.setItem('credentials', $credentials);
	};

	var isAuthenticated = function() {
		if($window.localStorage.getItem('credentials') == null || $window.localStorage.getItem('credentials') == undefined){
			return false;
		} else {
			return true;
		}
	};

	var logOut = function() {
		$window.localStorage.clear();		
	};

	return {
		"authenticateUser": authenticateUser,
		"logOut": logOut,
		"isAuthenticated": isAuthenticated
	}

}]);