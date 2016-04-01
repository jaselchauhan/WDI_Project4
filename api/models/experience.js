var mongoose = require('mongoose');

var experienceSchema = mongoose.Schema({
  capacity: Number,
  url:    String,
  venueId: String
})

module.exports = mongoose.model('Experience', experienceSchema);
