var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var routes = require('./config/routes');
var cors = require('cors');


mongoose.connect('mongodb://localhost:27017/wdiproject4');



app.use(cors());

//do i not need to pass a '/url' parameter before routes?
app.use(routes);

app.listen(3000);
