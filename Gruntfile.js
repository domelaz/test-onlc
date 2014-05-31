module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			// Файлы указываются явно, так как важна очередность
			css: {
				src: [
					'public/css/bootstrap.min.css',
   					'public/css/onlc.css'
				],
				dest: 'public/css/styles.css'
				},
			js: {
				src: [
					'public/js/angular.js',
					'public/js/jquery.js',
					'public/js/bootstrap.min.js',
					'public/js/onlc.js'
				],
				dest: 'public/js/scripts.js'
			}
		},
		jshint: {
			options: {
				camelcase: true,
				curly: true,
				eqeqeq: true,
				indent: true,
				latedef: true,
				node: true,
				trailing: true,
				undef: true,
				unused: true,
				predef: [
					'angular'
				]
			},
			app: {
				src: ['public/js/onlc.js']
			},
			node: {
				src: [
					'lib/**/*.js',
					'routes/**/*.js'
				]
			},
			gruntfile: {
				src: ['Gruntfile.js']
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('glue', ['concat']);
	grunt.registerTask('hint', ['jshint']);
};
