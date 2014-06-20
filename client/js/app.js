(function () {
	
	var opts = {
		// минимальная длина поискового запроса
		minQueryLength: 2,
		// максимальная длина поискового запроса
		maxQueryLength: 1024,
		// адрес обработчика запроса
		searchHandler: 'search',
		// задержка перед отправкой запроса на сервер, в миллисекундах
		sendDelay: 500,
	};
	
	var app = angular.module('search', ['searchService','searchFilters']);
	
	app.controller('SearchForm', ['$scope', '$rootScope', 'Data', 'strings', function($scope, $rootScope, Data, strings) {
		
		this.placeholder = strings.placeholder;
		this.findButtonText = strings.findButton;
		
		$scope.strings = strings;
		$scope.searchQuery = '';

		$scope._find = function() {
			var q = $scope.searchQuery;
			Data.query({q: JSON.stringify(q)},
				// success callback, emit event with data addressed to results controller
				function(data, status) {
					$scope.status = status;
					$rootScope.$broadcast("searchSucceed", {data: data});
				},
				// error callback
				function(data, status) {
					$scope.status = status;
					$rootScope.$broadcast("searchError", {data: data});
					console.error("Ajax faced troubles: %s, %s", status, data);
				}
			);
		};

		/**
		 * Watch for changes in search field
		 */
		$scope.$watch('searchQuery', function(newVal, oldVal, $scope) {
			var q = $scope.searchQuery;
			if ((q.length < opts.minQueryLength) || 
				(q.length > opts.maxQueryLength) ||
				(newVal === oldVal)) {
				return;
			}
			$scope.status = 'runQuery';
			$scope._find();
		});
	}]);
	
	app.controller('SearchResults', ['$scope', 'strings', function($scope, strings) {
		
		this.results = [];
		$scope.ctrl = this;
		$scope.strings = strings;
		
		this.isEmpty = function() {
			return (this.results.length > 0) ? false : true;
		};
		
		$scope.$on("searchSucceed", function(event, args){
			// @todo style matches with <strong> tag
			// @todo try parse json
			var r = angular.fromJson(args.data),
				c = event.currentScope.ctrl;
			c.results = r;
		});

		/**
		 * @todo hide searchresults panel
		 *
		$scope.$on("searchError", function(event, args){
			
		});*/
	}]);

	app.controller('SearchTroubles', ['$scope', 'strings', function($scope, strings) {

		this.inTrouble = false;
		this.statusMessage = '';
		$scope.strings = strings;
		$scope.ctrl = this;

		this.isTrouble = function() {
			return this.inTrouble;
		};

		$scope.$on("searchError", function(event) {
			var c = event.currentScope.ctrl;
			c.inTrouble = true;
			c.statusMessage = event.currentScope.strings.shitHappens;
		});

		$scope.$on("searchSucceed", function(event) {
			var c = event.currentScope.ctrl;
			c.inTrouble = false;
			c.statusMessage = '';
		});
	}]);
})();
