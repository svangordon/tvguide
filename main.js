
var month = "February"
var year = '2016'
var day = '12'
var time = "06:00"

var time = moment([Number(year), 0, Number(day), Number(time.split(':')[0]), Number(time.split(':')[1]) ]).month(month)
// [year, month, day, hour, minute, second, millisecond]


// "06:00" "February" "2016" "12"
// console.log(time)