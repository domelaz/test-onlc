(function () {
	
	var opts = {
		// минимальная длина поискового запроса
		minQueryLength: 3,
		// максимальная длина поискового запроса
		maxQueryLength: 1024,
		// адрес обработчика запроса
		searchHandler: 'search',
		// задержка перед отправкой запроса на сервер, в миллисекундах
		sendDelay: 500,
		// поясняющий текст в поле поиска
		placeholderText: "Введите название товара, идентификатор товара или название компании",
		findButtonText: "Найти"
	};
	
	var app = angular.module('search', []);
	
	app.controller('SearchForm', function($rootScope, $http) {
		
		this.placeholder = opts.placeholderText;
		this.findButtonText = opts.findButtonText;
		
		this.searchQuery = '';
		
		this.find = function() {
			// send ajax to db if:
			//  key 'pressed flag' is true;
			//  search query n > lenght > m;
			//  reset timeout
			alert(this.searchQuery);
		};
		
		this.keyup = function() {
			// clear timeout before find method
			// set 'key pressed' flag to true
			
			var q = this.searchQuery;
			
			if ((q.length < opts.minQueryLength) || (q.length > opts.maxQueryLength)) {
				return;
			}
			// @todo: validate searchQuery
			$http({
				method: 'GET',
				url: opts.searchHandler,
				params: { q: JSON.stringify(q) }
			}).success(function(data, status) {
				// on success, emit event with data addressed to results controller
				if (status === 200) {
					$rootScope.$broadcast("results", {data: data});
				}
			}).error(function(data, status) {
				console.error("Ajax faced troubles: %s, %s", status, data);
				return;
			});
		};
	});
	
	app.controller('SearchResults', function($scope) {
		
		this.results = [];
		$scope.ctrl = this;
		
		this.isEmpty = function() {
			// @todo wtf?
			return (this.results.length > 0) ? true : false;
		};
		
		$scope.$on("results", function(event, args){
			// @todo style matches with <strong> tag
			// @todo try parse json
			var r = angular.fromJson(args.data),
				c = event.currentScope.ctrl;
			c.results = r;
		});
	});
})();
