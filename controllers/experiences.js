var Experience = require('../models/experience');
var request = require('request-promise');
var token = 'ZBDVA46PN5NPGCAE772H';
var sha1 = require('sha1');

var cache = {};

function experienceQuery(req, res) {

  var params = {
    "expand": "venue",
    "q": "festival",
    token: token,
    'venue.city': req.body.city,
    'start_date.range_start': req.body.start,
    'start_date.range_end': req.body.end
  };
  console.log("before api call made: ",params);

  var hash = sha1(params);

  if(cache[hash]) return res.status(200).json(cache[hash]);


//makes the GET request to the eventbrite api. To search for something
//first look at API for ur2l route to use and search terms then,
//test the url req'd in Insomnia, and then break down search query into
//the query string (params in this code), and pass ito the request function.
  request({
    url: "https://www.eventbriteapi.com/v3/events/search",
    qs: params,
    json: true
  })
  .then(function(response) {
    //the .events comes from looking at the api json object - there was also an object of metadata which
    //wasnt needed in this case so only events were targeted
    console.log("after api call has been made",params);
    // console.log(response);
    cache[hash] = response.events;
    // console.log(hash);
    return res.status(200).json(cache[hash]);
  });
}

module.exports = {
  query: experienceQuery
};


// https://www.eventbriteapi.com/v3/events/search/?token=ZBDVA46PN5NPGCAE772H&q=festival&venue.city=London&start_date.range_start=2016-04-04T19:00:00Z&start_date.range_end=2016-04-05T00:00:00Z
