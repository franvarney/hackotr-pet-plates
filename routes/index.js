var IndexServer = {};

var IndexRoutes = function (server, middleware) {
	server.get('/', middleware.homePage);
	server.get('/login', middleware.login);
	server.get('/logout', middleware.logout);
	server.all('*', middleware.defaultTag);
	server.get('*', middleware.notFound);
};

IndexServer.init = function (server, middleware) {
	return new IndexRoutes(server, middleware);
};

module.exports = IndexServer;
