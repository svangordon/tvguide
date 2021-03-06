angular.module('app')
	.factory('emissionsFactory', ['timeFactory', function(timeFactory){

		var Emission = ( function () {
			function EmissionConstructor (title, network, start, end, duration, desc) {
				this.title = title;
				this.network = network;
				this.start = start;
				this.end = end
				this.duration = duration
				this.desc = desc
				// this.content = title
				this.hover = false
				this.tooltipHover = false
				// console.log(this.title, this.length);
			}

			EmissionConstructor.prototype.inView = function (viewStart, viewEnd) { //checks if the show should be visible in the viewport
				// console.log((this.start.isBefore(viewEnd) && this.end.isBefore(viewStart)))
				// I suspect that this is messed up -- they're both checking isBefore, and I think that the second one should be checking isAfter, but it works so for now I won't try to fix it
				var firstHour = timeFactory.schedule.firstHour();
				var lastHour = timeFactory.schedule.lastHour();
				return (this.start.isBefore(lastHour) && moment(this.end).add(1,'h').isBefore(firstHour))
			}

			EmissionConstructor.prototype.log = function () {
				console.log(this.title, "\n",this.start.format(), "\n",this.end.format(), "\n",this.duration)
			}

			EmissionConstructor.prototype.getDisplayWidth = function() {
				var minInView;
				var firstHour = timeFactory.schedule.firstHour();
				var lastHour = timeFactory.schedule.lastHour();
				var minPerPx = timeFactory.minPerPx
					if (firstHour.isAfter(this.start)) { // This could be a ternary operator, but it's easier to read like this
						minInView = firstHour.diff(this.end, 'm')
					} else if (lastHour.isBefore(this.end)) {
						minInView = this.start.diff(lastHour, 'm')
					} else {
						minInView = this.start.diff(this.end, 'm')
					}
					return minInView * minPerPx * -1
				
			}

			EmissionConstructor.prototype.mouseEnter = function () {
				this.hover = true;
			}

			EmissionConstructor.prototype.mouseLeave = function () {
				// console.log('emisisons')
				this.hover = false;
			}

			EmissionConstructor.prototype.hoverHandler = function (offset, cellWidth) { // takes the arguments so that it can getDisplayWidth
				if (offset > cellWidth) {
					return null
				} else {
					return this
				}
			}

			return EmissionConstructor
		})()


		function dataToEmissions (arr) {
			return arr.map(function (cur) {
				return new Emission(cur.title, cur.network, cur.startTime, cur.endTime, cur.duration, cur.desc)
			})
		}

		// console.log(dataToEmissions(bbcOneData))

		return {
			rawEmissions : rawEmissions,
			emissionsByNetwork : {
				bbcOne : dataToEmissions(bbcOneData),
				bbcTwo : dataToEmissions(bbcTwoData),
				channelFour : dataToEmissions(channelFourData),
				five : dataToEmissions(fiveData),
				irishTv : dataToEmissions(irishTvData)
			},
			activeCell : null
		}
	}])