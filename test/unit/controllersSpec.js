/*jshint expr:true*/
/*global expect*/
describe('Controllers', function() {
	beforeEach(module('search'));
	describe('SearchForm controller', function() {
		
		var scope, ctrl, $httpBackend;
		
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('search?q=%22testResult%22').respond(
				['no matter']);
			scope = $rootScope.$new();
			ctrl = $controller('SearchForm', { $scope: scope });
		}));

		it('should success result', function() {
			expect(scope.data).to.be.undefined;
			ctrl.getResults('testResult');
			$httpBackend.flush();
			expect(scope.status).to.be.equal(200);
		});

		it('should contain properties', function() {
			expect(ctrl.placeholder).to.be.ok;
			expect(ctrl.findButtonText).to.be.ok;
			expect(ctrl.searchQuery).to.be.empty;
		});
	});
});
