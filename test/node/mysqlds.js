var request = require('supertest'),
	express = require('express'),
	mysql = require('mysql'),
	mysqlds = process.env.CODE_COV ? require('./../../code-cov/mysqlds.js') : require('./../../lib/mysqlds.js');

describe('Mysql Express Middleware', function() {

	beforeEach(function(done) {
		var fixture = 
		"USE `onlcview_test`; " +
		"DROP TABLE IF EXISTS `dataview`; " +
		"CREATE TABLE `dataview` (" +
		"`id` bigint(20) unsigned NOT NULL," +
		"`name` varchar(1024) DEFAULT NULL," +
		"`price` float DEFAULT NULL," +
		"`quant` int(11) DEFAULT NULL," +
		"`company` varchar(256) DEFAULT NULL," +
		"`infosource` varchar(64) DEFAULT NULL," +
		"PRIMARY KEY (`id`)," +
		"KEY `NAME` (`name`(255))," +
		"KEY `COMPANY` (`company`(255))" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8; " +
		"LOCK TABLES `dataview` WRITE; " +
		"INSERT INTO `dataview` VALUES (1,'p1',3.91,978,'c1','s1'),(2,'p2',67.02,554,'c2','s2'),(3,'p3',71.58,940,'c3','s3'); " +
		"UNLOCK TABLES;";
		var connection = mysql.createConnection({
			host: 'localhost',
			user: 'onlc',
			password: 'xxxxxx',
			multipleStatements: true // Disabled by default for security reasons
		});
		connection.query(fixture, function(err, result) {
			if (err) {
				console.error('fixture setup failed');
				done(err); }
			if (result.length === 6) {
				this.end();
				done();
			}
		});
	});

	var app = express();
	app.set('port', 3011);
	app.use(mysqlds({
		host: 'localhost',
		user: 'onlc',
		password: 'xxxxxx',
		database: 'onlcview_test'
	}));
	
	app.get('/search', function(req, res) {
		req.model.fetch('searchResults', { parcel: req.query.q }, function(err, result) {
			if (err) { res.send(500); }
			if (result.length === 3) {
				res.send(200);
			} else {
				res.send(500);
			}
		});
	});

	it('fetch data in middleware', function(done) {
		request(app)
		.get('/search?q=c')
		.expect(200, function() {
			done();
		});
	});
});
