blebData = blebData.map(function(cur,i,arr) { // This data cleaning should be migrated to the python, eventually

	var tZoffset = 7;

	cur.network = cur.network.replace(' on', '');
	if (!cur.month) {
		cur.month = arr[1].month
	}
	cur.year = Number(cur.year);
	cur.day = Number(cur.day);
	cur.desc = cur.desc.join('').trim();
	cur.time = cur.time[0];
	cur.hour = Number(cur.time.split(':')[0])
	cur.min = Number(cur.time.split(':')[1])
	cur.title = cur.title.join('').trim()
	cur.startTime = moment.utc([cur.year, 0, cur.day, cur.hour, cur.min ]).month(cur.month);

	var cutOff = moment.utc([cur.year,0,cur.day,6,0]).month(cur.month); // So anything that's before 6am needs to be moved to the next day
	if (cur.startTime.isBefore(cutOff)) {
		cur.startTime.add(1, 'day')
	}


	return cur
});

var bbcOneData = blebData.filter( cur => cur.network === 'BBC 1').sort( (a,b) => a.startTime.diff(b.startTime))
	.filter( function (cur , i , arr) {
		if ( arr[ i + 1] === undefined ) {
			return true
		} else {
			return cur.startTime !== arr[i+1].startTime && cur.title !== arr[i+1].title
		}
	});

bbcOneData.forEach(function(cur,i,arr) {
	cur.endTime = arr[i+1] !== undefined ? 	arr[i+1].startTime :
											moment.utc([cur.year, 0, cur.day, 6, 0]).month(cur.month);
	cur.duration = cur.endTime.diff(cur.startTime, 'minute')

})

var bbcTwoData = blebData.filter( cur => cur.network === 'BBC 2')
var channel4data = blebData.filter( cur => cur.network === 'Channel 4')
var fiveData = blebData.filter( cur => cur.network === 'Five')


// console.log(bbcOneData)
// console.log(blebData[0].startTime.isAfter("12:00", 'hour'))