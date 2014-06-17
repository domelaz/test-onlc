var searchService = angular.module('searchService', ['ngResource']);

searchService.factory('Data', ['$resource', function($resource){
	// @todo hardcoded 'search'
	return $resource('search');
	}
]);
