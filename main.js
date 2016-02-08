shows.forEach(function(cur) { // This data cleaning should be migrated to the python, eventually

	cur.desc = cur.desc[0];
	cur.time = cur.time[0];
	cur.title = cur.title[0]

})
console.log(shows)