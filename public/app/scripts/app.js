//Initial file for client App
(function(){
	angular.module("gravityApp", ["ui.router","ui.bootstrap"]);
})();

angular.module("gravityApp")
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
		
		//$urlRouterProvider.otherwise('/login');
		
		$stateProvider
			.state('/', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'scripts/modules/home/header.template.html',
						controller: "homeController",
						controllerAs: "homeController"
					},
					'left': {
						templateUrl: 'scripts/modules/home/left.template.html', 
						controller: "homeController",
						controllerAs: "homeController"
					},
					'content': {
						templateUrl: 'scripts/modules/home/home.template.html', 
						controller: "homeController",
						controllerAs: "homeController"
					},
					'right': {
						templateUrl: 'scripts/modules/home/right.template.html', 
						controller: "homeController",
						controllerAs: "homeController"
					},
					'footer': {
						templateUrl: 'scripts/modules/home/footer.template.html',
						controller: "homeController",
						controllerAs: "homeController"
					}
				}
				})
			.state('login', {
				url: '/login',
				views: {
					'header': {},
					'left': {},
					'content': {
						templateUrl: 'scripts/modules/login/login.template.html',
						controller: "loginController",
						controllerAs: "loginController"
					},
					'right': { },
					'footer': { }
				}
				});
	}]).run(["$rootScope", "$location", "loginService", function($rootScope, $location, loginService){
		$rootScope.$on("$stateChangeStart", function(){
			if(loginService.isAuthenticated() === false) {
				$location.path("/login");
			} else {
				if($location.$$path !== "/" && $location.$$path !== "/login") {
					$location.path($location.$$path);
				} else {
					$location.path("/");
				}
			}
		});
	}]);;