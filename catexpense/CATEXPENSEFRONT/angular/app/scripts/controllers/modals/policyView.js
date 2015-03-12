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
  'PolicyCtrl',
  [
      "$scope",
      "$modalInstance",
      "selectedType",
      "ExpenseCategory",
      function (
          $scope,
          $modalInstance,
          selectedType,
          ExpenseCategory
          ) {

          /****************************************************
          *
          * Private Variables
          *
          ***************************************************/

          //This is where all of the expense categories retrieved from the database will be stored.
          var expenseCategories = [];

          /****************************************************
          *
          * Public Variables
          *
          ***************************************************/

          //This is the expense category that is chosen from the dropdown at the top of the modal.
          $scope.policyType = selectedType;

          //This will determine which policy message will be shown.
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

          /****************************************************
          *
          * Private Methods
          *
          ***************************************************/

          /**
           * Get the list of all expense categories from the database.
           */
          function getExpenseCategories() {

              //Call the Expensecategory Service
              ExpenseCategory.getAllExpenseCategories().then(

                  //call to ExpenseCategory was successful
                  function ( success ) {

                      //store the categories into a variable
                      success.data.forEach( function ( category ) {
                          expenseCategories.push( category.ExpenseCategoryName );
                      } );

                      //display the policy
                      displayPolicy();
                  },

                  //call to Expensecategory failed
                  function ( error ) {

                      //log the error
                      //this needs to be replaced with a call to the LogError service
                      console.log( error );

                      //display the policy(in this case, the error message will be displayed)
                      displayPolicy();
                  } );
          };

          /**
           * Set which policy will be shown.
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

          /****************************************************
          *
          * Public Methods
          *
          ***************************************************/

          /**
           * This method will run on page load and run any code that is needed to run.
           */
          $scope._onLoad = function () {
              getExpenseCategories();
          };

          $scope._onLoad();

          /**
           * Close out of the Policy modal.
           */
          $scope.ok = function () {
              $modalInstance.dismiss( 'Form was cancelled.' );
          };

      }
  ] );