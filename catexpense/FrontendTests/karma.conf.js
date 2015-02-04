module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '../',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern:'CATEXPENSEFRONT/Scripts/jquery-2.1.0.js', included:false},
      {pattern:'CATEXPENSEFRONT/Scripts/toastr.js', included:false},
      {pattern:'CATEXPENSEFRONT/Scripts/q.js', included:false},
      {pattern:'CATEXPENSEFRONT/Scripts/moment.js', included:false},
      {pattern:'CATEXPENSEFRONT/Scripts/knockout-2.3.0.js', included:false},
      {pattern:'CATEXPENSEFRONT/App/**/*.js', included:false},
      {pattern:'FrontendTests/spec/viewmodels/*.js', included:false},
      'FrontendTests/test-main.js'
    ],
    exclude: [
       'CATEXPENSEFRONT/App/main.js'
    ],
    browsers: [
      'PhantomJS'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
	  'karma-requirejs'
    ],
    reporters: [
        'progress',
        'coverage'
    ],
    preprocessors: {
        '**/CATEXPENSEFRONT/App/viewmodels/*.js': ['coverage']
    },
    coverageReporter: {
        reporters: [
            {
                type: 'cobertura',
                dir: 'FrontendTests/coverage/'
            },
            {
                type: 'html',
                dir: 'FrontendTests/coverage/'
            }
        ]
    },
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO,

    proxies: {
        '/': 'http://localhost:9000/'
    },
	browserNoActivityTimeout: 100000,
    urlRoot: '/_karma_/'
  });
};