var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Recipe = require('../models/recipes');
var multiparty = require("multiparty");

/* GET recipes page. */
router.get('/', function(req, res, next) {
  res.render('recipes/index', { title: 'Express' });
});

/* GET new recipe page. */
router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('recipes/new', { title: 'New Recipe' });
});

/* POST new recipe page. */
router.post('/new', isLoggedIn, function(req, res, next) {
  var newRecipe = new Recipe();
  var form = new multiparty.Form({ 
      maxFieldSize: 8192, 
      maxFields: 50, 
      autoFiles: true, 
      uploadDir: './public/uploads/recipes' 
  });
  form.on("part", function(part) {
    part.resume();
  });
  form.on("file", function(name, file) {
    if(name === null) {
      file.resume();
    }
    if(name !== null) {
      var image = (file.originalFilename).split('.');
      var pathParts = (file.path).split('\\');
      var newImage = pathParts[3].split('.');
      newRecipe.image.name.original = image[0];
      newRecipe.image.name.new = newImage[0];
      newRecipe.image.extension = image[1];
      newRecipe.image.mime = file.headers['content-type'];
      console.log(file.path);
    }
  });
  form.on("field", function(name, value) {
    if (name == 'title') {
      newRecipe.title = value;
      var url = ((value).replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")).toLowerCase();
      newRecipe.url = url.replace(/ /g, '-');
    }
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
      for(tag in tags) {
       newRecipe.tags.push(tags[tag]);
      };
    }
  });
  form.on("close", function() {
    newRecipe.username = req.user.username;
    console.log(newRecipe);
    newRecipe.save(function (err) {
      console.log("err",err);
      if (err) return err;
      res.redirect('/recipes/' + newRecipe.url);
    });
  });
  form.parse(req);
	// var ingredients = req.body.ingredients;
	// var directions = req.body.directions;
	// var url = ((req.body.title).replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")).toLowerCase();
	// var tags = (req.body.tags).replace(' ','');

	// var newRecipe = new Recipe();
 //  console.log(req.user.username);
 //  newRecipe.username = req.user.username;
	// newRecipe.title = req.body.title;
	// newRecipe.url = url.replace(/ /g, '-');
	// newRecipe.details.prep_time = req.body.prep_time;
	// newRecipe.details.cook_time = req.body.cook_time;
	// newRecipe.details.servings = req.body.servings;
 //  // TODO: needs conditional that checks for only one ingredient
 //  for(ingredient in ingredients) {
 //  	newRecipe.ingredients.push(ingredients[ingredient]);
 //  };
 //  // TODO: needs conditional that checks for only one direction
 //  for(direction in directions) {
 //  	newRecipe.directions.push(directions[direction]);
 //  };
 //  newRecipe.type = req.body.type;
 //  tags = tags.split(',');
 //  for(tag in tags) {
 //  	newRecipe.tags.push(tags[tag]);
 //  };
 //  newRecipe.save(function (err) {
 //    console.log("err",err);
	//   if (err) return err;
	//   res.redirect('/recipes/' + newRecipe.url);
 //  });
});

/* GET recipe page. */
router.get('/:recipe', function(req, res, next) {
	Recipe.findOne({ url: req.params.recipe }, function(err, recipe) {
    if (err) return (err);
    res.render('recipes/show', { title: "Needs title", recipe: recipe });
	});
});

/* GET recipe edit page */
router.get('/:recipe/edit', isLoggedIn, function(req, res, next) {
  Recipe.findOne({ url: req.params.recipe }, function(err, recipe) {
    if (err) return (err);
    res.render('recipes/edit', { title: "Needs title", recipe: recipe });
  });
});

/* PUT recipe */
router.put('/:recipe', isLoggedIn, function(req, res, next) {
  Recipe.findOne({ url: req.params.recipe }, function(err, recipe) {
    if (err) return (err);
    res.redirect('/' + req.params.recipe)
  });
});

/* DELETE recipe */
router.delete('/:recipe', isLoggedIn, function(req, res, next) {
  Recipe.findOne({ url: req.params.recipe }, function(err, recipe) {
    if (err) return (err);
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;
