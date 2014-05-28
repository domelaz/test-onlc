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
	// make async request to db
	
	// send it back
	res.json(req.query.q);
};
