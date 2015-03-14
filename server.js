var express = require('express');
var fsUtil = require('./helpers/fs');
var mongoose = require('mongoose');
var passport = require('passport');
app = express();

// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Get config file
process.config = require('./config/' + process.env.NODE_ENV);

// Connect to db
mongoose.connect(process.config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
  console.log("DB Connected");
});

// Bootstrap models
var models_path = __dirname + '/models';
fsUtil.walkRequire(models_path);

// Setup passport
require('./config/passport')(passport);

// Setup express
require('./config/express')(app, passport);

// Initialize routes
require('./middlewares/middlewares').init(app);
// require('./routes/routes').init(app /*,controllers*/);

// Start application
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  console.log('Expres server listening on port ' + server.address().port);
});
