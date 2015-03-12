var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Recipe = require('../models/recipes');

/* GET admin users index page. */
router.get('/users', function(req, res, next) {
	User.find({}, function(err, users) {
		res.render('admin/users/index', { title: 'Admin - Users', users: users })
	});
});

/* GET admin users edit page. */
router.get('/users/:username/edit', function(req, res, next) {
	User.findOne({ username: req.params.username }, function(err, user) {
		res.render('admin/users/edit', { title: 'Admin - Edit User', user: user })
	});
});

//TODO Add middle to check for user authentication and isAdmin boolean

module.exports = router;