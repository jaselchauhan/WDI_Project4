var mongoose = require('mongoose');
var User = require('../models/user');
var db = require('./database');

var Promise = require('bluebird');

mongoose.Promise = Promise;
mongoose.connect(db.uri);

User.collection.drop();

User.create([{
  username: "cartman",
  email: "cartman@cartman.com",
  password: "password",
  picture: "http://cdn.pcwallart.com/images/south-park-cartman-angry-wallpaper-1.jpg"
},{
  username: "stan",
  email: "stan@stan.com",
  password: "password",
  picture: "http://vignette4.wikia.nocookie.net/southpark/images/3/3b/Char_stan10.jpg/revision/latest?cb=20150517083227"
},{
  username: "kyle",
  email: "kyle@kyle.com",
  password: "password",
  picture: "http://orig00.deviantart.net/d62f/f/2010/018/7/3/south_park_kyle_broflovski_by_mariokartracer10.jpg"
}], function(err, users) {
  if(err) console.error(err);
  else console.log(users);
  mongoose.connection.close();
});
