
var month = "February"
var year = '2016'
var day = '12'
var time = "06:00"

// var time = moment([Number(year), 0, Number(day), Number(time.split(':')[0]), Number(time.split(':')[1]) ]).month(month)
// [year, month, day, hour, minute, second, millisecond]


// "06:00" "February" "2016" "12"
// console.log(time)

var time = moment().add(35, 'm');

// ng-mouseenter="emission.mouseEnter(); log($event.offsetX)" ng-mouseleave="emission.mouseLeave()"
// ng-mouseover="emission.hoverHandler($event.offsetX, emission.getDisplayWidth(schedule.firstHour(), schedule.lastHour(), minPerPx))"
// ng-mouseover="log($event.offsetX)"