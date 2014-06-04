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
					'angular',
					'inject', //angular
					'describe', //mocha
					'it', //mocha
					'beforeEach', //mocha
					'expect', //chai
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
			},
			tests: {
				src: ['test/**/*.js']
			}
		},
		mochaTest: {
			node: {
				options: {
					reporter: 'spec',
					require: 'chai'
				},
				src: [
					'test/node/**/*.js'
				],
			},
			coverage: {
				options: {
					reporter: 'html-cov',
					quiet: true,
					captureFile: 'code-cov/index.html'
				},
				src: [
					'<%= mochaTest.node.src %>'
				],
			}
		},
		shell: {
			options: {
				stdout: true
			},
			testDatabaseInit: {
				command: 'mysql --user=root -p -e "' +
					'DROP SCHEMA IF EXISTS onlcview_test; ' +
			   		'CREATE SCHEMA onlcview_test; ' +
					"GRANT ALL PRIVILEGES on onlcview_test.* to 'onlc'@'localhost' IDENTIFIED BY 'xxxxxx'" +
					';"'
			},
			cleanupCoverage: {
				command: 'rm code-cov/*'
			},
		},
		env: {
			coverage: {
				CODE_COV: true,
				PORT: 3001
			},
			nodeTest: {
				PORT: 3001
			},
		},
		watch: {
			syntax: {
				files: [
					'<%= jshint.app.src %>',
					'<%= jshint.node.src %>',
					'<%= jshint.gruntfile.src %>',
					'<%= jshint.tests.src %>'
				],
				tasks: ['hint']
			},
			concatenate: {
				files: [
					'<%= concat.css.src %>',
					'<%= concat.js.src %>'
				],
				tasks: ['glue']
			},
		},
		blanket: {
			instrument: {
				options: {},
				files: {
					'code-cov/' : ['routes/', 'lib/'],
				},
			},
		},
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-blanket');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-env');
	grunt.registerTask('glue', ['concat']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('testSetup', ['shell:testDatabaseInit']);
	grunt.registerTask('nodeTest', ['env:nodeTest', 'mochaTest:node']);
	grunt.registerTask('nodeCoverage', ['shell:cleanupCoverage','blanket','env:coverage','mochaTest:coverage']);
};
