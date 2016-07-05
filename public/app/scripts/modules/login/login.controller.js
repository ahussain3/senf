/*
	Login controller takes care of validating the user against the local storage or against the database.
*/
angular.module("gravityApp").controller("loginController", ["$scope", "$location", "loginService", function($scope, $location, loginService){
	
	var _this = this;
	
	_this.validate = function(){
		loginService.authenticateUser(_this.username, _this.password, function(response){
			if(response.success == true) {
				$location.path("/");
			} else {
				$scope.error = response.message;
			}
		});
	};
}]);