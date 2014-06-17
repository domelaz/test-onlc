/*jshint expr:true*/
/*global expect*/
describe('Controllers', function() {
	beforeEach(module('search'));
	beforeEach(module('searchService'));
	describe('SearchForm controller', function() {
		
		var scope, ctrl, $httpBackend;
		
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller('SearchForm', { $scope: scope });
		}));

		it('should contain properties', function() {
			expect(ctrl.placeholder).to.be.ok;
			expect(ctrl.findButtonText).to.be.ok;
			expect(scope.searchQuery).to.be.empty;
		});

		it('should trigger $watch on searchQuery', function() {
			expect(scope.searchQuery).to.be.empty;
			scope.$digest();
			scope.searchQuery = 'testResult';
			$httpBackend.expectGET('search?q=%22testResult%22').respond(['no matter']);
			scope.$digest();
			expect(scope.status).to.be.equal('runQuery');
		});

		it('should be find answer', function() {
			$httpBackend.expectGET('search?q=%22answer%22').respond(200,[42]);
			scope.searchQuery = 'answer';
			scope._find();
			$httpBackend.flush();
			expect(scope.status).to.be.a.function;
		});

		it('should be no answer', function() {
			$httpBackend.expectGET('search?q=%22answer%22').respond(500);
			scope.searchQuery = 'answer';
			scope._find();
			$httpBackend.flush();
			expect(scope.status).to.be.a.function;
		});
	});
});
