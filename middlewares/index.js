var recipeController = require('./../controllers/recipe');
var IndexMiddleware = {};

var Index = function (server) {
  if (server) {
    require('../routes/index').init(server, Index);
  } else {
    throw new Error('SERVER_NOT_INITIALIZED');
  }
};

IndexMiddleware.init = function (server) {
  return new Index(server);
};

Index.defaultTag = function (req, res, next) {
  var tag = req.query.tag || 'Peanut Butter';
  recipeController.findByTag(tag, function (err, recipe) {
    if (err) {
      res.locals.sidebarRecipes = 'Sorry. There was an error';
      return next();
    }
    res.locals.sidebarRecipes = recipe;
    next();
  });
};

Index.homePage = function (req, res) {
  recipeController.getAndPopulate('user_id', function (err, recipes) {
    res.render('index', {
      title: 'Home',
      recipes: recipes
    });
  });
};

Index.login = function (req, res) {
  res.render('login', {
    message: req.flash('loginMessage')
  });
};

Index.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

Index.notFound = function (req, res) {
  res.send('That page doesnt exist');
};

module.exports = IndexMiddleware;
