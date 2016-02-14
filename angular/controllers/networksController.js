angular.module('app')
	.controller('networksController', [ '$scope', 'networksFactory', 'emissionsFactory', function (scope, networks,emissions) {
		scope.networks = networks.networks
		scope.activeNetworks = networks.activeNetworks
		// scope.log = function(val) {
		// 	console.log(val)
		// }

		scope.record = function (val) {
			console.log(val)
		}

		scope.hoverStateReset = function () {
			for (network in emissions.emissionsByNetwork) {
				emissions.emissionsByNetwork[network].forEach(function(cur) {
					cur.hover = false
				})
			}
		}

		scope.activeNetworksNumber = function() {
			return scope.networks.filter(cur => cur.active).length
		}

		scope.addNetworks = false

		scope.areInactiveNetworks = function () {
			return Boolean(scope.networks.filter(cur => !cur.active).length)
		}

	}])