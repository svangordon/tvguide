

var irishTV = irishTvData.map(function(cur,i,arr){
	cur.hours = Number(cur.time.split(':')[0]);
	if (cur.time.indexOf('p')!==-1 && cur.hours !== 12) {
		cur.hours += 12
	}
	cur.min = Number(cur.time.split(':')[1][0] + cur.time.split(':')[1][1])
	cur.year = Number(cur.year);
	cur.day = Number(cur.day);

	// console.log(cur.min,cur.hours)

	// console.log(cur.time,cur.year,cur.day,cur.month)

	var cutOff = moment.utc([cur.year,0,cur.day,6,0]).month(cur.month);
	cur.startTime = moment.utc([cur.year, 0, cur.day, cur.hours, cur.min]).month(cur.month)
	if (cur.startTime.isBefore(cutOff)) {
		cur.startTime.add(1, 'day')
	}
	// cur.startTime = moment.utc([cur.year, 0, cur.day]).month(cur.month)
	// console.log(cur.startTime)

	return cur
})
