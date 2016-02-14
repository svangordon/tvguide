angular.module('app')
	.controller('tooltipController', ['$scope', 'hoverFactory', function (scope, hover) {
		var activeElement = angular.element('.active-cell')
		scope.hover = hover.activeCell;
		console.log(activeElement.offsetLeft)

		scope.isActiveCell = function () {
			scope.log()
			return scope.hover.activeCell !== null
		}

		scope.log = function () {
			console.log(scope.title,scope.desc)
		}
	}])