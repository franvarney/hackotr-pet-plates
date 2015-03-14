var Middlewares = {};

Middlewares.init = function (server) {
  Middlewares.recipe = require('./recipe').init(server);
  Middlewares.user   = require('./user').init(server);
  Middlewares.index  = require('./index').init(server);
};

module.exports = Middlewares;
