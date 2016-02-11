angular.module('app')
	.controller('guideViewController', ['$scope', 'emissionsFactory', 'networksFactory', 'timeFactory', function(scope, emissions, networks, time) {

		scope.hours = time.hours;
		scope.schedule = time.schedule
		scope.emissions  = emissions.emissions;
		scope.networks = networks.networks;
		scope.c4 = emissions.channel4
		// console.log(scope.emissions)

		scope.minPerPx = time.minPerPx

		// console.log(emissions.emissionsByNetwork)

		scope.hoverStateReset = function () {
			for (network in emissions.emissionsByNetwork) {
				emissions.emissionsByNetwork[network].forEach(function(cur) {
					cur.hover = false
				})
			}
		}
	}])