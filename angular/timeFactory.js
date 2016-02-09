angular.module('app')
	.factory('timeFactory', [function () {

		var Schedule = (function() {
			
			function ScheduleConstructor (hoursBefore, hoursAfter) { // hoursBefore should be negative, hoursAfter positive
				this.startHour = moment();
				this.hoursBefore = hoursBefore;
				this.hoursAfter = hoursAfter;
				this.contents = setContents(this.startHour, this.hoursBefore, this.hoursAfter);
				
			}

			function setContents(zH, hB, hA) {
				var out = [];
				start = zH;
				for (var i = hB; i <= hA; i++) {
					out.push(start.clone().add(i, 'hours').startOf('hour'))
				}
				return out;
			}

			ScheduleConstructor.prototype.advance = function () { // schedule forward / back move the whole schedule forward / backward, keeping the number of hours in it the same
				this.startHour.add(1,'hour');
				this.contents = setContents(this.startHour, this.hoursBefore, this.hoursAfter);
			}

			ScheduleConstructor.prototype.rewind = function () {
				this.startHour.subtract(1,'hour');
				this.contents = setContents(this.startHour, this.hoursBefore, this.hoursAfter);
			}

			ScheduleConstructor.prototype.logTimes = function () {
				console.log('\n')
				this.contents.forEach(function(cur) { console.log(cur.format('LT')) })
				console.log('\n')
			}

			ScheduleConstructor.prototype.firstHour = function () {
				return this.contents[0]
			}

			ScheduleConstructor.prototype.lastHour = function () {
				return this.contents[this.contents.length-1]
			}

			return ScheduleConstructor

		})()



		var schedule = new Schedule(-2,5);
		

		return {
			schedule : schedule,
		}
	}])