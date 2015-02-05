'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:OtherCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp' )
  .controller( 'OtherCtrl', function ( $scope, LineItemService, ValidationService ) {

      //determine if the modal is editing an existing lineitem or creating new one(s)
      //$scope.editingExistingOther = LineItemService.getUnderEdit();

      //stores the ides of the mileageArray of the item that is being edited
      var otherIndex = 0;

      $scope.otherValues = {
          date: LineItemService.getLineItemDate(),
          description: LineItemService.getLineItemDesc(),
          amount: LineItemService.getLineItemAmount(),
          billable: LineItemService.getBillable()
      };

      //default validation for fields
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
       * Watch the form and updates the Form service values based on the values in the other form.
       *
       */
      $scope.$watch(
          'otherValues',
          function ( newValue, oldValue ) {
              if ( newValue !== oldValue ) {

                  if ( $scope.editingLineItem ) {
                      LineItemService.resetLineItem();
                      LineItemService.setLineItemDate( $scope.otherValues.date );
                      LineItemService.setLineItemDesc( $scope.otherValues.description );
                      LineItemService.setLineItemAmount( $scope.otherValues.amount );
                      LineItemService.setBillable( $scope.otherValues.billable );
                      otherValidation = ValidationService.validateOther( LineItemService.getLineItem() );
                      $scope.otherArray[0] = LineItemService.getLineItem();
                      $scope.otherArray[0].valid = $scope.otherIsValid();
                  } else {
                      var lineitem = {
                          LineItemDate: $scope.otherValues.date,
                          LineItemDesc: $scope.otherValues.description,
                          LineItemAmount: $scope.otherValues.amount
                      };
                      $scope.otherArray[0] = $scope.otherValues;
                      otherValidation = ValidationService.validateOther( lineitem );
                      console.log( otherValidation );
                      $scope.otherArray[0].valid = $scope.otherIsValid();

                  }

              }
          },
          true
      );

      /**
       * Resets the values in the form when a new form is selected.
       * This sets the controller scope variables to their default values.
       *
       */
      /* $scope.$parent.$watch(
           'selectedType',
           function ( newVal, oldVal ) {
               $scope.otherValues = {
                   date: LineItemService.getLineItemDate(),
                   description: LineItemService.getLineItemDesc(),
                   amount: LineItemService.getLineItemAmount(),
                   billable: LineItemService.getBillable()
               };
           },
           true
           );*/


      //==============================================================================//
      // THESE FUNCTIONS ARE FOR THE DATEPICKER
      // IDEALLY WILL BE REFACTORED LATER ON
      //==============================================================================//

      //sets the date to today
      $scope.today = function () {
          $scope.otherValues.date = new Date();
      };

      //clears the date field
      $scope.clear = function () {
          $scope.$scope.otherValues.date = null;
      };

      //sets the minimum date selectable
      //currently set to make sunday of the week the minumum
      $scope.toggleMin = function () {
          $scope.minDate = LineItemService.getDaysString().sunday;
      };
      $scope.toggleMin();

      //sets the maximum date selectable
      //currently sets the saturday of the week the maximum
      $scope.toggleMax = function () {
          $scope.maxDate = LineItemService.getDaysString().saturday;
      };
      $scope.toggleMax();

      //opens the datepicker modal
      $scope.open = function ( $event ) {
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

  } );