var express    = require('express');
var router     = express.Router();
var mongoose   = require('mongoose');
var User       = mongoose.model('User');
var Recipe     = mongoose.model('Recipe');
var multiparty = require('multiparty');
var async      = require('async');

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
		    if (err) return (err);
		    callback(null, user, recipes);
			});
	  }], function (err, user, recipes) {
	  	res.render('users/show', { title: "Needs title", userAccount: user, userRecipes: recipes});
	  }
	);
});


module.exports = router;
