/*global expect*/
describe('Filters', function(){

	beforeEach(module('searchFilters'));

	describe('roubles', function() {

		it('should add " руб." after some value', inject(function(roublesFilter) {
			expect(roublesFilter('25')).to.be.equal('25 руб.');
		}));
	});
});
