var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Recipe = require('../models/recipes');
var multiparty = require('multiparty');
var async = require('async');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user page. */
router.get('/:user', function(req, res, next) {
	async.waterfall([
	  function(callback){
	    User.findOne({ username: req.params.user }, function(err, user) {
		    if (err) return (err);
		    callback(null, user);
			});
	  },
	  function(user, callback){      
	    Recipe.find({ username: req.params.user }, function(err, recipes) {
		    if (err) return (recipes);
		    callback(null, user, recipes);
			});
	  }], function (err, user, recipes) {
	  	console.log(recipes);
	  	res.render('users/show', { title: "Needs title", userAccount: user, userRecipes: recipes});   
	  }
	);
});


module.exports = router;
