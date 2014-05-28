// Return search page in html
exports.index = function(req, res) {
	res.render('page');
};	

// Return search results in json
exports.search = function(req, res) {
	var fakeDB = [
		{ id: 100, name: 'Item1', price: 300, quant: 40, company: 'Company1', infosource: 'source2' },
		{ id: 101, name: 'Item2', price: 400, quant: 40, company: 'Company2', infosource: 'source3' },
		{ id: 102, name: 'Item3', price: 200, quant: 30, company: 'Company1', infosource: 'source3' },
		{ id: 103, name: 'Item6', price: 100, quant: 20, company: 'Company3', infosource: 'source3' },
		{ id: 104, name: 'Item3', price: 330, quant: 10, company: 'Company1', infosource: 'source5' },
		{ id: 105, name: 'Item9', price: 200, quant: 90, company: 'Company4', infosource: 'source3' },
		{ id: 106, name: 'Item1', price: 900, quant: 70, company: 'Company1', infosource: 'source4' },
		{ id: 107, name: 'Item3', price: 350, quant: 50, company: 'Company6', infosource: 'source3' },
		{ id: 108, name: 'Item2', price: 105, quant: 40, company: 'Company1', infosource: 'source2' },
		{ id: 109, name: 'Item5', price: 450, quant: 30, company: 'Company8', infosource: 'source3' },
		{ id: 110, name: 'Item9', price: 120, quant: 20, company: 'Company1', infosource: 'source1' },
	];
	
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
	res.json(fakeDB);
};
