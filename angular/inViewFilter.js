angular.module('app')
	.filter('inViewFilter', function () {
		return function (emissions, schedule) {
			var out = [];

			return emissions.filter(function(cur) { return cur.start.isBefore(schedule.lastHour()) && cur.end.isAfter(schedule.firstHour()) })
			// return out
		}
	})