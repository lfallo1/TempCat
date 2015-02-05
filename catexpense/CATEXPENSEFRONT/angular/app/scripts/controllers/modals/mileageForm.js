﻿'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MileageCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp' )
  .controller( 'MileageCtrl', function ( $scope, LineItemService, MapQuestService, ValidationService ) {

      //this variable will be responsible for disabling the 'Get Distance' button when clicked
      $scope.calculatingDistance = false;

      //determine if the modal is editing an existing lineitem or creating new one(s)
      $scope.editingExistingMileage = LineItemService.getUnderEdit();

      //disables the 'Save Changes' and 'Cancel Changes' buttons if the user is not editing an item from the array
      $scope.editingNewMileage = false;

      //stores the ides of the mileageArray of the item that is being edited
      var mileageIndex = 0;


      //default validation for fields
      $scope.mileageValidation = {
          date: {
              valid: true,
              message: 'This field is valid.'
          },
          origin: {
              valid: true,
              message: 'This field is valid.'
          },
          destination: {
              valid: true,
              message: 'This field is valid.'
          },
          miles: {
              valid: true,
              message: 'This field is valid.'
          },
          description: {
              valid: true,
              message: 'This field is valid.'
          },
          validInput: true
      };


      // default values when the modal is opened
      $scope.mileageValues = {
          date: LineItemService.getLineItemDate(),
          origin: LineItemService.getOrigin(),
          destination: LineItemService.getDestination(),
          miles: LineItemService.getMiles(),
          description: LineItemService.getLineItemDesc(),
          amount: LineItemService.getLineItemAmount(),
          billable: LineItemService.getBillable()
      };

      //determine whether the user is editing the form
      /* var isUnderEdit = function () {
           if ( $scope.editForm ) {
               setFormValuesForEdit();
           } else {
               return;
           }
       };
       isUnderEdit();*/

      /**
       * Edit the mileage expense from the array
       */
      $scope.editMileage = function ( index ) {
          mileageIndex = index;
          $scope.mileageValues.date = $scope.mileageArray[mileageIndex].date;
          $scope.mileageValues.origin = $scope.mileageArray[mileageIndex].origin;
          $scope.mileageValues.destination = $scope.mileageArray[mileageIndex].destination;
          $scope.mileageValues.miles = $scope.mileageArray[mileageIndex].miles;
          $scope.mileageValues.description = $scope.mileageArray[mileageIndex].description;
          $scope.mileageValues.amount = $scope.mileageArray[mileageIndex].amount;
          $scope.mileageValues.billable = $scope.mileageArray[mileageIndex].billable;
          $scope.editingNewMileage = true;
      };

      /**
       * Remove the mileage expense from the list of mileage expenses.
       * Will clear out the fields if deleting the expense that the suer is also currently editing.
       */
      $scope.deleteMileage = function ( index ) {
          if ( $scope.editingNewMileage && mileageIndex === index ) {
              resetMileage();
          };
          $scope.mileageArray.splice( index, 1 );
          if ( $scope.mileageArray.length <= 0 ) {
              $scope.editingNewMileage = false;
          }
          mileageIndex = 0;
      };

      /**
       * Calculates the distance between the origin and destination and sets that value in the distance field.
       */
      $scope.getDistance = function () {

          $scope.calculatingDistance = true;
          var item = {
              from: $scope.mileageValues.origin,
              to: $scope.mileageValues.destination
          };

          MapQuestService.getDistance( item ).then(
              function ( success ) {
                  $scope.calculatingDistance = false;
                  if ( success.data.info.statuscode !== 0 ) {
                      $scope.mileageValidation.miles.valid = false;
                      $scope.mileageValidation.miles.message = success.data.info.messages[0];
                  } else {
                      $scope.mileageValues.miles = success.data.route.distance;
                      //getAmount();
                      $scope.mileageValidation.miles.valid = true;
                      $scope.mileageValidation.miles.message = 'This field is valid.';
                  }

              }, function ( error ) {
                  console.log( error );
                  $scope.calculatingDistance = false;
              } );
      };

      /**
       * Calulate the amount based on the distance and reimbursement amount
       */
      $scope.getAmount = function () {
          $scope.mileageValues.amount = $scope.mileageValues.miles * 0.40;
      };

      /**
       * Save the current mileage information to the list of mileage expenses.
       */
      $scope.saveAsNewMileage = function () {

          var metadata = 'Miles:' + $scope.mileageValues.miles +
                        ',Origin:' + $scope.mileageValues.origin +
                        ',Destination:' + $scope.mileageValues.destination +
                        ',Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';

          var lineitem = {
              LineItemDate: $scope.mileageValues.date,
              LineItemDesc: $scope.mileageValues.description,
              LineItemAmount: $scope.mileageValues.amount,
              LineItemMetadata: metadata
          };

          var origin = {
              location: $scope.mileageValues.origin
          };

          var destination = {
              location: $scope.mileageValues.destination
          };

          MapQuestService.getLocation( origin ).then(
              function ( successOrigin ) {
                  MapQuestService.getLocation( destination ).then(
                      function ( successDestination ) {
                          if ( successOrigin.data.results[0].locations.length === 0 ) {
                              $scope.mileageValidation.origin.valid = false;
                              $scope.mileageValidation.origin.message = 'Invalid Origin.';
                          } else {
                              $scope.mileageValidation.origin.valid = true;
                              $scope.mileageValidation.origin.message = 'This field is valid.';
                          };

                          if ( successDestination.data.results[0].locations.length === 0 ) {
                              $scope.mileageValidation.destination.valid = false;
                              $scope.mileageValidation.destination.message = 'Invalid Destination.';
                          } else {
                              $scope.mileageValidation.destination.valid = true;
                              $scope.mileageValidation.destination.message = 'This field is valid.';
                          };

                          if ( $scope.mileageValidation.origin.valid && $scope.mileageValidation.destination.valid ) {
                              $scope.mileageValidation = ValidationService.validateMileage( lineitem );
                              if ( $scope.mileageValidation.validInput ) {
                                  $scope.mileageValues.valid = $scope.mileageValidation.validInput;
                                  $scope.mileageArray.push( $scope.mileageValues );

                                  resetMileage();
                              };
                          };
                      }, function ( errorDestination ) {
                          console.log( errorDestination );
                      } );
              }, function ( errorOrigin ) {
                  console.log( errorOrigin );
              } );




          /*$scope.mileageValidation = ValidationService.validateMileage( lineitem );
          if ( $scope.mileageValidation.validInput ) {
              $scope.mileageValues.valid = $scope.mileageValidation.validInput;
              $scope.mileageArray.push( $scope.mileageValues );

              resetMileage();
          }*/
      };

      /**
       * Save the changes made to the mileage expense.
       */
      $scope.saveChanges = function () {
          var metadata = 'Miles:' + $scope.mileageValues.miles +
                        ',Origin:' + $scope.mileageValues.origin +
                        ',Destination:' + $scope.mileageValues.destination +
                        ',Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';

          var lineitem = {
              LineItemDate: $scope.mileageValues.date,
              LineItemDesc: $scope.mileageValues.description,
              LineItemAmount: $scope.mileageValues.amount,
              LineItemMetadata: metadata
          };

          $scope.mileageValidation = ValidationService.validateMileage( lineitem );
          if ( $scope.mileageValidation.validInput ) {
              $scope.mileageArray[mileageIndex].date = $scope.mileageValues.date;
              $scope.mileageArray[mileageIndex].origin = $scope.mileageValues.origin;
              $scope.mileageArray[mileageIndex].destination = $scope.mileageValues.destination;
              $scope.mileageArray[mileageIndex].distance = $scope.mileageValues.distance;
              $scope.mileageArray[mileageIndex].description = $scope.mileageValues.description;
              $scope.mileageArray[mileageIndex].amount = $scope.mileageValues.amount;
              $scope.mileageArray[mileageIndex].billable = $scope.mileageValues.billable;
              resetMileage();
              $scope.editingNewMileage = false;
          }
      };

      $scope.discardChanges = function () {
          //discard changes
          resetValues();
          $scope.editingNewMileage = false;
      };

      function resetMileage() {
          $scope.mileageValues = {
              date: '',
              origin: '',
              destination: '',
              distance: 0,
              description: '',
              amount: 0,
              billable: false,
              totalMiles: 0
          };
          resetValidation();
      };

      function resetValidation() {
          $scope.mileageValidation = {
              date: {
                  valid: true,
                  message: 'This field is valid.'
              },
              origin: {
                  valid: true,
                  message: 'This field is valid.'
              },
              destination: {
                  valid: true,
                  message: 'This field is valid.'
              },
              miles: {
                  valid: true,
                  message: 'This field is valid.'
              },
              description: {
                  valid: true,
                  message: 'This field is valid.'
              },
              validInput: true
          };
      };

      /**
       * Watch the form and updates the mileage values based on what is inputted in the fields
       * Note: this only applies when editing an existing line item
       *
       */
      $scope.$watch(
          'mileageValues',
          function ( newValue, oldValue ) {
              $scope.getAmount();
              if ( newValue !== oldValue && $scope.editingLineItem ) {

                  LineItemService.setLineItemDate( $scope.mileageValues.date );
                  LineItemService.setLineItemDesc( $scope.mileageValues.description );
                  LineItemService.setOrigin( $scope.mileageValues.origin );
                  LineItemService.setDestination( $scope.mileageValues.destination );
                  LineItemService.setMiles( $scope.mileageValues.miles );
                  LineItemService.setLineItemAmount( $scope.mileageValues.amount );
                  LineItemService.setBillable( $scope.mileageValues.billable );
                  $scope.mileageValidation = ValidationService.validateMileage( LineItemService.getLineItem() );

                  $scope.mileageArray[0] = $scope.mileageValues;
                  $scope.mileageArray[0].valid = $scope.mileageValidation.validInput;
              }
          },
          true
      );

      //when user wants to edit their mileage form,
      //set the values in the form to what was previously entered
      //for the particular entry
      /*function setFormValuesForEdit() {
          $scope.mileageValues.date = LineItemService.getEndingWeek();
          $scope.mileageValues.origin = LineItemService.getOrigin();
          $scope.mileageValues.destination = LineItemService.getDestination();
          $scope.mileageValues.distance = LineItemService.getMiles();
          $scope.mileageValues.description = LineItemService.getLineItemDesc();
          $scope.mileageValues.amount = LineItemService.getLineItemAmount();
          $scope.mileageValues.billable = LineItemService.getBillable();
          $scope.mileageValues.totalMiles = 0;
      };*/


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