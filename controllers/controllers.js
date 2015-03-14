var Controllers = {};

Controllers.init = function () {
  Controllers.recipe = require('./recipe');
  Controllers.user = require('./user');
};

module.exports = Controllers;
