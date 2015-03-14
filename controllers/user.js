var mongoose = require('mongoose');
var User = mongoose.model('User');

var UserController = function () {};

UserController.findAll = function (callback) {
  User.findAll(function (err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

UserController.create = function (user, callabck) {
  user = new User(user);

  user.save(function (err, user) {
    if (err) return callback(err);
    callback(err, user);
  });
};

UserController.findOneById = function (id, callback) {
  User.findById(id, function (err, user) {
    if (err) return callback(err);
    callback(err, user);
  });
};

UserController.findOneByUsername = function (username, callback) {
  User.find({ username: username }, function (err, user) {
    if (err) return callback(err);
    callback(err, user);
  });
};

UserController.update = function (id, user, callback) {
  User.findByIdAndUpdate(id, user, { new: true }, function (err, user) {
    if (err) return callback(err);
    callback(err, user);
  });
};

UserController.delete = function (id, callback) {
  User.findOneAndRemove(id, function (err) {
    if (err) return callback(err);
    callback(err);
  });
};

module.exports = UserController;
