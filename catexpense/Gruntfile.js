module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
  
	karma: {
      unit: {
        configFile: 'FrontendTests/karma.conf.js',
        singleRun: true
      },
      ci: {
        configFile: 'FrontendTests/karma.conf.js',
        singleRun: false
      }
	}
  });

  grunt.registerTask('default', ['karma:unit']);
  
  grunt.registerTask('test', function(ci){
    if(ci==='ci'){
        return grunt.task.run(['karma:ci']);
    }
    grunt.task.run(['karma:test']);
  });
};
