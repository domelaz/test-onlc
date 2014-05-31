/**
 * Return search page in html
 * 
 * Until file public/index.html exists, this method is never been called
 */
exports.index = function(req, res) {
	res.render('page');
};	

/**
 * Return search results in json format
 *
 * Expects search phrase in GET 'q' parameter;
 * Response to client with json encoded array;
 * Throws 400 'Bad Request' and 500 'Internal Server Error' if shit happened;
 */
exports.search = function(req, res) {

	// is search parameter present in GET?
	if (typeof(req.query.q) === 'undefined') {
		res.send(400);
		return;
	}
	
	// try convert GET request 'q' parameter to json
	var parcel;
	try {
		parcel = JSON.parse(req.query.q);
	} catch (e) {
		res.send(400);
		return;
	}

	// fetch search results from underlying datasource and pipe them to client
	req.model.fetch('searchResults', { parcel: parcel }, function(err, result) {
		if (err) { res.send(500); return; }
		res.json(result);
	});
};
