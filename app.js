var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var routes = require('./config/routes');

mongoose.connect('mongodb://localhost:27017/wdiproject4');

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));


//do i not need to pass a '/url' parameter before routes?
app.use(routes);

app.listen(3000);
