var path             = require('path');
var util             = require('util');
var recipeController = require('./../controllers/recipe');
var multiparty       = require('multiparty');
var RecipeMiddleware = {};

var Recipe = function (server) {
  if (server) {
    require('../routes/recipe').init(server, Recipe);
  } else {
    throw new Error('SERVER_NOT_INITIALIZED');
  }
};

RecipeMiddleware.init = function (server) {
  return new Recipe(server);
};

Recipe.index = function (req, res) {
  res.render('recipes/index', {
    title: 'Recipes'
  });
};

Recipe.getNewRecipe = function (req, res) {
  res.render('recipes/new', {
    title: 'New Recipe'
  });
};

Recipe.create = function (req, res) {
  var newRecipe = {};
  var form = new multiparty.Form({
      maxFieldSize: 8192,
      maxFields: 50,
      autoFiles: true,
      // uploadDir: './public/uploads/recipes'
      uploadDir: process.config.multiparty_upload_dir
  });
  form.on("part", function(part) {
    part.resume();
  });
  form.on("file", function(name, file) {
    if(file === null) {
      file.resume();
    }
    if(file !== null) {
      var image = (file.originalFilename).split('.');
      var pathParts = (file.path).split(path.sep);
      var newImage = pathParts[3].split('.');
      newRecipe.image.name.original = image[0];
      newRecipe.image.name.new = newImage[0];
      newRecipe.image.extension = image[1];
      newRecipe.image.mime = file.headers['content-type'];
    }
  });
  form.on("field", function(name, value) {
    if (name == 'title') {
      newRecipe.title = value;
      var url = ((value).replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")).toLowerCase();
      newRecipe.url = url.replace(/ /g, '-');
    }
    if (name == 'description') newRecipe.description = value;
    if (name == 'prep_time') newRecipe.details.prep_time = value;
    if (name == 'cook_time') newRecipe.details.cook_time = value;
    if (name == 'servings') newRecipe.details.servings = value;
    if (name == 'ingredients') {
      newRecipe.ingredients.push(value);
    }
    if (name == 'directions') {
      newRecipe.directions.push(value);
    }
    if (name == 'type') newRecipe.type = value;
    if (name == 'tags') {
      var tags = (value).replace(' ','');
      tags = tags.split(',');
      for(var tag in tags) {
       newRecipe.tags.push(tags[tag]);
      }
    }
  });
  form.on("close", function() {
    newRecipe.user_id = req.user._id;
    recipeController.create(newRecipe, function (err, recipe) {
      res.redirect(util.format('/recipes/%s', newRecipe.url));
    });
  });
  form.parse(req);
};

Recipe.getOne = function (req, res) {
  recipeController.findOneByUrlAndPopulate(req.params.recipe, function (err, recipe) {
    res.render('recipes/edit', {
      title: 'Edit Recipe',
      recipe: recipe
    });
  });
};

Recipe.update = function (req, res) {
  recipeController.findOneByUrl(req.params.recipe, function (err, recpie) {
    res.redirect(util.format('/recipe/%s', recipe.url));
  });
};

Recipe.delete = function (req, res) {
  recipeController.findOneByUrl(req.params.recipe, function (err, recpie) {
    res.redirect('/');
  });
};

module.exports = RecipeMiddleware;
