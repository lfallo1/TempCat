'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp.Controllers')
  .controller('HomeController', ["$scope", "$route", "$timeout", "$rootScope", "$location", "$anchorScroll", "Application", "SubmissionService", function ($scope, $route, $timeout, $rootScope, $location, $anchorScroll, Application, SubmissionService) {

      $scope.timeOut = true;
      $scope.title = 'Home';
      $scope.employeeRejectedTotal = 0;
      $scope.managerTotal = 0;
      $scope.financeTotal = 0;

      $scope.goToManagerTable = function () {
          $location.hash('manager-short-table');
          $anchorScroll();
      };

      $scope.goToFinanceTable = function () {
          $location.hash('finance-short-table');
          $anchorScroll();
      };

      /**
      * receive broadcast message and set employeeRejectedTotal value
      */
      $scope.$on("employeeTotal", function (message, total) {
          $scope.employeeRejectedTotal = total;
          $rootScope.$broadcast("refreshCreateNewItemLoad");
      });

      /**
      * receive broadcast message and set financeTotal value
      */
      $scope.$on("financeTotal", function (message, total) {
          $scope.financeTotal = total;
      });

      /**
      * receive broadcast message and set managerTotal value
      */
      $scope.$on("managerTotal", function (message, total) {
          $scope.managerTotal = total;
      });

      /**
      * alert message timeout function
      */
      $timeout(function () {
          $scope.timeOut = false;
      }, 6000);
  }]);
