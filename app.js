var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var routes = require('./config/routes');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/wdiproject4');

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//do i not need to pass a '/url' parameter before routes?
app.use(routes);

app.listen(3000);
