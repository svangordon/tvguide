angular.module('app')
	.factory('emissionsFactory', [function(){

		var Emission = ( function () {
			function EmissionConstructor (title, network, start, end, duration, desc) {
				this.title = title;
				this.network = network;
				this.start = start;
				this.end = end
				this.duration = duration
				this.desc = desc
				this.content = title
				this.hover = false
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
					return minInView * pxPerMin * -1
				
			}

			EmissionConstructor.prototype.mouseEnter = function () {
				this.hover = true;
			}

			EmissionConstructor.prototype.mouseLeave = function () {
				this.hover = false;
			}

			return EmissionConstructor
		})()


		function dataToEmissions (arr) {
			return arr.map(function (cur) {
				return new Emission(cur.title, cur.network, cur.startTime, cur.endTime, cur.duration, cur.desc)
			})
		}

		var emissions = dataToEmissions(bbcOneData).concat(dataToEmissions(channelFourData))

		// console.log(dataToEmissions(bbcOneData))

		return {
			emissions : emissions,
			emissionsByNetwork : {
				bbcOne : dataToEmissions(bbcOneData),
				bbcTwo : dataToEmissions(bbcTwoData),
				channelFour : dataToEmissions(channelFourData),
				five : dataToEmissions(fiveData)
			}
		}
	}])