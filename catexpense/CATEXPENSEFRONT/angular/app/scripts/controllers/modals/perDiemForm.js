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

      //default validation for fields
      var perDiemValidation = {
          days: {
              valid: true,
              message: 'This field is valid.'
          },
          validInput: true
      };

      $scope.areDaysValid = function () {
          return perDiemValidation.days.valid;
      };

      $scope.daysValidationMessage = function () {
          return perDiemValidation.days.message;
      };

      $scope.perDiemIsValid = function () {
          return perDiemValidation.validInput;
      };


      /**
       * Calculates the total based on which of the days were checked in the form.
       * Currently is hard coded to be 30.
       *
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

      $scope.updateDays = function () {
          LineItemService.setDays($scope.perDiemValues.days);
          perDiemValidation = ValidationService.validatePerDiem(LineItemService.getLineItem());
          LineItemService.setValidity($scope.perDiemIsValid());
      };

      $scope.updateBillable = function () {
          LineItemService.setBillable($scope.perDiemValues.billable);
      };

  }]);
