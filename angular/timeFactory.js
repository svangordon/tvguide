angular.module('app')
	.factory('timeFactory', [function () {

		var Schedule = (function() {
			
			function ScheduleConstructor (hoursBefore, hoursAfter) { // hoursBefore should be negative, hoursAfter positive
				this.startHour = moment();
				this.hoursBefore = hoursBefore;
				this.hoursAfter = hoursAfter;
				this.hours = setContents(this.startHour, this.hoursBefore, this.hoursAfter);
				this.days = setDays.call(this)
			}

			function setContents(zH, hB, hA) {
				var out = [];
				start = zH;
				for (var i = hB; i <= hA; i++) {
					out.push(start.clone().add(i, 'hours').startOf('hour'))
				}
				return out;
			}

			function setDays() {
				var curDay = parseInt(this.startHour.format('D'))
				console.log(typeof this.hours[3].format('D'))
				var out = []
				for (var i = -2; i < 3 ; i++ ) {
					out.push(curDay + i)
				}
				return out;
			}

			ScheduleConstructor.prototype.advance = function () { // schedule forward / back move the whole schedule forward / backward, keeping the number of hours in it the same
				this.startHour.add(1,'hour');
				this.setTime();
			}

			ScheduleConstructor.prototype.rewind = function () {
				this.startHour.subtract(1,'hour');
				this.setTime();
			}

			ScheduleConstructor.prototype.logTimes = function () {
				console.log('\n')
				this.hours.forEach(function(cur) { console.log(cur.format('LT')) })
				console.log('\n')
			}

			ScheduleConstructor.prototype.setTime = function () {
				this.hours = setContents(this.startHour, this.hoursBefore, this.hoursAfter);
				this.days = setDays.call(this)
			}

			ScheduleConstructor.prototype.firstHour = function () {
				return this.hours[0]
			}

			ScheduleConstructor.prototype.lastHour = function () {
				// console.log("last hour : \n", this.hours[this.hours.length-1])
				return this.hours[this.hours.length-1]
			}

			ScheduleConstructor.prototype.goToDay = function (day) {
				this.startHour.date(day)
				this.setTime()
			}

			return ScheduleConstructor

		})()



		var schedule = new Schedule(-2,5);
		

		return {
			schedule : schedule,
			minPerPx : 2
		}
	}])