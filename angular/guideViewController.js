angular.module('app')
	.controller('guideViewController', ['$scope', 'emissionsFactory', function(scope, emissions) {

		scope.emissions  = emissions.emissions;

	}])