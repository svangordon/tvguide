angular.module('app')
	.controller('guideViewController', ['$scope', 'emissionsFactory', 'networksFactory', 'timeFactory', function(scope, emissions, networks, time) {

		scope.schedule = time.schedule;
		scope.emissions  = emissions.emissions;
		scope.networks = networks.networks;
		
		// console.log(scope.emissions)

		scope.minPerPx = 2;

	}])