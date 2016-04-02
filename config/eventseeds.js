var mongoose = require('mongoose');
var Experience = require('../models/experience');
var db = require('./database');

var Promise = require('bluebird');

mongoose.Promise = Promise;
mongoose.connect(db.uri);

Experience.collection.drop();

var token = 'FG7JYAXU2VI4EOUHBWGN';
var url = 'https://www.eventbriteapi.com/v3/events/search/?token='+token+'&expand=venue';

Experience.create([{
  capacity: 102453,
  url: "url for venue goes here",
  venueId: "1",
  lat:51.5117,
  lng: -0.1275
},{
  capacity: 233,
  url: "url for venue goes here",
  venueId: "2",
  lat:51.5211,
  lng: -0.0713
},{
  capacity: 21233,
  url: "url for venue goes here",
  venueId: "3",
  lat:51.5423,
  lng: -0.0026
}], function(err, experiences) {
  if(err) console.error(err);
  else console.log(experiences);
  mongoose.connection.close();
});
