// var aniTest = angular.module('app').animation('.slide-left', [function() {
//   return {
//     // make note that other events (like addClass/removeClass)
//     // have different function input parameters
//     enter: function(element, doneFn) {
//       console.log(element.siblings().width())
//       jQuery(element).fadeIn(1000, doneFn);

//       // remember to call doneFn so that angular
//       // knows that the animation has concluded
//     },

//     move: function(element, doneFn) {
//       jQuery(element).fadeIn(1000, doneFn);
//     },

//     leave: function(element, doneFn) {
//       jQuery(element).fadeOut(1000, doneFn);
//     }
//   }
// }]);

// var animan = angular.module('app').animation('.emission-block', function() {
//   return {
//     animate : function(element, from, to, done, options) {
//       console.log(element)
//       //animation
//       done();
//     }
//   }
// });