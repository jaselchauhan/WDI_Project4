var mongoose = require('mongoose');

var experienceSchema = mongoose.Schema({
  capacity: Number,
  url:    String,
  venueId: String,
  lat: Number,
  lng: Number
})

module.exports = mongoose.model('Experience', experienceSchema);
