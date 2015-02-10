'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:OtherCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module('expenseApp.Controllers')
  .controller('OtherCtrl', ["$scope", "LineItemService", "ValidationService", function ($scope, LineItemService, ValidationService) {

      //stores the values that will be manipulated in the modal
      $scope.otherValues = {
          date: LineItemService.getLineItemDate(),
          description: LineItemService.getLineItemDesc(),
          amount: LineItemService.getLineItemAmount(),
          billable: LineItemService.getBillable()
      };

      //default validation for the values stored above
      var otherValidation = {
          date: {
              valid: true,
              message: 'This field is valid.'
          },
          description: {
              valid: true,
              message: 'This field is valid.'
          },
          amount: {
              valid: true,
              message: 'This field is valid.'
          },
          validInput: true
      };

      /**
       * Returns true if the date field is valid, false otherwise.
       */
      $scope.isDateValid = function () {
          return otherValidation.date.valid;
      };

      /**
       * Returns the validation message of the date field.
       */
      $scope.dateValidationMessage = function () {
          return otherValidation.date.message;
      };

      /**
       * Returns true if the description field is valid, false otherwise.
       */
      $scope.isDescValid = function () {
          return otherValidation.description.valid;
      };

      /**
       * Returns the validation message of the description field.
       */
      $scope.descValidationMessage = function () {
          return otherValidation.description.message;
      };

      /**
       * Returns true if the amount field is valid, false otherwise.
       */
      $scope.isAmountValid = function () {
          return otherValidation.amount.valid;
      };

      /**
       * Returns the validation message of the amount field.
       */
      $scope.amountValidationMessage = function () {
          return otherValidation.amount.message;
      };

      /**
       * Returns true if the entire form is valid, false otherwise. 
       */
      $scope.otherIsValid = function () {
          return otherValidation.validInput;
      };

      /**
       * Updates the LineItemService with the new date from the form.
       * Also, checks to see if the newly inputted date is valid.
       */
      $scope.updateDate = function () {
          LineItemService.setLineItemDate($scope.otherValues.date);
          otherValidation = ValidationService.validateOther(LineItemService.getLineItem());
          LineItemService.setValidity($scope.otherIsValid());
      };

      /**
       * Updates the LineItemservice with the new description from the form.
       * Also, checks to see if the description field is valid.
       */
      $scope.updateDescription = function () {
          LineItemService.setLineItemDesc($scope.otherValues.description);
          otherValidation = ValidationService.validateOther(LineItemService.getLineItem());
          $scope.otherArray[0] = LineItemService.getLineItem();
          $scope.otherArray[0].valid = $scope.otherIsValid();
      };

      /**
       * Updates the LineItemService with the new amount from the form.
       * Also, checks to see if the amount field is valid.
       */
      $scope.updateAmount = function () {
          LineItemService.setLineItemAmount($scope.otherValues.amount);
          otherValidation = ValidationService.validateOther(LineItemService.getLineItem());
          LineItemService.setValidity($scope.otherIsValid());
      };

      /**
       * Updates the LineItemservice with the new billable from from form.
       */
      $scope.updateBillable = function () {
          LineItemService.setBillable($scope.otherValues.billable);
      };

      //==============================================================================//
      // THESE FUNCTIONS ARE FOR THE DATEPICKER.
      // IDEALLY WILL BE REMOVED LATER ON WHEN THE DATEPICKER DIRECTIVE IS REFACTORED.
      //==============================================================================//

      //sets the date to today
      $scope.today = function () {
          $scope.otherValues.date = new Date();
      };

      //clears the date field
      $scope.clear = function () {
          $scope.otherValues.date = null;
      };

      //sets the minimum date selectable
      //currently set to make sunday of the week the minumum
      $scope.minDate = LineItemService.getDaysString().sunday;

      //sets the maximum date selectable
      //currently sets the saturday of the week the maximum
      $scope.maxDate = LineItemService.getDaysString().saturday;

      //opens the datepicker modal
      $scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
      };

      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      //displays the date in the selected format
      //currently defaults to 'dd-MMMM-yyyy' ie: 01-January-2015
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

  }]);
