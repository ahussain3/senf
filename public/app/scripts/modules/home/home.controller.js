/*
	Login controller takes care of validating the user against the local storage or against the database.
*/
angular.module("gravityApp").controller("homeController", ["$scope", "$location", "loginService", function($scope, $location, loginService){
	
	//Call to login service from factory
	$scope.validate = function(){
		loginService.authenticateUser($scope.username, $scope.password, function(response){
			if(response.success == true) {
				$location.path("/login");
			} else {
				$scope.error = response.message;
			}
		});
	};
}]);