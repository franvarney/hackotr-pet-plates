var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Route files
var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var recipes = require('./routes/recipes');

var app = express();
var p = require('./config/passport')(passport);

// Database connection
// var config = require('./config/' + process.env.NODE_ENV);
var config = require('./config/' + process.env.NODE_ENV);
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
  console.log("DB Connected");
});

require('./config/express')(app, passport);


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
  //res.locals.user = req.isAuthenticated();
  next();
});

app.use('/', routes);
app.use('/admin', admin);
app.use('/users', users);
app.use('/recipes', recipes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
