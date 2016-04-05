angular.module('wdiproject4')
  .constant('API_URL', 'http://localhost:3000/experiences/')
  .constant('API_KEY_WEATHER', '87ca65f966e5c408abfc6d84b66d676f')
  .controller('ExperiencesController', ExperiencesController);

ExperiencesController.$inject = ['$http', '$state', 'API_URL', 'weather', 'location'];

function ExperiencesController($http, $state, API_URL, weather, location) {

  var self = this;

  self.myDate = new Date();

    self.minDate = new Date(
        self.myDate.getFullYear(),
        self.myDate.getMonth() - 2,
        self.myDate.getDate());

    self.maxDate = new Date(
        self.myDate.getFullYear(),
        self.myDate.getMonth() + 2,
        self.myDate.getDate());

    self.onlyWeekendsPredicate = function(date) {
      var day = date.getDay();
      return day === 0 || day === 6;
    }

  //think i need to add ng-model from form into queryData.
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
    $http
      .post(API_URL, self.queryData)
      .then(function(res) {
        self.all = [];
        self.all = res.data;
        // console.log("function fired,");
        console.log(res.data);
        console.log("hi from controller!");
        // console.log(weather.greeting());

      })
  }
 // experiences.weather.getWeather();
  // self.getWeather = function () {
  //
  //   //log the date too
  //   // var lat = 51.515;
  //   // var lon = 0.0722;
  //
  //   var lat = this.selectedExperience.venue.address.latitude;
  //   var lon = this.selectedExperience.venue.address.longitude;
  //
  //   var cnt = 1;
  //   var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=' + cnt + '&APPID=87ca65f966e5c408abfc6d84b66d676f';
  //   $http
  //     .get(url)
  //     .then(function(res){
  //       self.weather = res.data
  //       console.log(self.weather);
  //     })
  // }

self.selectExperience = function (experience) {
  self.selectedExperience = experience;

  location.set(self.selectedExperience.venue.address);

  console.log(weather.greeting());
  weather.getWeather(function(weatherObj) {
  // var weatherObj = weather.getWeather();

  //apply async to this variable which will mean that the show page will load before waiting for the weather to load.
    // console.log(weatherObj);
    self.weatherInfo = weatherObj;
    console.log("weatherData stored in controller variable",self.weatherInfo);
    console.log("lat",self.weatherInfo.city.coord.lat, ":  lng:", self.weatherInfo.city.coord.lon);
  });

  $state.go('experience');

}

//create a currentexperience service. self.getExperience

  // getExperiences();

//need to pass venue lat and long into lat and lon for weather api then make the call.

// self.convertToCelsius = function(degK) {
//         return Math.round(degK - 273.15);
//     }

    self.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };

self.scrollTop = function () {
  window.scrollTo(0,0);
}

self.momentDate = function (unixDate){
  var day = moment.unix(unixDate);
  return day;
}


}


//need to pass the date from search to the weather api so it can get forecast for correct date.




//
//
//
// ExperiencesController.$inject = ['$resource'];
//
// function ExperiencesController($resource) {
//   var self = this;
//
//   var Experience = $resource('http://localhost:3000/experiences/:id', {
//     id: '@_id'},{
//     update: {method: "PATCH"}});
//
//   this.all = Experience.query();
//
//   // show a clicked experience
//    this.selectExperience = function(experience) {
//      self.selectedExperience = Experience.get({id: experience._id});
//    };
//
//
//    this.mapCenter = { lat: 51.4802, lng: -0.0193 };
//      this.mapMarkers = [{
//        name: "Buckingham Palace",
//        position: { lat: 51.501364, lng: -0.14189 }
//      },{
//        name: "Emirates Stadium",
//        position: { lat: 51.5548918, lng: -0.1106267 }
//      }]
//
// }
//
// function Gmap (){
//     return {
//       restrict: 'E',
//       replace: true,
//       template: '<div class="google-map"></div>',
//       scope: {
//         center:'=', //the equals means its expecting an object from the controller
//         markers: '='
//       },
//       link: function (scope, $element, attr){
//
//         if(!scope.center) throw new Error ("You must provide a center for your map directive");
//
//         console.log(scope.center);
//
//          var map = new google.maps.Map($element[0], {
//           center: scope.center,
//           zoom: 10
//         });
//
//         if (scope.markers){
//           scope.markers.forEach(function(marker){
//             new google.maps.Marker({
//               position: marker.position,
//               map: map,
//               animation: google.maps.Animation.BOUNCE
//             });
//           })
//         }
//       }
//     }
//   }
