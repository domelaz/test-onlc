var request = require('supertest'),
	express = require('express'),
	routes = process.env.CODE_COV ? require('./../../code-cov/index.js') : require('./../../routes/index.js');

describe('Search Resluts', function() {
	
	var app = express();

	app.get('/search', routes.search);
	
	it('rejects bad parameter', function(done) {
		request(app)
		.get('/search?badParam=bad')
		.expect(400, done);
	});
	
	it('rejects non-json data', function(done) {
		request(app)
		.get('/search?q=notAJson')
		.expect(400, done);
	});
});
