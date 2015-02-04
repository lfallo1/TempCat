'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp')
  .controller('PolicyCtrl', function ($scope, $modalInstance, selectedType) {

      $scope.policyType = selectedType;

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

  });