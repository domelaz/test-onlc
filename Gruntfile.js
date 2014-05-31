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
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('glue', ['concat']);
};
