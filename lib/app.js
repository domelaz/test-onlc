
var express = require('express'),
	http = require('http'),
	routes = process.env.CODE_COV ? require(process.env.COV_PATH + 'index.js') : require('../routes'),
	path = require('path'),
	compress = require('compression'),
	morgan = require('morgan'),
	mysqlds = require('./mysqlds.js');

var exp = express();

var ExpressWorker = {};

ExpressWorker.setup = function() {
	exp.use(compress());
	exp.set('port', process.env.PORT || 3000);
	exp.set('views', __dirname + '/../views');
	exp.set('view engine', 'jade');
	exp.use(mysqlds({
		host: 'localhost',
		user: 'onlc',
		password: 'xxxxxx',
		database: 'onlcview'
	}));
	exp.use(express.static(path.join(__dirname, '../public')));
	exp.use(morgan({ format: 'dev' }));
	// development only
	if ('development' === exp.get('env')) {
		//exp.use(express.errorHandler());
	}
	exp.get('/', routes.index);
	exp.get('/search', routes.search);
};

ExpressWorker.run = function() {
	this.setup();
	return http.createServer(exp).listen(exp.get('port'), function(){
		console.log('Express server listening on port ' + exp.get('port'));
	});
};

module.exports = exports = ExpressWorker;

// Run express if required directly from nodejs
if (require.main === module) {
	ExpressWorker.run();
}
