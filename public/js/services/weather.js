// angular.module('wdiproject4')
//   .service('weather', Weather);
//
//   Weather.$inject = ['$window'];
//
//   function Weather($window) {
//     var weather = angular.fromJson($window.localStorage.getItem('weather')) || [];
//
//     return {
//       getWeather: function () {
//
//         // log the date too
//         // var lat = 51.515;
//         // var lon = 0.0722;
//
//         var lat = this.selectedExperience.venue.address.latitude;
//         var lon = this.selectedExperience.venue.address.longitude;
//
//         var cnt = 1;
//         var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=' + cnt + '&APPID=87ca65f966e5c408abfc6d84b66d676f';
//         $http
//           .get(url)
//           .then(function(res){
//             return res.data
//           })
//       }
//
//
//     }
//
//   }
//
//
var app = angular.module('wdiproject4')
  .service('weather', Weather);

function Weather () {

  this.lat;
  this.lon;
  this.greeting = function () {
    return "hi from weather service!"
  }
  

  // return this;

}
