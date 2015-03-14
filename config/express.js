var express      = require('express');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var flash        = require('connect-flash');
var session      = require('express-session');
var favicon      = require('serve-favicon');
var path         = require('path');

module.exports = function (app, passport) {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(require('less-middleware')(path.join(__dirname, '..', 'public')));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(session({ secret: 'recipes', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
};
