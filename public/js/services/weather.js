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
angular.module('wdiproject4')
  .service('weather', Weather);

Weather.$inject = ['$http', 'location'];

function Weather ($http, location) {

  this.lat;
  this.lon;
  this.greeting = function () {
    return "hi from weather service!"
  }

  // return this;

  this.getWeather = function(callback) {

    //this function takes lat long and date, makes a GET request to weather API and then returns result as object

    // var positionObj =location.get();
    // console.log("location getter function fired: ",positionObj);

    var pos = location.get();
    console.log("POSITION from weather service", pos);

    // log the date too
    // var lat = 41.515;
    // var lon = 0.0722;

    var lat = pos.latitude;
    var lon = pos.longitude;

    // lat: pos.latitude,
    // lng: pos.longitude



    var self = this;
    var weather = {};

    // var lat = this.selectedExperience.venue.address.latitude;
    // var lon = this.selectedExperience.venue.address.longitude;

    //adjust the number of days in cnt variable depending on length of days user has searched for.
    var cnt = 1;
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=' + cnt + '&APPID=87ca65f966e5c408abfc6d84b66d676f';
    $http.get(url)
      .then(function(res){
        console.log("getWeather function called from service");
        return callback(res.data);
      })
  }


  // self.convertToCelsius = function(degK) {
  //         return Math.round(degK - 273.15);
  //     }







}
