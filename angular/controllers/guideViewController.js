angular.module('app')
	.controller('guideViewController', ['$scope', 'emissionsFactory', 'networksFactory', 'timeFactory', 'hoverFactory', function(scope, emissions, networks, time, hover) {

		scope.hours = time.hours;
		scope.schedule = time.schedule
		scope.emissions  = emissions.emissions;
		scope.networks = networks.networks;
		scope.minPerPx = time.minPerPx
		scope.hover = hover.activeCell

		scope.log = function (val) {
			// var activeCell = document.getElementsByClassName('active-cell')[0]
			// console.log( activeCell.offsetTop, activeCell.offsetLeft )
			console.log(hover)
		}

		scope.timeBarHeight = function () {
			return scope.networks.filter(cur => cur.active === true).length * 64
		}

		scope.textState = {
			val : 0,
			increment : function() {
				this.val = (this.val + 1) % 2
			}
		}

		scope.slideState = {
			val : -1,
			incrementLeft : function () {
				if (this.val > 1) {this.val = 0}
				this.val = (this.val+1) % 2
				console.log(this.val)
			},
			incrementRight : function () {
				if (this.val < 2) {this.val = 2}
				this.val = ((this.val+1) % 2) + 2
				console.log(this.val)
			}
		}

		scope.setSlide = function (val) {
			scope.slideDirection = val;
			console.log(scope.slideDirection)
		}

		scope.clearSlide = function () {
			scope.slideDirection = 'null'
		}

		scope.evalSlide = function evalSlide (val) {
			return val === scope.slideDirection
		}

		scope.resetHover = function () {
			scope.activeCell = null;
			// console.log(emissions.activeCell === obj)
		}

		// emission.hoverHandler($event.offsetX, emission.getDisplayWidth(schedule.firstHour(), schedule.lastHour(), minPerPx))
		scope.hoverHandler = function (offset, cellWidth) {
			// console.log(offset,cellWidth)
			if (offset > cellWidth) {
				scope.activeCell = null; 
			}
		}

		scope.isActive = function (cell) {
			// console.log( 'testing : ', cell, '\n', 'isActive() : ', cell === scope.activeCell)
			return cell === scope.activeCell
		}

		scope.setActive = function (cell) {
			scope.activeCell = cell
			// console.log('active Cell Is : ', scope.activeCell)
		}

		scope.activeCell = null

	}])