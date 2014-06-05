var request = require('supertest'),
	http = require('http'),
	should = require('chai').should(),
	ExpressWorker = process.env.CODE_COV ? require(process.env.COV_PATH + '/app.js') : require('./../../lib/app.js');

/*jshint unused: false*/

describe('Express App', function() {

	it('should be have setup method', function() {
		ExpressWorker.should.be.have.property('setup');
		ExpressWorker.setup.should.be.a('function');
	});

	it('should be have run method', function() {
		ExpressWorker.should.be.have.property('run');
		ExpressWorker.run.should.be.a('function');
	});

	it('run should return http server', function(done) {
		var app = ExpressWorker.run();
		app.should.be.an.instanceOf(http.Server);
		app.close(done);
	});
	
	it('should return something from real datasource', function(done) {
		var app = ExpressWorker.run();
		request(app)
		.get('/search?q=' + JSON.stringify('1'))
		.expect(200, function() {
		   app.close(done);
		});
	});
});
