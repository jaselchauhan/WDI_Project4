angular.module('wdiproject4')
  .service('location', Location);

function Location() {
  var pos = { latitude: 0, longitude: 0 };

  return {
    set: function(position) {

      if(!position.latitude || !position.longitude) {
        throw new Error('please provide latitude and longitude');
      }

      pos.latitude = position.latitude;
      pos.longitude = position.longitude;
    },
    get: function() {
      return pos;
    }
  }
}
