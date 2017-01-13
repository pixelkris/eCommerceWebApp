var express = require('express');         // Express Library
var morgan = require('morgan');           // Morgan middleware
var mongoose = require('mongoose');       // Mongoose library
var bodyParser = require('body-parser');  // BodyParser library
var ejs = require('ejs');                 // EJS library
var ejsMate = require('ejs-mate');        // EJS mate library
var portNumber = 3000;

// Note that User Schema is already being exported
var User = require('./models/user');
var app = express();

// Connect to MongoDB, please insert your password and username here for your own use
mongoose.connect('', function(err) {
  if (err) {
    console.log (err);
  } else {
    console.log("Connected to the database!");
  }
});

app.get('/', function(req, res) {
  res.render('home');
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.post('/create-user', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.password;
  user.email = req.email;

  user.save(function(err) {
    if (err) return next(err);
    res.json('Successfully created a new user!');
  })
});

// Server Validation Message
app.listen(portNumber, function(err){
  if (err) throw err;
  console.log("Server is runnign at port: " + portNumber);
});
