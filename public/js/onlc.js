(function () {
	
	var opts = {
		// минимальная длина поискового запроса
		minQueryLength: 3,
		// максимальная длина поискового запроса
		maxQueryLength: 1024,
		// адрес обработчика запроса
		searchHandler: 'search.php',
		// задержка перед отправкой запроса на сервер, в миллисекундах
		sendDelay: 500,
		// поясняющий текст в поле поиска
		placeholderText: "Введите название товара, идентификатор товара или название компании"
	};
	
	var app = angular.module('search', []);
	
	app.controller('SearchForm', function() {
		
		this.placeholder = opts.placeholderText;
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
			//alert('he');
		};
	});
	
	app.controller('SearchResults', function() {});
})();
