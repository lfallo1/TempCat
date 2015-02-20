'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp.Controllers')
  .controller('PolicyCtrl', ["$scope", "$modalInstance", "selectedType", "ExpenseCategory", "Authentication", "LogError", function ($scope, $modalInstance, selectedType, ExpenseCategory, Authentication, LogError) {

      $scope.policyType = selectedType;

      $scope.expenseCategories = [];

      function getExpenseCategories() {
          ExpenseCategory.getAllExpenseCategories().then(
              function (success) {
                  console.log('success finding all expense categories');
                  console.log(success);
                  success.data.forEach(function (category) {
                      $scope.expenseCategories.push(category.ExpenseCategoryName);
                  });
                  $scope.setPolicyView();
              },
              function (error) {
                  console.log('failed to find expense categories');
                  console.log(error);
                  LogError.logError({ username: Authentication.getUser(), endpoint: error.config.url, error: error.statusText }).then(
                    function (success) { },
                    function (error) { });
              });
      }
      getExpenseCategories();

      /**
      * show policy depending on the expense type chosen
      */
      $scope.setPolicyView = function () {
          $scope.policyIs = {
              mileage: $scope.policyType === $scope.expenseCategories[0],
              perdiem: $scope.policyType === $scope.expenseCategories[1],
              transportation: $scope.policyType === $scope.expenseCategories[2],
              lodging: $scope.policyType === $scope.expenseCategories[3],
              parking: $scope.policyType === $scope.expenseCategories[4],
              entertainment: $scope.policyType === $scope.expenseCategories[5],
              meals: $scope.policyType === $scope.expenseCategories[6],
              airfare: $scope.policyType === $scope.expenseCategories[7],
              other: $scope.policyType === $scope.expenseCategories[8]
          };
      }

      /**
       * Close out of the Policy modal.
       */
      $scope.ok = function () {
          $modalInstance.dismiss('Form was cancelled.');
      };

  }]);