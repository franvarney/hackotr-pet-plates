var auth         = require('./../helpers/authentication');
var RecipeServer = {};

var RecipeRoutes = function (server, middleware) {
  server.get('/recipe', middleware.index);
  server.get('/recipes/new', auth.isLoggedIn, middleware.getNewRecipe);
  server.post('/recipes/new', auth.isLoggedIn, middleware.create);
  server.get('/recipes/:recipe', middleware.getOne);
  server.put('/recipes/:recipe', auth.isLoggedIn, middleware.update);
  server.delete('/recipes/:recipe', auth.isLoggedIn, middleware.delete);
};

RecipeServer.init = function (server, middleware) {
  return new RecipeRoutes(server, middleware);
};

module.exports = RecipeServer;
