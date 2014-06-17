var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('onlc search', function() {
	beforeEach(function() {
		browser.get('index.html');
	});
	it('should be some search results', function() {
		var searchForm = element(by.name('search-query'));
		searchForm.sendKeys('ярмарка');
		var searhcResults = element.all(by.repeater('result in result.results'));
		expect(searhcResults.count()).to.eventually.equal(1);
	});
});
