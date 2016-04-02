var mongoose = require('mongoose');
// var Experience = require('../models/experience');
// var db = require('./database');
var request = require('request-promise');
// var Promise = require('bluebird');

// mongoose.Promise = Promise;
// mongoose.connect(db.uri);
//
// Experience.collection.drop();
//
// Experience.create([{
//   capacity: 102453,
//   url: "url for venue goes here",
//   venueId: "1",
//   lat:51.5117,
//   lng: -0.1275
// },{
//   capacity: 233,
//   url: "url for venue goes here",
//   venueId: "2",
//   lat:51.5211,
//   lng: -0.0713
// },{
//   capacity: 21233,
//   url: "url for venue goes here",
//   venueId: "3",
//   lat:51.5423,
//   lng: -0.0026
// }], function(err, experiences) {
//   if(err) console.error(err);
//   else console.log(experiences);
//   mongoose.connection.close();
// });


var token = 'ZBDVA46PN5NPGCAE772H';
var experiencesURL = "https://www.eventbriteapi.com/v3/events/search/"

// // Experience.collection.drop();
// //
// // function getDataFromRes(res) {
// //   var experiences = JSON.parse(res);
// //   var data = experiences.results.map(function(experiences) {
// //     return {
// //       capacity: experiences.capacity,
// //       url: experiences.url,
// //       venueId: experiences.venue_id
// //     }
// //   });
// //
// //   return data;
// // }
// //
// // request(experiencesURL)
// //   .then(function(res) {
// //     return Experience.create(getDataFromRes(res));
// //   })
// //   .catch(function(err) {
// //     console.error("Oops, something went wrong!", err);
// //   })
// //   .finally(function() {
// //     mongoose.connection.close();
// //   });
// //
//
//
//
//

// https://www.eventbriteapi.com/v3/events/search/?token=ZBDVA46PN5NPGCAE772H&q=festival&venue.city=London&start_date.range_start=2016-04-04T19:00:00Z&start_date.range_end=2016-04-05T00:00:00Z

  var options = {
      uri: experiencesURL,
      qs: {
          token: token, // -> uri + '?access_token=xxxxx%20xxxxx'
          // expand: "venue",
          q:"festival",
          "venue.city": "London",
          'start_date.range_start': "2016-04-05T13:00:00Z",
          'start_date.range_end': "2016-04-05T23:00:00Z"

      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };

  request(options)
      .then(function (events) {
          console.log('User has %d events', events.length);
          console.log(events);
      })
      .catch(function (err) {
          // API call failed...
          console.error("this didn't work");
      })
      .finally(function() {
          mongoose.connection.close();
        });
