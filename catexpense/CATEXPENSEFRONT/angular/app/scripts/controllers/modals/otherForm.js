'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:OtherCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller( 'OtherCtrl', function ( $scope, LineItemService, ValidationService ) {

      //determine if the modal is editing an existing lineitem or creating new one(s)
      //$scope.editingExistingOther = LineItemService.getUnderEdit();

      /**
      * stores the index of the item in the mileageArray that is being edited
      */
      var otherIndex = 0;

      /**
      * for new item being created, set fields from page directly into LineItemService,
      * which will later be passed to submission.js for post to database when modal closes
      *
      * for item under edit, set these fields in the otherForm with their existing values
      */
      $scope.otherValues = {
          date: LineItemService.getLineItemDate(),
          description: LineItemService.getLineItemDesc(),
          amount: LineItemService.getLineItemAmount(),
          billable: LineItemService.getBillable()
      };

      /**
      * default validation for fields
      */
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
      * getter methods for otherValidation field values
      */
      $scope.isDateValid = function () {
          return otherValidation.date.valid;
      };

      $scope.dateValidationMessage = function () {
          return otherValidation.date.message;
      };

      $scope.isDescValid = function () {
          return otherValidation.description.valid;
      };

      $scope.descValidationMessage = function () {
          return otherValidation.description.message;
      };

      $scope.isAmountValid = function () {
          return otherValidation.amount.valid;
      };

      $scope.amountValidationMessage = function () {
          return otherValidation.amount.message;
      };

      $scope.otherIsValid = function () {
          return otherValidation.validInput;
      };

      /**
      * setter methods for otherValidation field values
      */
      $scope.updateDate = function () {
          LineItemService.setLineItemDate( $scope.otherValues.date );
          otherValidation = ValidationService.validateOther( LineItemService.getLineItem() );
          $scope.otherArray[0] = LineItemService.getLineItem();
          $scope.otherArray[0].valid = $scope.otherIsValid();
      };

      $scope.updateDescription = function () {
          LineItemService.setLineItemDesc( $scope.otherValues.description );
          otherValidation = ValidationService.validateOther( LineItemService.getLineItem() );
          $scope.otherArray[0] = LineItemService.getLineItem();
          $scope.otherArray[0].valid = $scope.otherIsValid();
      };

      $scope.updateAmount = function () {
          LineItemService.setLineItemAmount( $scope.otherValues.amount );
          otherValidation = ValidationService.validateOther( LineItemService.getLineItem() );
          $scope.otherArray[0] = LineItemService.getLineItem();
          $scope.otherArray[0].valid = $scope.otherIsValid();
      };

      $scope.updateBillable = function () {
          LineItemService.setBillable( $scope.otherValues.billable );
          otherValidation = ValidationService.validateOther( LineItemService.getLineItem() );
          $scope.otherArray[0] = LineItemService.getLineItem();
          $scope.otherArray[0].valid = $scope.otherIsValid();
      };

      //==============================================================================//
      // THESE FUNCTIONS ARE FOR THE DATEPICKER
      // IDEALLY WILL BE REFACTORED LATER ON
      //==============================================================================//

      /**
      * sets the date to today
      */
      $scope.today = function () {
          $scope.otherValues.date = new Date();
      };

      /** 
      * clears the date field
      */
      $scope.clear = function () {
          $scope.$scope.otherValues.date = null;
      };

      /**
      * sets the minimum date selectable
      * currently set to make sunday of the week the minumum
      * call function upon page load
      */
      $scope.toggleMin = function () {
          $scope.minDate = LineItemService.getDaysString().sunday;
      };
      $scope.toggleMin();

      /**
      * sets the maximum date selectable
      * currently sets the saturday of the week the maximum
      * call function upon page load
      */
      $scope.toggleMax = function () {
          $scope.maxDate = LineItemService.getDaysString().saturday;
      };
      $scope.toggleMax();

      /**
      * opens the datepicker modal
      */
      $scope.open = function ( $event ) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
      };

      /**
      * format for datepicker dates in otherForm.html
      */
      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      /**
      * displays the date in the selected format
      * currently defaults to 'dd-MMMM-yyyy' ie: 01-January-2015
      */
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

  } );