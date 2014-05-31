//
// @todo Гипотеза: искать не в базе, а в заранее созданом индексе.
// К примеру, запросы отправлять в sphinx, а из mysql тянуть результаты по мере необходимости.
//

// Inject mysql connection pool as express middleware

var mysql = require('mysql'),
	pool;

/**
 * @todo Here executed hardcoded 'SELECT * ...' on mysql
 */
function searchResults(query, callback) {
	var parcel = query.parcel;
	var param = pool.escape('%' + parcel + '%');
	
	// Build SQL query like this one:
	// SELECT * FROM dataview WHERE name LIKE '%foo%' OR company LIKE '%foo%' OR id LIKE '%foo%';
	// @todo pager: SELECT ... LIMIT n,n+m;
	var searchFields = ['name','company','id'];
	var were = searchFields.join(" LIKE "+param+" OR ") + " LIKE "+param+";";
	var sqlcmd = "SELECT * FROM dataview WHERE " + were;
	
	pool.query(sqlcmd, [parcel], callback);
}

module.exports = function(config) {
	pool = mysql.createPool(config);
	return function(req, res, next) {
		req.model = {
			fetch : function(method, args, callback) {
				// @todo Now we have only one method, so call its directly
				searchResults(args, callback);
			}
		};
		next();
	};
};
