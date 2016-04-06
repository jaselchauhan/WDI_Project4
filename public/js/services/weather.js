angular.module('wdiproject4')
  .service('weather', Weather);

Weather.$inject = ['$http', 'location'];

function Weather ($http, location) {

  this.lat;
  this.lon;
  this.greeting = function () {
    return "hi from weather service!"
  }

  this.getWeather = function(callback) {

    var pos = location.get();
    console.log("POSITION from weather service", pos);

    // log the date too

    var lat = pos.latitude;
    var lon = pos.longitude;

    var self = this;
    var weather = {};

    //adjust the number of days in cnt variable depending on length of days user has searched for.
    var cnt = 1;
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=' + cnt + '&APPID=87ca65f966e5c408abfc6d84b66d676f';
    $http.get(url)
      .then(function(res){
        console.log("getWeather function called from service");
        return callback(res.data);
      })
  }


  this.convertToCelsius = function(degK) {
          return Math.round(degK - 273.15);
      }







}
