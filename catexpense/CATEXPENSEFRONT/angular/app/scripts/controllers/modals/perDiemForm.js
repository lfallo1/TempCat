﻿'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:PerDiemCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller(
  'PerDiemCtrl',
  [
      "$scope",
      "LineItemService",
      "ValidationService",
      function (
          $scope,
          LineItemService,
          ValidationService
          ) {

          /****************************************************
          *
          * Private Variables
          *
          ***************************************************/

          //default validation for fields
          var perDiemValidation = {
              days: {
                  valid: true,
                  message: 'This field is valid.'
              },
              validInput: true
          };

          /****************************************************
          *
          * Public Variables
          *
          ***************************************************/

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
              days: LineItemService.getDays(),
              billable: LineItemService.getBillable(),
              amount: LineItemService.getLineItemAmount()
          };

          /****************************************************
          *
          * Private Methods
          *
          ***************************************************/

          /****************************************************
          *
          * Public Methods
          *
          ***************************************************/

          /**
           * Returns true if the days field is valid, returns false otherwise.
           */
          $scope.areDaysValid = function () {
              return perDiemValidation.days.valid;
          };

          /**
           * Returns the validation message of the days field. 
           */
          $scope.daysValidationMessage = function () {
              return perDiemValidation.days.message;
          };

          /**
           * Returns true if the entire form is valid, false otherwise.
           */
          $scope.perDiemIsValid = function () {
              return perDiemValidation.validInput;
          };


          /**
           * Calculates the total based on which of the days were checked in the form.
           * Currently is hard coded to be 30.
           */
          $scope.calculateTotal = function () {
              var perDiem = 30;
              $scope.perDiemValues.amount = 0;
              for ( var key in $scope.perDiemValues.days )
              {
                  if ( $scope.perDiemValues.days.hasOwnProperty( key ) )
                  {
                      $scope.perDiemValues.amount += $scope.perDiemValues.days[key] ? perDiem : 0;
                  }
              };
              $scope.perDiemValues.amount = ( $scope.perDiemValues.amount ).toFixed( 2 );
              LineItemService.setLineItemAmount( $scope.perDiemValues.amount );
          };

          /**
           * Updates the LineItemService with the new days selected from the form.
           * Also, checks to see if the newly selected days field is valid.
           */
          $scope.updateDays = function () {
              LineItemService.setDays( $scope.perDiemValues.days );
              perDiemValidation = ValidationService.validatePerDiem( LineItemService.getLineItem() );
              LineItemService.setValidity( $scope.perDiemIsValid() );
          };

          /**
           * Updates the LineItemservice with the new billable field from the form.
           */
          $scope.updateBillable = function () {
              LineItemService.setBillable( $scope.perDiemValues.billable );
          };

      }
  ] );
