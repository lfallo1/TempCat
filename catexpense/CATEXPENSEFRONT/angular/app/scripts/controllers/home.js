'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller('HomeController', function ($scope, $route, $timeout, $rootScope, Application, SubmissionService) {
      $scope.timeOut = true;
      $scope.title = 'Home';      
      $scope.employeeRejectedTotal = 0;
      $scope.managerTotal = 0;
      $scope.financeTotal = 0;
      $scope.$on("employeeTotal", function (message, total) {
          $scope.employeeRejectedTotal = total;
          $rootScope.$broadcast("refreshCreateNewItemLoad");
      });
      $scope.$on("financeTotal", function (message, total) {
          $scope.financeTotal = total;
      });
      $scope.$on("managerTotal", function (message, total) {
          $scope.managerTotal = total;
      });

      $timeout(function () {
          $scope.timeOut = false;
      }, 6000);
  });