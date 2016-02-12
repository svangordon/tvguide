// console.log(irishTvData)

blebData = blebData.map(function(cur,i,arr) { // This data cleaning should be migrated to the python, eventually

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

function assembleNetwork(networkName, arr) {
	var out = arr.filter( cur => cur.network === networkName).sort( (a,b) => a.startTime.diff(b.startTime))
	.filter( function (cur , i , arr) {
		if ( arr[ i + 1] === undefined ) {
			return true
		} else {
			return cur.startTime !== arr[i+1].startTime && cur.title !== arr[i+1].title
		}
	});

	out.forEach(function(cur,i,arr) {
		cur.endTime = arr[i+1] !== undefined ? 	arr[i+1].startTime :
												moment.utc([cur.year, 0, cur.day, 6, 0]).month(cur.month);
		cur.duration = cur.endTime.diff(cur.startTime, 'minute')

	})
	return out;
}

var irishTvData = assembleNetwork('Irish TV', irishTV)

var rawEmissions = blebData
var bbcOneData = assembleNetwork('BBC 1', blebData);
var bbcTwoData = assembleNetwork('BBC 2', blebData)
var channelFourData = assembleNetwork('Channel 4', blebData)
var fiveData = assembleNetwork('Five', blebData)