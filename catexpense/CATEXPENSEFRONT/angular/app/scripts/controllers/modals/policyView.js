'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller( 'PolicyCtrl', ["$scope", "$modalInstance", "selectedType", "ExpenseCategory", function ( $scope, $modalInstance, selectedType, ExpenseCategory ) {

      var expenseCategories = [];

      $scope.policyType = selectedType;

      $scope.policyIs = {
          mileage: false,
          perdiem: false,
          transportation: false,
          lodging: false,
          parking: false,
          entertainment: false,
          meals: false,
          airfare: false,
          other: false,
          loading: true,
          error: false
      };

      /**
       * Display the selected policy
       */
      function displayPolicy() {

          //remove loading/error message
          $scope.policyIs.loading = false;
          $scope.policyIs.error = false;

          //display required Policy
          $scope.policyIs.mileage = $scope.policyType === expenseCategories[0];
          $scope.policyIs.perdiem = $scope.policyType === expenseCategories[1];
          $scope.policyIs.transportation = $scope.policyType === expenseCategories[2];
          $scope.policyIs.lodging = $scope.policyType === expenseCategories[3];
          $scope.policyIs.parking = $scope.policyType === expenseCategories[4];
          $scope.policyIs.entertainment = $scope.policyType === expenseCategories[5];
          $scope.policyIs.meals = $scope.policyType === expenseCategories[6];
          $scope.policyIs.airfare = $scope.policyType === expenseCategories[7];
          $scope.policyIs.other = $scope.policyType === expenseCategories[8];

          //if none of the policy types were selected, then display error
          $scope.policyIs.error = !( $scope.policyIs.mileage || $scope.policyIs.perdiem || $scope.policyIs.transportation
              || $scope.policyIs.lodging || $scope.policyIs.parking || $scope.policyIs.entertainment
              || $scope.policyIs.meals || $scope.policyIs.airfare || $scope.policyIs.other );

      };

      /**
       * Get the list of all expense categories from the database.
       */
      $scope.getExpenseCategories = function () {
          ExpenseCategory.getAllExpenseCategories().then(
              function ( success ) {
                  success.data.forEach( function ( category ) {
                      expenseCategories.push( category.ExpenseCategoryName );
                  } );
                  displayPolicy();
              },
              function ( error ) {
                  console.log( error );
                  displayPolicy();
              } );
      };

      $scope.getExpenseCategories();

      /**
       * Close out of the Policy modal.
       */
      $scope.ok = function () {
          $modalInstance.dismiss( 'Form was cancelled.' );
      };

  }] );