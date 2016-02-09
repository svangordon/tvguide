angular.module('app')
	.factory('emissionsFactory', [function(){

		var Emission = ( function () {
			function EmissionConstructor (title, network, start, end, duration) {
				this.title = title;
				this.network = network;
				this.start = start;
				this.end = end
				this.duration = duration
				// console.log(this.title, this.length);
			}

			EmissionConstructor.prototype.inView = function (viewStart, viewEnd) { //checks if the show should be visible in the viewport
				// console.log((this.start.isBefore(viewEnd) && this.end.isBefore(viewStart)))
				return (this.start.isBefore(viewEnd) && this.end.isBefore(viewStart))
			}

			EmissionConstructor.prototype.log = function () {
				console.log(this.title, "\n",this.start.format(), "\n",this.end.format(), "\n",this.duration)
			}

			EmissionConstructor.prototype.getDisplayWidth = function(viewStart,viewEnd,pxPerMin) {
				var minInView;
				if (viewStart.isAfter(this.start)) {
					minInView = viewStart.diff(this.end, 'm')
				} else if (viewEnd.isBefore(this.end)) {
					minInView = this.start.diff(viewEnd, 'm')
				} else {
					minInView = this.start.diff(this.end, 'm')
				}
				return minInView * pxPerMin *-1
			}

			return EmissionConstructor
		})()

		// var emissions = shows.map(function(cur , i , arr){

		// 	var sT = moment([Number(cur.year), 0, Number(cur.day), Number(cur.time.split(':')[0]), Number(cur.time.split(':')[1]) ]).month(cur.month);

		// 	var eT = arr[i+1] !== undefined ? moment([Number(arr[i+1].year), 0, Number(arr[i+1].day), Number(arr[i+1].time.split(':')[0]), Number(arr[i+1].time.split(':')[1]) ]).month(arr[i+1].month) : moment[2016,2,14,23,59];

		// 	return new Emission(cur.title, cur.network, sT, eT)

		// })

		var emissions = bbcOneData.map(function (cur) {
			return new Emission(cur.title, cur.network, cur.startTime, cur.endTime, cur.duration)
		})

		return {
			emissions : emissions,
		}
	}])