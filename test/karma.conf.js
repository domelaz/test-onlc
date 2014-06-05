module.exports = function(config) {
	config.set({

		basePath: '../',
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'public/js/app/**/*.js',
			'test/unit/**/*.js'
		],
		autoWatch: true,
		browsers: ['Firefox'],
		frameworks: ['mocha', 'chai'],
		plugins: [
			'karma-mocha',
			'karma-coverage',
			'karma-chai',
			'karma-firefox-launcher',
		],
		client: {
			mocha: {
				ui: 'bdd'
			}
		},
		reporters: ['progress', 'coverage'],
		coverageReporter: {
			type: 'html',
			dir: 'code-cov/client/unit'
		},
		preprocessors: {
			'public/js/app/*.js': 'coverage'
		},
	});
};
