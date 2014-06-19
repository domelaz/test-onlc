var searchFilters = angular.module('searchFilters',[]);

/**
 * @deprecated since angular-i18n
 *
 * Prepend any value with " руб." suffix;
 * Use with pipe form angular `number` filter;
 *
 * @param {string} input Amount
 */
searchFilters.filter('roubles', function() {
	return function(input) {
		return input + ' руб.';
	};
});
