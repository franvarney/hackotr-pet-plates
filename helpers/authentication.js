var Authentication = {};

Authentication.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = Authentication;
