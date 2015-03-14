var express = require('express');
var fsUtil = require('./helpers/fs');
var mongoose = require('mongoose');
var passport = require('passport');

// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Get config file
var config = require('./config/' + process.env.NODE_ENV);

// Connect to db
mongoose.connect(config.db + 'fjdkls');
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection Error:'));
// db.once('open', function() {
//   console.log("DB Connected");
// });

// Bootstrap models
var models_path = __dirname + '/models';
fsUtil.walkRequire(models_path);

// Setup passport
require('./config/passport')(passport);

// Setup express
app = express();
require('./config/express')(app);

// Initialize routes
// require('./routes/routes').init(app /*,controllers*/);
