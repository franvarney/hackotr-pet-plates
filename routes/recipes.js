var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipes');

/* GET recipes page. */
router.get('/', function(req, res, next) {
  res.render('recipes/index', { title: 'Express' });
});

/* GET new recipe page. */
router.get('/new', function(req, res, next) {
  res.render('recipes/new', { title: 'New Recipe' });
});

/* POST new recipe page. */
router.post('/new', function(req, res, next) {
	var ingredients = req.body.ingredients;
	var directions = req.body.directions;
	var url = ((req.body.title).replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")).toLowerCase();
	var tags = (req.body.tags).replace(' ','');

	var newRecipe = new Recipe();
  newRecipe.user_id = req.user._id;
	newRecipe.title = req.body.title;
	newRecipe.url = url.replace(/ /g, '-');
	newRecipe.details.prep_time = req.body.prep_time;
	newRecipe.details.cook_time = req.body.cook_time;
	newRecipe.details.servings = req.body.servings;
  // TODO: needs conditional that checks for only one ingredient
  for(ingredient in ingredients) {
  	newRecipe.ingredients.push(ingredients[ingredient]);
  };
  // TODO: needs conditional that checks for only one direction
  for(direction in directions) {
  	newRecipe.directions.push(directions[direction]);
  };
  newRecipe.type = req.body.type;
  tags = tags.split(',');
  for(tag in tags) {
  	newRecipe.tags.push(tags[tag]);
  };
  newRecipe.save(function (err) {
    console.log("err",err);
	  if (err) return err;
	  res.redirect('/recipes/' + newRecipe.url);
  });
});

/* GET recipe page. */
router.get('/:recipe', function(req, res, next) {
	Recipe.findOne({ url: req.params.recipe }, function(err, recipe) {
		if (err) return (err);
		res.render('recipes/show', { title: 'Express', recipe: recipe });
	});
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;