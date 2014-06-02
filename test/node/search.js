var request = require('supertest'),
	express = require('./../../lib/app.js');

describe('Search Resluts', function() {
	
	var app = express.run();
	
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

	it('accept q parameter with json-encoded query', function(done) {
		var searchPhrase = JSON.stringify('search test');
		request(app)
		.get('/search?q=' + searchPhrase)
		.expect(200, done);
	});
});
