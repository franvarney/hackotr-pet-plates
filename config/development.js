var util = require('util');
var path = require('path');

module.exports = {
  db  : process.env.DB || 'mongodb://localhost/pet-plates-dev',
  url : util.format('http://localhost:%s', process.env.PORT),
  multiparty_upload_dir: process.env.MULTIPARTY_UPLOAD_DIR || path.resolve(__dirname, '..', 'public', 'uploads', 'recipes')
};
