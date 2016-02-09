angular.module('app')
	.controller('networksController', [ '$scope', 'networksFactory', function (scope, networks) {
		scope.networks = networks.networks
		
	}])