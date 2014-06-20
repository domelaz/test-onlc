/**
 * Config
 */
(function() {
	angular.module('search').config(['$provide', function($provide){
		$provide.constant('options', {
			// минимальная длина поискового запроса
			minQueryLength: 2,
		// максимальная длина поискового запроса
		maxQueryLength: 256,
		// адрес обработчика запроса
		//searchHandler: 'search',
		// задержка перед отправкой запроса на сервер, в миллисекундах
		//sendDelay: 500,
		});
	}]);
})();
