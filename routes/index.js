var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var Recipe      = mongoose.model('Recipe');
var IndexServer = {};

var IndexRoutes = function (server, controllers) {
	server.get('/', controller.homePage);
	server.get('/login', controller.login);
};

IndexServer.init = function (server, controllers) {
	// TODO debug statement
	return new IndexRoutes(server, controllers);
};

module.exports = IndexServer;

router.all('*', function(req, res, next){
	Recipe.find({ tags: "Peanut Butter" }, function(err, recipe) {
		if (err) return (err);
	  res.locals.sidebarRecipes = recipe;
	  next();
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Recipe.find().populate('user_id').exec( function(err, recipes) {
		res.render('index', { title: 'Home', recipes: recipes });
	});
});

router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

module.exports = router;
