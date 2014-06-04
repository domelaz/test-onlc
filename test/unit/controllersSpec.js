describe('Controllers', function() {
	beforeEach(module('search'));
	describe('SearchForm controller', function() {
		it('should contain empty searchQuery property', inject(function($controller) {
			var scope = {};
			$controller('SearchForm', { $scope: scope });
			/*jshint expr: true*/
			expect(scope.searchQuery).to.be.empty;
		}));
	});
});
