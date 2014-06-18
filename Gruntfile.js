module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			coverageDir: 'code-cov/',
			coverageNode: 'code-cov/server/',
		},
		concat: {
			// Файлы указываются явно, так как важна очередность
			css: {
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.css',
					'client/css/app.css',
				],
				dest: 'public/css/styles.css'
				},
			js: {
				src: [
					'bower_components/angular/angular.js',
					'bower_components/angular-resource/angular-resource.js',
					'bower_components/jquery/dist/jquery.js', // for bootstrap
					'bower_components/bootstrap/dist/js/bootstrap.js',
					'client/js/app.js',
					'client/js/services.js',
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
					'browser',
					'by',
					'element',
					'describe', //mocha
					'it', //mocha
					'beforeEach', //mocha
				]
			},
			app: {
				src: ['client/js/**/*.js']
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
					captureFile: '<%= paths.coverageNode %>index.html',
				},
				src: [
					'<%= mochaTest.node.src %>'
				],
			}
		},
		karma: {
			options: {
				files: [
					'bower_components/angular/angular.js',
					'bower_components/angular-route/angular-route.js',
					'bower_components/angular-mocks/angular-mocks.js',
					'bower_components/angular-resource/angular-resource.js',
					'client/js/**/*.js',
					'test/unit/**/*.js'
				],
				frameworks: ['mocha', 'chai', 'sinon'],
				client: {
					mocha: {
						ui: 'bdd'
					}
				},
				plugins: [
					'karma-mocha',
					'karma-coverage',
					'karma-chai',
					'karma-sinon',
					'karma-firefox-launcher',
					'karma-chrome-launcher',
				],
			},
			single: {
				autoWatch: false,
				singleRun: true,
				browsers: ['Firefox'],
				reporters: ['progress', 'coverage'],
				coverageReporter: {
					type: 'html',
					dir: 'code-cov/client/unit'
				},
				preprocessors: {
					'client/js/*.js': 'coverage'
				},
			},
			continious: {
				autoWatch: true,
				singleRun: false,
				browsers: ['Chrome'],
			},
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
				command: 'rm -f <%= paths.coverageNode %>*'
			},
		},
		env: {
			coverage: {
				CODE_COV: true,
				COV_PATH: './../../<%= paths.coverageNode %>',
				PORT: 3001
			},
			nodeTest: {
				PORT: 3001
			},
			chromium: {
				CHROME_BIN: 'chromium-browser'
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
					'<%= paths.coverageNode %>' : ['routes/', 'lib/'],
				},
			},
		},
		uglify: {
			options: {
				mangle: true,
				preserveComments: 'some',
			},
			main: {
				files: [{
					expand: true,
					cwd: 'public/js/',
					src: '*.js',
					dest: 'public/js/',
				}],
			},
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'public/css/',
				src: '*.css',
				dest: 'public/css/',
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-blanket');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-env');
	grunt.registerTask('glue', ['concat']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('testSetup', ['shell:testDatabaseInit']);
	grunt.registerTask('nodeTest', ['env:nodeTest', 'mochaTest:node']);
	grunt.registerTask('nodeCoverage', ['shell:cleanupCoverage','blanket','env:coverage','mochaTest:coverage']);
	grunt.registerTask('longKarma', ['env:chromium', 'karma:continious']);
};
