var IndexServer = {};

var IndexRoutes = function (server, middleware) {
	server.get('/', middleware.homePage);
	server.get('/login', middleware.login);
	server.all('*', middleware.defaultTag);
	server.get('*', middleware.notFound);
};

IndexServer.init = function (server, middleware) {
	// TODO debug statement
	return new IndexRoutes(server, middleware);
};

module.exports = IndexServer;
