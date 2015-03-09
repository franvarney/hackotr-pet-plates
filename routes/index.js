var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipes');

router.all('*', function(req, res, next){
	Recipe.find({ tags: "Peanut Butter" }, function(err, recipe) {
		if (err) return (err);
	  res.locals.sidebarRecipes = recipe;
	  next();
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Recipe.find({}, function(err, recipes) {
			res.render('index', { title: 'Home', recipes: recipes })
	});
});

router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') }); 
});

module.exports = router;
