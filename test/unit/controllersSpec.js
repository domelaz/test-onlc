/*jshint expr:true*/
/*global expect, sinon*/
describe('Controllers', function() {

	beforeEach(module('search'));
	beforeEach(module('searchService'));

	describe('SearchForm controller', function() {
		var scope, rootScope, ctrl, $httpBackend;
		
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			rootScope = $rootScope;
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
			var spy = sinon.spy(rootScope, '$broadcast');
			$httpBackend.expectGET('search?q=%22answer%22').respond(200, [42]);
			scope.searchQuery = 'answer';
			scope._find();
			$httpBackend.flush();
			expect(spy.callCount).to.be.equal(1);
			expect(spy.calledWith('searchSucceed')).to.be.true;
			expect(scope.status).to.be.a.function;
		});

		it('should be no answer', function() {
			var spy = sinon.spy(rootScope, '$broadcast');
			$httpBackend.expectGET('search?q=%22answer%22').respond(500, ['error']);
			scope.searchQuery = 'answer';
			scope._find();
			$httpBackend.flush();
			expect(spy.callCount).to.be.equal(1);
			expect(spy.calledWith('searchError')).to.be.true;
			expect(scope.status).to.be.a.function;
		});
	});

	describe('SearchResults controller', function() {
		var scope, rootScope, ctrl;

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			rootScope = $rootScope;
			ctrl = $controller('SearchResults', { $scope: scope });
		}));

		it('should be results array', function() {
			expect(ctrl.results).to.be.array;
			expect(ctrl.results).to.be.empty;
		});

		it('should be link in $scope to this controller', function() {
			expect(scope.ctrl).to.be.eql(ctrl);
		});
		
		it('should be isEmpty method', function() {
			expect(ctrl.isEmpty).to.be.a.function;
		});

		it('should isEmpty() returns true when empty', function() {
			ctrl.results = [];
			expect(ctrl.isEmpty()).to.be.true;
		});

		it('should isEmpty() returns false when filled', function() {
			ctrl.results = [ {is: 'something'} ];
			expect(ctrl.isEmpty()).to.be.false;
		});

		it('should respect "searchSucceed" event with data', function() {
			rootScope.$broadcast('searchSucceed', {data: JSON.stringify('somedata')});
			expect(ctrl.results).to.be.equal('somedata');
		});

		it('should not respect "searchSucceed" event without data', function() {
			rootScope.$broadcast('searchSucceed', {other: JSON.stringify('unexpected')});
			expect(ctrl.results).to.be.undefined;
		});
	});

	describe('SearchTroubles controller', function() {
		var scope, rootScope, ctrl;

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			rootScope = $rootScope;
			ctrl = $controller('SearchTroubles', { $scope: scope });
		}));

		it('should be inTrouble property', function() {
			expect(ctrl.inTrouble).to.be.false;
		});

		it('should be statusMessage property', function() {
			expect(ctrl.inTrouble).to.be.empty;
		});

		it('should be link in $scope to this controller', function() {
			expect(scope.ctrl).to.be.eql(ctrl);
		});
		
		it('should be isTrouble method', function() {
			expect(ctrl.isTrouble).to.be.a.function;
			ctrl.inTrouble = true;
			expect(ctrl.isTrouble()).to.be.true;
		});

		it('should respect "searchError" event', function() {
			ctrl.inTrouble = false;
			rootScope.$broadcast('searchError');
			expect(ctrl.inTrouble).to.be.true;
			expect(ctrl.statusMessage).not.empty;
		});

		it('should respect "searchSucceed" event', function() {
			ctrl.inTrouble = true;
			rootScope.$broadcast('searchSucceed');
			expect(ctrl.inTrouble).to.be.false;
			expect(ctrl.statusMessage).to.be.empty;
		});
	});
});
