var UserServer = {};

var UserRoutes = function (server, middleware) {
	server.get('/user/:user', middleware.getOne);
};

UserServer.init = function (server, middleware) {
	return new UserRoutes(server, middleware);
};

module.exports = UserServer;
