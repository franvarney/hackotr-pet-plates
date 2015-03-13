var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var fsUtil = require('./helpers/fs');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Database connection
var config = require('./config/' + process.env.NODE_ENV);
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
  console.log("DB Connected");
});

require('./config/express')(app, passport);

// Bootstrap models
var models_path = __dirname + '/models';
fsUtil.walkRequire(models_path);

require('./config/passport')(passport);

app.post('/local-signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

app.post('/local-login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

app.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.use(function (req, res, next) {
  if(req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

// Route files
var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var recipes = require('./routes/recipes');

app.use('/', routes);
app.use('/admin', admin);
app.use('/users', users);
app.use('/recipes', recipes);

module.exports = app;
