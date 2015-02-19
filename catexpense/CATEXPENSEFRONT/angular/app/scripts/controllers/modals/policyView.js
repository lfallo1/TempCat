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

      /**
      * show policy depending on the expense type chosen
      */
      $scope.policyIs = {
          mileage: selectedType === $scope.expenseCategories[0],
          perdiem: selectedType === $scope.expenseCategories[1],
          transportation: selectedType === $scope.expenseCategories[2],
          lodging: selectedType === $scope.expenseCategories[3],
          parking: selectedType === $scope.expenseCategories[4],
          entertainment: selectedType === $scope.expenseCategories[5],
          meals: selectedType === $scope.expenseCategories[6],
          airfare: selectedType === $scope.expenseCategories[7],
          other: selectedType === $scope.expenseCategories[8]
      };

      /**
       * Close out of the Policy modal.
       */
      $scope.ok = function () {
          $modalInstance.dismiss('Form was cancelled.');
      };

      function getExpenseCategories() {
          ExpenseCategory.getAllExpenseCategories().then(
              function (success) {
                  success.data.forEach(function (category) {
                      $scope.expenseCategories.push(category.ExpenseCategoryName);
                  });
              },
              function (error) {
                  LogError.logError({ username: Authentication.getUser(), endpoint: error.config.url, error: error.statusText }).then(
                    function (success) { },
                    function (error) { });
              });
      }
      getExpenseCategories();

  }]);