'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:PerDiemCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp.Controllers')
  .controller('PerDiemCtrl', ["$scope", "LineItemService", "DateService", "ValidationService", function ($scope, LineItemService, DateService, ValidationService) {

      /**
      * default validation for fields
      */
      $scope.perDiemValidation = {
          days: {
              valid: true,
              message: 'This field is valid.'
          },
          validInput: true
      };

      /**
      * for new item being created, set fields from page input directly in LineItemService,
      * which will later be passed to submission.js for post to database when modal closes
      *
      * for item under edit, set these fields in the perDiemForm with their existing values
      */
      $scope.perDiemValues = {
          daysString: {
              sunday: LineItemService.getDaysString().sunday,
              monday: LineItemService.getDaysString().monday,
              tuesday: LineItemService.getDaysString().tuesday,
              wednesday: LineItemService.getDaysString().wednesday,
              thursday: LineItemService.getDaysString().thursday,
              friday: LineItemService.getDaysString().friday,
              saturday: LineItemService.getDaysString().saturday
          },
          lineItemDate: LineItemService.getEndingWeek(),
          days: LineItemService.getDays(),
          billable: LineItemService.getBillable(),
          amount: LineItemService.getLineItemAmount()
      };


      /**
       * Calculates the total based on which of the days were checked in the form.
       * Currently is hard coded to be 30.
       */
      $scope.calculateTotal = function () {
          var perDiem = 30;
          $scope.perDiemValues.amount = 0;
          for (var key in $scope.perDiemValues.days) {
              if ($scope.perDiemValues.days.hasOwnProperty(key)) {
                  $scope.perDiemValues.amount += $scope.perDiemValues.days[key] ? perDiem : 0;
              }
          };
          LineItemService.setLineItemAmount($scope.perDiemValues.amount);
      };

      /**
      * setter functions
      */
      $scope.updateDays = function () {
          LineItemService.setDays($scope.perDiemValues.days);
          $scope.perDiemArray[0] = $scope.perDiemValues;
          $scope.perDiemValidation = ValidationService.validatePerDiem(LineItemService.getLineItem());
          $scope.perDiemArray[0].valid = $scope.perDiemValidation.validInput;
      };

      $scope.updateBillable = function () {
          LineItemService.setBillable($scope.perDiemValues.billable);
          $scope.perDiemArray[0] = $scope.perDiemValues;
          $scope.perDiemValidation = ValidationService.validatePerDiem(LineItemService.getLineItem());
          $scope.perDiemArray[0].valid = $scope.perDiemValidation.validInput;
      };
  }]);