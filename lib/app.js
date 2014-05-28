
var express = require('express'),
	http = require('http'),
	routes = require('../routes'),
	path = require('path');

var exp = express();

var ExpressWorker = {};

ExpressWorker.setup = function() {
	exp.set('port', process.env.PORT || 3000);
	exp.set('views', __dirname + '/../views');
	exp.set('view engine', 'jade');
	exp.use(express.static(path.join(__dirname, '../public')));
	// development only
	if ('development' === exp.get('env')) {
		exp.use(express.errorHandler());
	}
};

ExpressWorker.run = function() {
	this.setup();
	return http.createServer(exp).listen(exp.get('port'), function(){
		console.log('Express server listening on port ' + exp.get('port'));
	});
};

module.exports = exports = ExpressWorker;

ExpressWorker.run();
