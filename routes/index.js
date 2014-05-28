// Return search page in html
exports.index = function(req, res) {
	res.render('page');
};	

// Return search results in json
exports.search = function(req, res) {
	res.send(500);
};
