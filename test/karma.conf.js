module.exports = function(config) {
	config.set({

		basePath: '../',
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'public/js/onlc.js',
			'test/unit/**/*.js'
		],
		autoWatch: true,
		browsers: ['Firefox'],
		frameworks: ['mocha', 'chai'],
		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-firefox-launcher',
		],
		client: {
			mocha: {
				ui: 'bdd'
			}
		}
	});
};
