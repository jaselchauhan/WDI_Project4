angular.module('wdiproject4')
  .constant('API_URL', 'http://localhost:3000/experiences/')
  .constant('API_KEY_WEATHER', '87ca65f966e5c408abfc6d84b66d676f')
  .controller('ExperiencesController', ExperiencesController);

ExperiencesController.$inject = ['$http', '$state', 'API_URL', 'weather', 'location'];

function ExperiencesController($http, $state, API_URL, weather, location) {

  var self = this;

  this.queryData = {
    //
    // "city": "London",
    // "start": "2016-05-05T19:00:00Z",
    // "end": "2016-05-05T19:00:00Z"
  };

  this.all = {};
  this.weatherInfo = {};

  this.selectedExperience = {};

  self.getExperiences = function () {

    // console.log("before date format changed",this.queryData);
    // self.queryData.start = new Date(self.queryData.start).toUTCString();
    // self.queryData.end = new Date(self.queryData.end).toUTCString();

    console.log("after date format changed", this.queryData);

    self.all = [];
    $http
      .post(API_URL, self.queryData)
      .then(function(res) {
        // self.all = [];
        self.all = res.data;
        // console.log("function fired,");
        console.log(res.data);
        console.log("hi from controller!");
        // console.log(weather.greeting());

      })
      .then(function(){
        self.scrollToResults();
      })
  }

self.selectExperience = function (experience) {
  self.selectedExperience = experience;

  location.set(self.selectedExperience.venue.address);

  // console.log(weather.greeting());
  weather.getWeather(function(weatherObj) {

    self.weatherInfo = weatherObj;
    self.weatherInfo.tempDay = Math.round(weatherObj.list[0].temp.day - 273.15);
    self.weatherInfo.tempEve = Math.round(weatherObj.list[0].temp.eve - 273.15);

    console.log("weatherData stored in controller variable",self.weatherInfo);
    console.log("lat",self.weatherInfo.city.coord.lat, ":  lng:", self.weatherInfo.city.coord.lon);
  });

  $state.go('experience');

}

    self.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };

self.scrollTop = function () {
  window.scrollTo(0,0);
}

self.scrollToResults = function () {
  window.scrollTo(0,400);
  console.log("scroll function fired");
}

self.momentDate = function (unixDate){
  var day = moment.unix(unixDate);
  return day;
}


}
