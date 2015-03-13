var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var User       = mongoose.model('User');
var Recipe     = mongoose.model('Recipe');
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
    if(file === null) {
      file.resume();
    }
    if(file !== null) {
      var image = (file.originalFilename).split('.');
      var pathParts = ((file.path).replace('\\','/')).split('/'); //TODO Fix dis shit
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
      for(tag in tags) {
       newRecipe.tags.push(tags[tag]);
      };
    }
  });
  form.on("close", function() {
    newRecipe.user_id = req.user._id;
    newRecipe.save(function (err) {
      if (err) return err;
      res.redirect('/recipes/' + newRecipe.url);
    });
  });
  form.parse(req);
});

/* GET recipe page. */
router.get('/:recipe', function(req, res, next) {
  Recipe.findOne({ url: req.params.recipe }).populate('user_id').exec( function(err, recipe) {
    if (err) return (err);
    res.render('recipes/show', { title: 'View Recipe', recipe: recipe })
  });
});

/* GET recipe edit page */
router.get('/:recipe/edit', isLoggedIn, function(req, res, next) {
  Recipe.findOne({ url: req.params.recipe }, function(err, recipe) {
    if (err) return (err);
    res.render('recipes/edit', { title: 'Edit Recipe', recipe: recipe });
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
    res.redirect('/login');
}

module.exports = router;
