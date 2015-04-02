// load appropriate config file
var env = process.env.NODE_ENV || 'dev';
var config = require('./config.' + env)

// connect to Mongo using appropriate connection string
var mongoose = require('mongoose');
mongoose.connect(config.mongo.connectionString, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// usual Express components
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes/todo.js handles REST calls for todo API.
var todo = require('./routes/todo');
app.use('/todo', todo);

// should perhaps contain a more general handler for non /todo calls
app.get('/', function( req, res) {
  var msg = [{description : 'Write a todo list', done : false}];
  res.send(msg);
});

// it's showtime!
var PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
