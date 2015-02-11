'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp.Controllers')
  .controller('PolicyCtrl', ["$scope", "$modalInstance", "selectedType", function ($scope, $modalInstance, selectedType) {

      $scope.policyType = selectedType;

      /**
      * show policy depending on the expense type chosen
      */
      $scope.policyIs = {
          mileage: selectedType === 'Mileage',
          perdiem: selectedType === 'Per Diem',
          transportation: selectedType === 'Transportation',
          lodging: selectedType === 'Lodging',
          parking: selectedType === 'Parking',
          entertainment: selectedType === 'Entertainment',
          meals: selectedType === 'Meals',
          airfare: selectedType === 'Airfare',
          other: selectedType === 'Other'
      };

      /**
       * Close out of the Policy modal.
       */
      $scope.ok = function () {
          $modalInstance.dismiss('Form was cancelled.');
      };

  }]);