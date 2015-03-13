'use strict';

/**
 * @ngdoc function
 * @name expenseApp.controller:MileageCtrl
 * @description
 * # MainCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller(
  'MileageCtrl',
  [
      "$scope",
      "LineItemService",
      "MapQuestService",
      "ValidationService",
      "Authentication",
      "LogError",
      function (
          $scope,
          LineItemService,
          MapQuestService,
          ValidationService,
          Authentication,
          LogError
          ) {

          /****************************************************
           *
           * Private Variables
           *
           ***************************************************/

          /** 
           * Stores the index of the mileageArray of the item that is currently being viewed from the mileage List.
           */
          var mileageIndex = 0;

          /****************************************************
           *
           * Public Variables
           *
           ***************************************************/

          /**
           * This variable will be responsible for disabling the 'Get Distance' button when clicked.
           * True -> (disabled)
           * False -> (not-disabled)
           */
          $scope.calculatingDistance = false;

          /**
           * This variable is responsible for hiding the 'create mileage' button and simultaneously showing the mileage fields.
           * True -> (hide button, show fields)
           * False -> (show button, hide fields)
           */
          $scope.createMileage = false;

          /**
           * Calls the LineItemservice to see if the current Line Item is being edited
           * and this will hide and show certain html elements. 
           * True -> editing mileage (show 'save edit', and 'cancel' buttons)
           * False -> creating new mileage
           */
          $scope.editingExistingMileage = LineItemService.getUnderEdit();

          /**
           * This variable will be responsible for showing and hiding the 'Save Changes' and 'Cancel Changes' button.
           * True -> show 'Save Changes and 'Cancel Changes' buttons
           * False -> hide 'Save Changes and 'Cancel Changes' buttons
           */
          $scope.editingNewMileage = false;

          /**
           * This variable will contain the validation values for all of the fields.
           * By default, all validation is true.
           */
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

          /**
           * This variable will contain all of the input from the mileage fields in the modal.
           */
          $scope.mileageValues = {
              date: LineItemService.getLineItemDate(),
              origin: LineItemService.getOrigin(),
              destination: LineItemService.getDestination(),
              miles: LineItemService.getMiles(),
              description: LineItemService.getLineItemDesc(),
              amount: LineItemService.getLineItemAmount(),
              billable: LineItemService.getBillable()
          };

          /****************************************************
           *
           * Private Methods
           *
           ***************************************************/

          /**
           * This method will reset the mileage fields to their default values.
           */
          function resetMileage() {
              $scope.mileageValues = {
                  date: '',
                  origin: '',
                  destination: '',
                  distance: 0,
                  description: '',
                  amount: '0.00',
                  billable: false,
                  totalMiles: 0
              };

              //reset validation
              resetValidation();
          };

          /**
           * This method will reset the Validation to its default values.
           */
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

          /****************************************************
           *
           * Public Methods
           *
           ***************************************************/

          /**
           * This method will contain all of the necessary code that will run on page load.
           */
          $scope._onLoad = function () {

              /**
               * If the user is editing a mileage that was already created (ie when they clicked the edit icon fro the submission page)
               * Then hide the 'create mileage' button and show the fields.
               *
               */
              if ( $scope.editingExistingMileage === true )
              {
                  $scope.createMileage = true;
              }

          };

          $scope._onLoad();

          /**
           * When the user clicks the 'Create Mileage' button, this method will the button just clicked, 
           * display the fields, hide the 'save' and 'cancel' buttons, and send a notice back to the 
           * parent controller that the user is currently creating a mileage expense.
           */
          $scope.startMileage = function () {
              $scope.createMileage = true;
              $scope.hideSaveAndCancel();
              $scope.creatingMileage( true );
          };

          /**
           * This method will run after the user clicks on the edit icon from the mileageList within the modal.
           * This method will populate the fields with the specified mileage object information so the user can update them.
           * Also, the 'Save Changes' and the 'Cancel Changes' will become visible.
           */
          $scope.editMileage = function ( index ) {

              //store the targetted index as the currently viewed index
              mileageIndex = index;

              //set the fields to the mileage object information
              $scope.mileageValues.date = $scope.mileageArray[mileageIndex].date;
              $scope.mileageValues.origin = $scope.mileageArray[mileageIndex].origin;
              $scope.mileageValues.destination = $scope.mileageArray[mileageIndex].destination;
              $scope.mileageValues.miles = $scope.mileageArray[mileageIndex].miles;
              $scope.mileageValues.description = $scope.mileageArray[mileageIndex].description;
              $scope.mileageValues.amount = $scope.mileageArray[mileageIndex].amount;
              $scope.mileageValues.billable = $scope.mileageArray[mileageIndex].billable;

              //show the required buttons
              $scope.editingNewMileage = true;
          };

          /**
           * This method will run after the user clicks on the copy icon fro the mileageList within the modal.
           * This method will populate the fields with the specified mileage object information so the user can add a duplicate entry to the list.
           * Also, the 'Save As New Mileage' and the 'Cancel Changes' will become visible.
           */
          $scope.copyMileage = function ( index ) {

              //store the targetted index as the currently viewed index
              mileageIndex = index;

              //set the fields to the mileage object information
              $scope.mileageValues.date = $scope.mileageArray[mileageIndex].date;
              $scope.mileageValues.origin = $scope.mileageArray[mileageIndex].origin;
              $scope.mileageValues.destination = $scope.mileageArray[mileageIndex].destination;
              $scope.mileageValues.miles = $scope.mileageArray[mileageIndex].miles;
              $scope.mileageValues.description = $scope.mileageArray[mileageIndex].description;
              $scope.mileageValues.amount = $scope.mileageArray[mileageIndex].amount;
              $scope.mileageValues.billable = $scope.mileageArray[mileageIndex].billable;

              //show the required buttons
              $scope.startMileage();
          };

          /**
           * This method will run after the user clicks on the delete icon fro the mileageList within the modal.
           * The entry within the mileageList will be removed.
           */
          $scope.deleteMileage = function ( index ) {

              //remove the mileage object from the mileage List
              $scope.mileageArray.splice( index, 1 );

              //set the currently viewed index to 0
              mileageIndex = 0;
          };

          /**
           * This method will run when the user clicks the 'Get Distance' button.
           * This method will take the origin and destination fields and find the distance between them using MapQuest's API.
           */
          $scope.getDistance = function () {

              //disable the 'Get Distance' button so the user cannot click on it multiple times
              $scope.calculatingDistance = true;

              //store the origin and destination into an object
              var item = {
                  from: $scope.mileageValues.origin,
                  to: $scope.mileageValues.destination
              };

              //call the MapQuest Service
              MapQuestService.getDistance( item ).then(

                  //call to Mapquest was a success
                  function ( success ) {

                      //re-enable the button
                      $scope.calculatingDistance = false;

                      //There was a problem with either the origin or destination (or both) and wasn't recognized by Mapquest
                      if ( success.data.info.statuscode !== 0 )
                      {
                          $scope.mileageValidation.miles.valid = false;
                          $scope.mileageValidation.miles.message = success.data.info.messages[0];
                      }

                          //origin and destination were both recognized by Mapquest, distance field will now be filled with the result obtained
                      else
                      {
                          $scope.mileageValues.miles = success.data.route.distance;
                          $scope.mileageValidation.miles.valid = true;
                          $scope.mileageValidation.miles.message = 'This field is valid.';
                      }

                  },

                  //call to MapQuest failed
                  function ( error ) {

                      //re-enable the button
                      $scope.calculatingDistance = false;

                      //create an errorObj
                      var errorObj = {
                          username: Authentication.getUser(),
                          endpoint: error.config.url,
                          errormessage: error.statusText
                      };

                      //store the errorObj in the Database
                      LogError.logError( errorObj );
                  } );
          };

          /**
           * This method will calculate the reimbursement amount based on the distance and update the field accordingly.
           */
          $scope.getAmount = function () {

              //if the user inputs a non-numeric value as the distance, then automatically put in 0 as the amount instead of 'NaN'
              if ( isNaN( $scope.mileageValues.miles ) )
              {
                  $scope.mileageValues.amount = 0;
              }

                  //compute the amount to be equal to the distance * 0.40 and fix this new value to two decimal places
                  //eventually this 0.40 value should be modifyable from the admin tab
              else
              {
                  $scope.mileageValues.amount = ( $scope.mileageValues.miles * 0.40 ).toFixed( 2 );
              }
          };

          /**
           * This method will run when the user clicks on the 'Save and new Mileage' button.
           * This method will take the information in the mileage fields, validate them, and then add them to the mileageList if the information is valid.
           */
          $scope.saveAsNewMileage = function () {

              //create a metadata value which contains the origin, destination, and distance
              var metadata = 'Miles:' + $scope.mileageValues.miles +
                            ',Origin:' + $scope.mileageValues.origin +
                            ',Destination:' + $scope.mileageValues.destination +
                            ',Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';

              //create the LineItem object that will be passed in for validation
              var lineitem = {
                  LineItemDate: $scope.mileageValues.date,
                  LineItemDesc: $scope.mileageValues.description,
                  LineItemAmount: $scope.mileageValues.amount,
                  LineItemMetadata: metadata
              };

              //create an origin object to pass into MapQuest
              var origin = {
                  location: $scope.mileageValues.origin
              };

              //create a destination object to pass into MapQuest
              var destination = {
                  location: $scope.mileageValues.destination
              };

              //call the MapQuest Service to validate the origin
              MapQuestService.getLocation( origin ).then(

                  //call to MapQuest successful
                  function ( successOrigin ) {

                      //call MapQuest Service to validate destination
                      MapQuestService.getLocation( destination ).then(

                          //call to MapQuest successful
                          function ( successDestination ) {

                              //origin is invalid
                              if ( successOrigin.data.results[0].locations.length === 0 )
                              {
                                  $scope.mileageValidation.origin.valid = false;
                                  $scope.mileageValidation.origin.message = 'Invalid Origin.';
                              }

                                  //origin is valid
                              else
                              {
                                  $scope.mileageValidation.origin.valid = true;
                                  $scope.mileageValidation.origin.message = 'This field is valid.';
                              };

                              //destination is invalid
                              if ( successDestination.data.results[0].locations.length === 0 )
                              {
                                  $scope.mileageValidation.destination.valid = false;
                                  $scope.mileageValidation.destination.message = 'Invalid Destination.';
                              }

                                  //destination is valid
                              else
                              {
                                  $scope.mileageValidation.destination.valid = true;
                                  $scope.mileageValidation.destination.message = 'This field is valid.';
                              };

                              //if both origin and destination are valid
                              if ( $scope.mileageValidation.origin.valid && $scope.mileageValidation.destination.valid )
                              {
                                  //perform validation on the LineItem object
                                  $scope.mileageValidation = ValidationService.validateMileage( lineitem );

                                  //if the fields are all valid
                                  if ( $scope.mileageValidation.validInput )
                                  {
                                      //add in a 'valid' key to the mileageValues variable
                                      $scope.mileageValues.valid = $scope.mileageValidation.validInput;

                                      //push the mileage obj to the mileageArray
                                      $scope.mileageArray.push( $scope.mileageValues );

                                      //clear all of the fields
                                      resetMileage();

                                      //show the 'create mileage' button and hide the fields
                                      $scope.createMileage = false;

                                      //show the 'save' and 'cancel' buttons
                                      $scope.showSaveAndCancel();

                                      //tell the parent controller that the user is currently not creating/modifying a mileage expense
                                      $scope.creatingMileage( false );
                                  };
                              };
                          },

                          //call to MapQuest failed
                          function ( errorDestination ) {

                              //creating error object
                              var errorObj = {
                                  username: Authentication.getUser(),
                                  endpoint: errorDestination.config.url,
                                  errormessage: errorDestination.statusText
                              };

                              //store the error in the database
                              LogError.logError( errorObj );
                          } );
                  },

                  //call to MapQuest failed
                  function ( errorOrigin ) {

                      //creating error object
                      var errorObj = {
                          username: Authentication.getUser(),
                          endpoint: errorOrigin.config.url,
                          errormessage: errorOrigin.statusText
                      };

                      //store the error in the database
                      LogError.logError( errorObj );
                  } );
          };

          /**
           * This method will run when the user clicks the 'save changes' button that appears after the user clicked the edit icon in the mileageList.
           * This method will perform validation and the, if valid, the mileage being editied will be updated.
           */
          $scope.saveChanges = function () {

              //create a metadata value which contains the origin, destination, and distance
              var metadata = 'Miles:' + $scope.mileageValues.miles +
                            ',Origin:' + $scope.mileageValues.origin +
                            ',Destination:' + $scope.mileageValues.destination +
                            ',Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';

              //create the LineItem object that will be passed in for validation
              var lineitem = {
                  LineItemDate: $scope.mileageValues.date,
                  LineItemDesc: $scope.mileageValues.description,
                  LineItemAmount: $scope.mileageValues.amount,
                  LineItemMetadata: metadata
              };

              //perform validation on the LineItem object
              $scope.mileageValidation = ValidationService.validateMileage( lineitem );

              //if the updated information is valid, update the mileage in the array with the appropriate values.
              if ( $scope.mileageValidation.validInput )
              {
                  //update the mileage in the array
                  $scope.mileageArray[mileageIndex].date = $scope.mileageValues.date;
                  $scope.mileageArray[mileageIndex].origin = $scope.mileageValues.origin;
                  $scope.mileageArray[mileageIndex].destination = $scope.mileageValues.destination;
                  $scope.mileageArray[mileageIndex].distance = $scope.mileageValues.distance;
                  $scope.mileageArray[mileageIndex].description = $scope.mileageValues.description;
                  $scope.mileageArray[mileageIndex].amount = $scope.mileageValues.amount;
                  $scope.mileageArray[mileageIndex].billable = $scope.mileageValues.billable;

                  //clear out the fields
                  resetMileage();

                  //hide 'save changes' and 'cancel changes' button
                  $scope.editingNewMileage = false;

                  //tell the parent controller that the user is currently not creating/modifying a mileage expense
                  $scope.creatingMileage( false );
              }
          };

          /**
           * This method will run when the user clicks the 'cancel' button that appears after the clicked the 'create new mileage' button.
           * This method will discard any information inputted and return the user back to the state they were before they clicked the 'create mileage' button.
           */
          $scope.cancelNewMileage = function () {

              //discard information in fields
              resetMileage();

              //display the 'create mileage' button and hide the fields
              $scope.createMileage = false;

              //display the 'save' and 'cancel' buttons
              $scope.showSaveAndCancel();

              //tell the parent controller that the user is currently not creating/modifying a mileage expense
              $scope.creatingMileage( false );
          };

          /**
          * This method will run when the user clicks the 'cancel changes' button when editing a mileage from the list.
          * This method will discard any changes and return the user back to displaying the 'create mileage' button and the list.
          */
          $scope.cancelChanges = function () {

              //discard information in fields
              resetMileage();

              //hide 'save changes' and 'cancel changes' buttons
              $scope.editingNewMileage = false;

              //tell the parent controller that the user is currently not creating/modifying a mileage expense
              $scope.creatingMileage( false );
          };

          

          

          /**
           * Watch the form and updates the mileage values based on what is inputted in the fields
           * Note: this only applies when editing an existing line item
           */
          $scope.$watch(
              'mileageValues',
              function ( newValue, oldValue ) {
                  $scope.getAmount();
                  if ( newValue !== oldValue && $scope.editingLineItem )
                  {

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

          //==============================================================================//
          // THESE FUNCTIONS ARE FOR THE DATEPICKER
          // IDEALLY WILL BE REFACTORED LATER ON
          //==============================================================================//

          /**
          * set the date to today
          */
          $scope.today = function () {
              $scope.otherValues.date = new Date();
          };

          /**
          * clear the date field
          */
          $scope.clear = function () {
              $scope.$scope.otherValues.date = null;
          };

          /**
          * sets the minimum date selectable
          * currently set to make sunday of the week the minumum
          * call this function upon page load
          */
          $scope.toggleMin = function () {
              $scope.minDate = LineItemService.getDaysString().sunday;
          };
          $scope.toggleMin();

          /**
          * sets the maximum date selectable
          * currently sets the saturday of the week the maximum
          * call this function upon page load
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
          * the display format for dates from mileageForm datepicker
          */
          $scope.dateOptions = {
              formatYear: 'yy',
              startingDay: 1
          };

          /**
          * displays the date in the selected format
          * currently defaults to 'dd-MMMM-yyyy' ie: 01-January-2015
          */
          $scope.formats = ['yyyy/MM/dd', 'EEEE - MMM. dd/yyyy', 'dd.MM.yyyy', 'shortDate'];
          $scope.format = $scope.formats[1];

      }
  ] );

