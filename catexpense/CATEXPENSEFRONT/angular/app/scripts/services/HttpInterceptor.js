/*'use strict';

$provide.factory('myHttpInterceptor', function ($q, dependency1, dependency2) {
  return {
   'responseError': function(rejection) {
       console.log("error in response");
    }
  };
});

$httpProvider.interceptors.push('myHttpInterceptor');*/