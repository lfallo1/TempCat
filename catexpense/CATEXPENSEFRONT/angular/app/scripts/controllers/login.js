'use strict';

angular.module('expenseApp')
  .controller('LoginController', function ($scope, $location, $rootScope, Authentication, SubmissionService) {
      
      $scope.ErrorMessage = "";
      $scope.doLogin = function (user) {
          SubmissionService.userlogin(user.username, user.password).then(function (results) {
              if (results.data.isLoggedIn) {
                  $scope.ErrorMessage = "";
                  Authentication.login(results.data);
                  $location.path('/home');
                  $rootScope.$broadcast("refresh");
                  $rootScope.$broadcast("refreshHome");
              } else {
                  $scope.ErrorMessage = "The user name and password do not match any records we have.\nPlease try agian, be carefull, too many failed attemps could result in your account being locked.";
              }
          });
      };
  });