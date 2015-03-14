var userController = require('./../controllers/user');
var recipeController = require('./../controllers/recipe');
var async = require('async');
var UserMiddleware = {};

var User = function (server) {
  if (server) {
    require('../routes/user').init(server, User);
  } else {
    throw new Error('SERVER_NOT_INITIALIZED');
  }
};

UserMiddleware.init = function (server) {
  return new User(server);
};

User.getOne = function (req, res) {
  async.series([
    function (callback) {
      userController.findOneByUsername(req.params.user, callback);
    },
    function (callback) {
      recipeController.findByUsername(req.params.user, callback);
    }
  ], function (err, results) {
    res.render('users/show', {
      title: 'Needs title',
      userAccount: results[0],
      userRecipes: results[1]
    });
  });
};

module.exports = UserMiddleware;
