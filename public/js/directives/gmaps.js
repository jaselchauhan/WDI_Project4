angular.module('wdiproject4')
  .controller('MapController', MapController)
  // .controller('ExperiencesController', ExperiencesController)
  .directive('map', Gmap);

MapController.$inject = ['location'];
function MapController(location) {
  //set map center to be on venue location
  var pos = location.get();

  this.mapCenter = {

    lat: pos.latitude,
    lng: pos.longitude

  };
  //set map marker to be venue location
  this.mapMarkers = [{
    name: "Venue Location",
    position: {
      lat: pos.latitude,
      lng: pos.longitude
    }
  }]
}

function Gmap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=', //the equals means its expecting an object from the controller
      markers: '='
    },
    link: function(scope, $element, attr) {

      if (!scope.center) throw new Error("You must provide a center for your map directive");

      var map = new google.maps.Map($element[0], {
        center: scope.center,
        zoom: 11,
        styles: [{
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#444444"
          }]
        }, {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{
            "color": "#f2f2f2"
          }]
        }, {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{
            "saturation": -100
          }, {
            "lightness": 45
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{
            "color": "#e66e3b"
          }, {
            "visibility": "on"
          }]
        }]
      });

      if (scope.markers) {
        scope.markers.forEach(function(marker) {
          new google.maps.Marker({
            position: marker.position,
            map: map,
            animation: google.maps.Animation.DROP
          });
        })
      }
    }
  }
}
