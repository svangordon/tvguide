angular.module('app')
	.factory('timeFactory', [function () {

		var Schedule = (function() {
			
			function ScheduleConstructor (hoursBefore, hoursAfter) { // hoursBefore should be negative, hoursAfter positive
				this.startHour = moment();
				this.hoursBefore = hoursBefore;
				this.hoursAfter = hoursAfter;
				this.hours = setContents(this.startHour, this.hoursBefore, this.hoursAfter);
				this.days = setDays.call(this)
				this.firstSlot = firstSlot()
				this.lastSlot = lastSlot()
			}

			function setContents(zH, hB, hA) {
				var out = [];
				start = zH;
				for (var i = hB; i <= hA; i++) {
					out.push(start.clone().add(i, 'hours').startOf('hour'))
				}
				return out;
			}

			function setDays() { // this needs to be done where the days aren't numbers, but date objects -- only way to make this not hackish
				var curDay = this.startHour
				var newDay;
				var out = []
				for (var i = -2; i < 3 ; i++ ) {
					newDay = moment(curDay).add(i,'d')
					out.push(newDay)
				}
				// console.log(out)
				return out;
			}

			ScheduleConstructor.prototype.advance = function () { // schedule forward / back move the whole schedule forward / backward, keeping the number of hours in it the same
				if (isValidHour(this.lastHour())) { // doesn't let you advance past the end of the schedule
					this.startHour.add(1,'hour');
				}
				this.setTime();
			}

			ScheduleConstructor.prototype.rewind = function () {
				if (isValidHour(this.firstHour())) {
					this.startHour.subtract(1,'hour');
				}
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
				return this.hours[this.hours.length-1]
			}

			ScheduleConstructor.prototype.goToDay = function (day) {
				if (isValidDay(day)) {
					this.startHour = day
				}
				this.setTime()
			}

			function isValidHour(time) {
				return time.isAfter(firstSlot()) && time.isBefore(lastSlot())
			}

			function isValidDay(day) {
				// console.log(lastSlot().isAfter(day))
				return lastSlot().isAfter(day) && firstSlot().isBefore(day)
			}

			function setFirstSlot (arr) {
				return arr.sort(function(a,b){return a.startTime.diff(b.startTime)})[0].startTime
			}

			function setLastSlot (arr) {
				return arr.sort(function(a,b){return a.startTime.diff(b.startTime)})[arr.length-1].startTime
			}
			
			var firstSlot = setFirstSlot.bind(this,rawEmissions)

			var lastSlot = setLastSlot.bind(this,rawEmissions)

			return ScheduleConstructor

		})()

		// var chronoSched = arr.sort(function(a,b){return a.startTime.diff(b.startTime)})

		// console.log(chronoSched)

		var schedule = new Schedule(-2,5);
		

		return {
			schedule : schedule,
			minPerPx : 2
		}
	}])