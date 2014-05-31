// @todo inject dependency
var mysql = require('mysql');

// Return search page in html
exports.index = function(req, res) {
	res.render('page');
};	

// Return search results in json
exports.search = function(req, res) {

	// is search param present
	if (typeof(req.query.q) === 'undefined') {
		res.send(400); // return 'Bad request'
		return;
	}
	// check content/type === json
	// parse json in try/catch
	var parcel;
	try {
		parcel = JSON.parse(req.query.q);
	} catch (e) {
		res.send(400); // return 'Bad request'
		return;
	}
	
	//
	// @todo Гипотеза: искать не в базе, а в заранее созданом индексе.
	// К примеру, запросы отправлять в sphinx, а из mysql тянуть результаты по мере необходимости.
	//

	// @todo use pool
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'onlc',
		password: 'xxxxxx',
		database: 'onlcview'
	});

	var param = connection.escape('%' + parcel + '%');

	// Build SQL query like this one:
	// SELECT * FROM dataview WHERE name LIKE '%foo%' OR company LIKE '%foo%' OR id LIKE '%foo%';
	var searchFields = ['name','company','id'];
	var were = searchFields.join(" LIKE "+param+" OR ") + " LIKE "+param+";";
	var sqlcmd = "SELECT * FROM dataview WHERE " + were;

	// @todo pager	
	connection.query(sqlcmd, [parcel], function(err,result) {
        if (err) {
			res.send(500);
			connection.end();
			return;
		}
		res.json(result);
		connection.end();
	});
};
