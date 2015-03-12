'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller(
  'HomeController',
  [
      "$scope",
      "$route",
      "$timeout",
      "$rootScope",
      "$location",
      "$anchorScroll",
      "Cache",
      "SubmissionService",
      function (
          $scope,
          $route,
          $timeout,
          $rootScope,
          $location,
          $anchorScroll,
          Cache,
          SubmissionService
          ) {

          /****************************************************
           *
           * Private Variables
           *
           ***************************************************/

          /****************************************************
           *
           * Public Variables
           *
           ***************************************************/

          /**
           * Determines if the alert(s) will display
           * True -> displays the alert(s)
           * False -> hide the alert(s)
           */
          $scope.timeOut = true;

          $scope.title = 'Home';

          /**
           * Determines if the alert is shown that tells the user that they have X number of submission rejected.
           * > 0 -> display alert and number within alert
           * = 0 -> hide alert
           */
          $scope.employeeRejectedTotal = 0;

          /**
           * Determines if the alert is shown that tells the manager that they have X number of submissions awaiting approval.
           * > 0 -> display alert and number within alert
           * = 0 -> hide alert
           */
          $scope.managerTotal = 0;

          /**
           * Determines if the alert is shown that tells the finance that they have X number of submissions awaiting approval.
           * > 0 -> display alert and number within alert
           * = 0 -> hide alert
           */
          $scope.financeTotal = 0;

          /****************************************************
           *
           * Private Methods
           *
           ***************************************************/

          /**
           * alert message timeout function.
           * Currently set to 6 seconds.
           * 1000 ms = 1 second
           */
          $timeout( function () {
              $scope.timeOut = false;
          }, 6000 );

          /****************************************************
           *
           * Public Methods
           *
           ***************************************************/

          /**
           * receive broadcast message and set employeeRejectedTotal value
           */
          $scope.$on( "employeeTotal", function ( message, total ) {
              $scope.employeeRejectedTotal = total;
              $rootScope.$broadcast( "refreshCreateNewItemLoad" );
          } );

          /**
           * This method runs when the user clicks the message within the manager alert.
           * This method causes the page to scroll down until the manager table is within view.
           */
          $scope.goToManagerTable = function () {
              $location.hash( 'manager-short-table' );
              $anchorScroll();
          };

          /**
           * This method runs when the user clicks the message within the finance alert.
           * This method causes the page to scroll down until the finance table is within view.
           */
          $scope.goToFinanceTable = function () {
              $location.hash( 'finance-short-table' );
              $anchorScroll();
          };

          /**
           * This method will set the count for the number of submissions finance has to approve or reject.
           * This method will be referenced from FinanceTableController.
           */
          $scope.setFinanceSubmissionCount = function ( total ) {
              $scope.financeTotal = total;
          };

          /**
           * This method will set the count for the number of submissions a manager has to approve or reject.
           * This methos will be referenced from ManagerTableController.
           */
          $scope.setManagerSubmissionCount = function ( total ) {
              $scope.managerTotal = total;
          };

      }
  ] );
