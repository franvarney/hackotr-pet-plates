var fs = require('fs');

/**
 * Walk the path defined requiring all of the files.
 * @param  {string} path path to directory
 */
module.exports.walkRequire = function(path) {
  var self = this;
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      self.walk(newPath);
    }
  });
};
