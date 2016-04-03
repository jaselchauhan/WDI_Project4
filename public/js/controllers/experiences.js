angular.module('wdiproject4')
  .constant('API_URL', 'http://localhost:3000/experiences/')
  .constant('API_KEY_WEATHER', '87ca65f966e5c408abfc6d84b66d676f')
  .controller('ExperiencesController', ExperiencesController);

ExperiencesController.$inject = ['$http', '$state', 'API_URL'];

function ExperiencesController($http, $state, API_URL) {

  var self = this;

  //think i need to add ng-model from form into queryData.
  this.queryData = {
    //
    // "city": "London",
    // "start": "2016-05-05T19:00:00Z",
    // "end": "2016-05-05T19:00:00Z"
  };

  this.all = {};
  this.weather = {};
  this.selectedExperience = {};


  self.getExperiences = function () {
    $http
      .post(API_URL, self.queryData)
      .then(function(res) {
        self.all = res.data;
        console.log("function fired,");
        console.log(res.data);
      })
  }

  self.getWeather = function () {

    var lat = 51.515;
    var lon = 0.0722;
    var cnt = 1;
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=' + cnt + '&APPID=87ca65f966e5c408abfc6d84b66d676f';
    $http
      .get(url)
      .then(function(res){
        self.weather = res
        console.log(res);
      })
  }

self.selectExperience = function (experience){
  self.selectedExperience = experience;
  $state.go('experience')
}


  // getExperiences();

}









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
