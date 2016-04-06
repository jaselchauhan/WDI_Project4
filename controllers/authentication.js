var request = require('request-promise');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/app');
var oauth = require('../config/oauth');

function eventbrite(req, res) {
  var access_token;

  var params = {
    code: req.body.code,
    client_secret: process.env.EVENTBRITE_SECRET_KEY,
    client_id: process.env.EVENTBRITE_API_KEY,
    grant_type: 'authorization_code'
  };

  request.post({
    url: oauth.eventbrite.accessTokenUrl,
    form: params,
    json: true
  })
  .then(function(response) {
    access_token = response.access_token;

    return request({
      url: oauth.eventbrite.profileUrl,
      headers: {
        Authorization: 'Bearer ' + access_token
      },
      json: true
    });
  })
  .then(function(profile) {
    return User.findOne({ eventbriteId: profile.id })
      .then(function(user) {
        if(user) {
          user.picture = user.picture || profile.image_id;
        }
        else {
          user = new User({
            eventbriteId: profile.id,
            name: profile.name,
            picture: profile.image_url
          });
        }
        return user.save();
      });
  })
  .then(function(user) {
    var payload = { _id: user._id, name: user.name, picture: user.picture };
    var token = jwt.sign(payload, config.secret, { expiresIn: '24h' });
    return res.send({ token: token, user: payload, eventbriteAccessToken: access_token });
  })
  .catch(function(err) {
    console.log(err);
    return res.status(500).send();
  });
}


function github(req, res){
  console.log("github called!");
  var params = {
    client_id: process.env.GITHUB_API_KEY,
    client_secret: process.env.GITHUB_API_SECRET,
    code: req.body.code,
  };
//make a request for an accessToken
  request.post({
    url: oauth.github.accessTokenUrl,
    qs: params,
    json: true
  })
  .then(function(response){
    console.log("res from github", response);
    // request returns access token
    // make a request for the users data (profile)
    return request.get({
      url: oauth.github.profileUrl + "?access_token=" + response.access_token,
      json: true,
      headers: {'User-Agent': 'Request-Promise'}
    });
  })
  .then(function(profile){
    console.log("profile", profile);
    //now we find or create a new user with these credentials
    return User.findOne({ email: profile.email})
      .then(function(user){
        if(user){
          user.githubId = profile.id;
          user.picture = user.picture || profile.avatar_url
        } else {
          user = new User({
            githubId : profile.id,
            name: profile.name,
            picture: profile.avatar_url,
            email: profile.email
          });
        }
        return user.save();
      })
  })
  .then(function(user){
    //finally lets send a token to the front end.
    var payload = { _id: user._id, name: user.name, picture: user.picture };
    var token = jwt.sign(payload, config.secret, { expiresIn: '24h'});
    return res.send({ token: token, user: payload});
  })
  .catch(function(err){
    console.log(err);
    return res.status(500).json(err);
  })
}

module.exports = {
  eventbrite: eventbrite,
  github: github
};
