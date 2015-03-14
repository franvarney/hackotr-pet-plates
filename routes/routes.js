var Routes = {};

Routes.init = function (server, controllers) {
  Routes.admin = require('./admin').init(server, controllers.admin);
  Routes.recipes = require('./recipes').init(server, controllers.recipes);
  Routes.users = require('./users').init(server, controllers.users);
  Routes.index = require('./index').init(server, controllers.index);
};

module.exports = Routes;
