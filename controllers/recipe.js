var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

var RecipeController = function () {};

RecipeController.findAll = function (callback) {
  Recipe.findAll(function (err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

RecipeController.findByTag = function (tag, callback) {
  Recipe.find({ tags: tag }, function (err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

RecipeController.findByUsername = function (username, callback) {
  Recipe.find({ username: username }, function (err, result) {
    if (err) return callback(err);
    callback(err, result);
  });
};

RecipeController.create = function (recipe, callabck) {
  recipe = new Recipe(recipe);

  recipe.save(function (err, recipe) {
    if (err) return callback(err);
    callback(err, recipe);
  });
};

RecipeController.findOneById = function (id, callback) {
  Recipe.findById(id, function (err, recipe) {
    if (err) return callback(err);
    callback(err, recipe);
  });
};

RecipeController.findOneByUrlAndPopulate = function (url, callback) {
  Recipe.findOne({ url: url }).populate('user_id').exec(function (err, recipe) {
    if (err) return callback(err);
    callback(err, recipe);
  });
};

RecipeController.findOneByUrl = function (url, callback) {
  Recipe.findOne({ url: url }, function (err, recipe) {
    if (err) return callback(err);
    callback(err, recipe);
  });
};

RecipeController.update = function (id, recipe, callback) {
  Recipe.findByIdAndUpdate(id, recipe, { new: true }, function (err, recipe) {
    if (err) return callback(err);
    callback(err, recipe);
  });
};

RecipeController.delete = function (id, callback) {
  Recipe.findOneAndRemove(id, function (err) {
    callback(err);
  });
};

RecipeController.getAndPopulate = function (tag, callback) {
  Recipe.find().populate(tag).exec(function (err, recipes) {
    if (err) return callback(err);
    callback(err, recipes);
  });
};
module.exports = RecipeController;
