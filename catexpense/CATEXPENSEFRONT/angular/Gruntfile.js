// Generated on 2014-12-30 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };
    
    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,
        concat: {
            target: {
                src: ['uglify/**/*.js'],
                dest: 'concat/concatUglify.js',
            },
        },
        uglify: {
            // uglify task configuration goes here.
            target: {
                // Grunt will search for "**/*.js" under "app/" when the "uglify" task
                // runs and build the appropriate src-dest file mappings then, so you
                // don't need to update the Gruntfile when files are added or removed.
                files: [
                  {
                      expand: true,     // Enable dynamic expansion.
                      cwd: 'app/',      // Src matches are relative to this path.
                      src: ['**/*.js'], // Actual pattern(s) to match.
                      dest: 'uglify/',   // Destination path prefix.
                      ext: '.min.js',   // Dest filepaths will have this extension.
                      extDot: 'first'   // Extensions in filenames begin after the first dot
                  },
                ],
            },
        },
        // The actual grunt server settings
        connect: {
            test: {
                options: {
                    port: 40218,
                    middleware: function (connect) {
                        return [
                          connect.static('.tmp'),
                          connect.static('test'),
                          connect().use(
                            '/app/bower_components',
                            connect.static('./app/bower_components')
                          ),
                          connect.static(appConfig.app)
                        ];
                    }
                }
            }
        },
        
        // Empties folders to start fresh
        clean: {
            server: '.tmp'
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            test: [
              'copy:styles'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-junit-reporter'
                ],
            }
        }
    });
    
    grunt.registerTask('test', [
      'clean:server',
      'concurrent:test',
      'autoprefixer',
      'connect:test',
      'karma'
    ]);
};
