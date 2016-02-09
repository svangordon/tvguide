angular.module('app')
	.filter('inViewFilter', function () {
		return function (emissions, schedule) {
			var out = [];

			// This function mostly works.  The problem is that the days that i have data for (february 12th) doesn't match the actualy days of the viewport (whatever today is)
			// But if you click to go all the way to friday, it does indeed in fact work (mostly, it breaks a little bit)
			// So one of the things that I need to do is to get more, better data for everything.

			// Well now it doesn't work anymore.

			return emissions.filter(function(cur) { return cur.start.isBefore(schedule.lastHour()) && cur.end.isAfter(schedule.firstHour()) })
			// return out
		}
	})