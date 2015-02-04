'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:PerDiemCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp' )
  .controller( 'PerDiemCtrl', function ( $scope, LineItemService, DateService, ValidationService ) {

      //default validation for fields
      $scope.perDiemValidation = {
          days: {
              valid: true,
              message: 'This field is valid.'
          },
          validInput: true
      };

      $scope.perDiemValues = {          
          daysString: {
              sunday: LineItemService.getDaysString().sunday.toString(),
              monday: LineItemService.getDaysString().monday.toString(),
              tuesday: LineItemService.getDaysString().tuesday.toString(),
              wednesday: LineItemService.getDaysString().wednesday.toString(),
              thursday: LineItemService.getDaysString().thursday.toString(),
              friday: LineItemService.getDaysString().friday.toString(),
              saturday: LineItemService.getDaysString().saturday.toString()
          },
          lineItemDate: LineItemService.getEndingWeek(),
          days: LineItemService.getDays(),
          billable: LineItemService.getBillable(),
          amount: LineItemService.getLineItemAmount()
      };


      /**
       * Calculates the total based on which of the days were checked in the form.
       * Currently is hard coded to be 30.
       *
       */
      $scope.calculateTotal = function () {
          var perDiem = 30;
          $scope.perDiemValues.amount = 0;
          for ( var key in $scope.perDiemValues.days ) {
              if ( $scope.perDiemValues.days.hasOwnProperty( key ) ) {
                  $scope.perDiemValues.amount += $scope.perDiemValues.days[key] ? perDiem : 0;
              }
          }
      };

      /**
       * Watch the form and updates the Form service values based on the values in the per diem form.
       *
       */
      $scope.$watch(
          'perDiemValues',
          function ( newValue, oldValue ) {
              if ( newValue !== oldValue ) {
                  LineItemService.setDays( $scope.perDiemValues.days );
                  LineItemService.setLineItemAmount( $scope.perDiemValues.amount );
                  LineItemService.setBillable($scope.perDiemValues.billable);
                  LineItemService.setLineItemDate(LineItemService.getEndingWeek());
                  $scope.perDiemArray[0] = $scope.perDiemValues;
                  $scope.perDiemValidation = ValidationService.validatePerDiem( LineItemService.getLineItem() );
                  $scope.perDiemArray[0].valid = $scope.perDiemValidation.validInput;
              }
          },
          true
      );

      /*$scope.$parent.$watch(
          'selectedType',
          function ( newVal, oldVal ) {
              $scope.perDiemValues = {
                  daysString: {
                      sunday: LineItemService.getDaysString().sunday.toString(),
                      monday: LineItemService.getDaysString().monday.toString(),
                      tuesday: LineItemService.getDaysString().tuesday.toString(),
                      wednesday: LineItemService.getDaysString().wednesday.toString(),
                      thursday: LineItemService.getDaysString().thursday.toString(),
                      friday: LineItemService.getDaysString().friday.toString(),
                      saturday: LineItemService.getDaysString().saturday.toString()
                  },
                  days: LineItemService.getDays(),
                  billable: LineItemService.getBillable(),
                  total: LineItemService.getLineItemAmount()

              };
          },
          true
          );*/

  } );