angular.module('app')
	.factory('emissionsFactory', [function(){

		var Emission = ( function () {
			function EmissionConstructor (title, network, start, end) {
				this.title = title;
				this.network = network;
				this.start = start;
				this.end = end
				this.length = Math.max(moment.duration(this.start.diff(this.end)*-1).minutes(),moment.duration(this.start.diff(this.end)).minutes());
				// console.log(this.title, this.length);
			}

			EmissionConstructor.prototype.inView = function (viewStart, viewEnd) { //checks if the show should be visible in the viewport
				console.log((this.start.isBefore(viewEnd) && this.end.isBefore(viewStart)))
				return (this.start.isBefore(viewEnd) && this.end.isBefore(viewStart))
			}

			return EmissionConstructor
		})()

		var emissions = shows.map(function(cur , i , arr){

			var sT = moment([Number(cur.year), 0, Number(cur.day), Number(cur.time.split(':')[0]), Number(cur.time.split(':')[1]) ]).month(cur.month);

			var eT = arr[i+1] !== undefined ? moment([Number(arr[i+1].year), 0, Number(arr[i+1].day), Number(arr[i+1].time.split(':')[0]), Number(arr[i+1].time.split(':')[1]) ]).month(arr[i+1].month) : moment[2016,2,14,23,59];

			return new Emission(cur.title, cur.network, sT, eT)

		})

		return {
			emissions : emissions,
		}
	}])