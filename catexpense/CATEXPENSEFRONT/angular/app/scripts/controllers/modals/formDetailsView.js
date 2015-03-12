'use strict';

/**
 * This controller is responsible for the formDetailsView.html page. 
 * It's main purpose deals with displaying the correct form from the dropdown, cancelling out of the form, and saving the form.
 *
 * @ngdoc function
 * @name expenseApp.controller:MainCtrl
 * @description
 * # FormDetailsCtrl
 * Controller of the expenseApp
 */
angular.module( 'expenseApp.Controllers' )
  .controller(
  'FormDetailsCtrl',
  [
      "$scope",
      "$modalInstance",
      "$modal",
      "$rootScope",
      "LineItemService",
      "ValidationService",
      "Cache",
      "ReceiptService",
      "ExpenseCategory",
      function (
          $scope,
          $modalInstance,
          $modal,
          $rootScope,
          LineItemService,
          ValidationService,
          Cache,
          ReceiptService,
          ExpenseCategory
          ) {

          /****************************************************
           *
           * Private Variables
           *
           ***************************************************/

          /**
           * determines if the user is viewing the mileage modal.
           */
          var mileageStatus = false;

          /****************************************************
           *
           * Public Variables
           *
           ***************************************************/

          /**
           * This variable determines if the div containing 'Upload Complete' will display.
           * This only applies if $scope.editingLineItem === True.
           * True -> display 'Upload Complete
           * False -> hide 'Upload Complete'
           */
          $scope.divShow = false;

          /**
           * This variable determines if the 'Save' and 'Cancel' buttons appear on the bottom of the modal.
           * True -> show 'Cancel', show 'Save' if not editing
           */
          $scope.showDetailsViewSaveCancel = true;


          /**
           * contains the list of the different types of expenses
           * set to current values in database upon page load by getExpenseCategories function
           */
          $scope.formTypes = [];

          /** 
           * Stores the list of mileage onjects creating within the mileage modal.
           */
          $scope.mileageArray = [];

          /**
           * Stores the currently viewed expense category
           */
          $scope.selectedType = LineItemService.getExpenseCategoryName();

          /**
           * Determines if the user is currently editing an expense
           * True -> expense is being edited
           * False -> expense is not being edited
           */
          $scope.editingLineItem = LineItemService.getUnderEdit();

          /****************************************************
           *
           * Private Methods
           *
           ***************************************************/

          /**
           * This method calls the Expensecategory service to gett he list of expense catgories from the database.
           */
          function getExpenseCategories() {

              //call the expenseCategory Service
              ExpenseCategory.getAllExpenseCategories().then(

                  //call to Expensecategory is a success
                  function ( success ) {

                      //store the list of expense categories to a variable
                      success.data.forEach( function ( category ) {
                          $scope.formTypes.push( category.ExpenseCategoryName );
                      } );

                  },

                  //error when calling to Expensecategory
                  function ( error ) {

                      //log the error
                      //this needs to be changed to instead make a call to LogError and store the error in the db.
                      console.log( error );
                  } );
          };


          /**
          * Called by saveNew function to perform validation
          * then proceed to close the modal upon which 
          * line item will be saved to db in submission.js
          */
          function _SaveNewMileage( returnArray, errorMsg ) {

              //if the mileage List is empty
              if ( returnArray.length === 0 )
              {
                  console.log( errorMsg );
              }

              //mileage list is not empty
              else
              {
                  console.log( 'Successfully saved report(s)' );

                  //remove the 'valid' field
                  for ( var i = 0; i < returnArray.length; i++ )
                  {
                      delete returnArray[i].valid;
                  }

                  //send the array back to the submission controller
                  $modalInstance.close( returnArray );
              }
          };

          /**
          * Called by saveNew function to perform validation
          * then proceed to close the modal upon which 
          * line item will be saved to db in submission.js
          */
          function _SaveNewPerDiem( lineitem, valid, errorMsg ) {

              var obj = [];

              //store the per diem expense object in an array
              //this is necessary because mileage currently requires an array and to reuse the same code in submission controller
              obj.push( lineitem );

              //if the expense is not valid
              if ( !valid )
              {
                  console.log( errorMsg );
              }

              //expense is valid
              else
              {
                  console.log( 'Successfully saved report(s)' );

                  //send the array back to the submission controller
                  $modalInstance.close( obj );
              }

          };

          /**
          * Called by saveNew function to perform validation
          * then proceed to close the modal upon which 
          * line item will be saved to db in submission.js
          */
          function _SaveNewOther( lineitem, valid, errorMsg ) {

              var obj = [];

              //store the per diem expense object in an array
              //this is necessary because mileage currently requires an array and to reuse the same code in submission controller
              obj.push( lineitem );

              //if the expense is not valid
              if ( !valid )
              {
                  console.log( errorMsg );
              }

                  //expense is valid
              else
              {
                  console.log( 'Successfully saved report(s)' );

                  //send the array back to the submission controller
                  $modalInstance.close( obj );
              }
          };

          /**
           * Converts the contents of the mileageArray into an array filled with 'LineItem's
           * 
           * NOTE: this is a private method
           */
          function _ConvertMileageArrayContents( oldArray ) {
              var newArray = [];
              for ( var i = 0; i < oldArray.length; i++ )
              {

                  var item = {};
                  item.Billable = oldArray[i].billable;
                  item.ExpenseCategoryId = 1;
                  item.LineItemAmount = oldArray[i].amount;
                  item.LineItemDate = oldArray[i].date;
                  item.LineItemDesc = oldArray[i].description;
                  item.LineItemMetadata = 'Miles:' + oldArray[i].miles
                                            + ',Origin:' + oldArray[i].origin
                                            + ',Destination:' + oldArray[i].destination
                                            + ',Sunday:false,Monday:false,Tuesday:false'
                                            + ',Wednesday:false,Thursday:false,Friday:false,Saturday:false';
                  item.StatusId = 1;
                  item.SubmissionId = LineItemService.getSubmissionId();
                  item.valid = oldArray[i].valid;
                  newArray.push( item );
              };

              return newArray;
          };

          /****************************************************
           *
           * Public Methods
           *
           ***************************************************/

          $scope._onLoad = function () {
              getExpenseCategories();
          };

          $scope._onLoad();


          /**
           * This method is allternative method to showing the 'save' and 'cancel' button.
           */
          $scope.showSaveAndCancel = function () {
              $scope.showDetailsViewSaveCancel = true;
          };

          /**
           * This method is allternative method to hiding the 'save' and 'cancel' button.
           */
          $scope.hideSaveAndCancel = function () {
              $scope.showDetailsViewSaveCancel = false;
          };

          /**
           * Stores the value if the suer is creating a mileage expense or not.
           */
          $scope.creatingMileage = function ( value ) {
              mileageStatus = !!value;
          };

          /**
           * Determines if the mileage form will display in the modal.
           * Returns true if the dropdown has 'Mileage' selected.
           * Returns false otherwise.
           */
          $scope.displayMileageForm = function () {

              //if the user is currently creating a mileage expense (ie they are filling out the fields, 
              // then hide or show the 'save' and 'cancel' buttons 
              if ( mileageStatus )
              {
                  $scope.hideSaveAndCancel();
              }
              else
              {
                  $scope.showSaveAndCancel();
              };

              return $scope.selectedType === 'Mileage';
          };

          /**
           * Determines if the per diem form will display in the modal.
           * Returns true if the dropdown has 'Per Diem' selected.
           * Returns false otherwise.
           */
          $scope.displayPerDiemForm = function () {

              //if the user is currently creating a per diem expense
              // then show the 'save' and 'cancel' buttons 
              if ( $scope.selectedType === 'Per Diem' )
              {
                  $scope.showSaveAndCancel();
              };
              return $scope.selectedType === 'Per Diem';
          };

          /**
           * Determines if the other form will display in the modal.
           * Returns true if the dropdown has any form selected other than 'Mileage' or 'Per Diem'.
           * Returns false otherwise.
           */
          $scope.displayOtherForm = function () {

              //if the user is currently creating an expense other than mileage or per diem
              // then show the 'save' and 'cancel' buttons 
              if ( $scope.selectedType === 'Transportation' || $scope.selectedType === 'Lodging'
              || $scope.selectedType === 'Parking' || $scope.selectedType === 'Entertainment'
              || $scope.selectedType === 'Meals' || $scope.selectedType === 'Airfare'
              || $scope.selectedType === 'Other' )
              {
                  $scope.showSaveAndCancel();
              };

              return $scope.selectedType === 'Transportation' || $scope.selectedType === 'Lodging'
              || $scope.selectedType === 'Parking' || $scope.selectedType === 'Entertainment'
              || $scope.selectedType === 'Meals' || $scope.selectedType === 'Airfare'
              || $scope.selectedType === 'Other';
          };

          /**
           * Display the policy modal depending on the expense category chosen.
           */
          $scope.getPolicy = function () {
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/policyView.html',
                  controller: 'PolicyCtrl',
                  resolve: {
                      selectedType: function () {
                          return $scope.selectedType;
                      }
                  }
              } );
          };

          /**
          * Submit the information for creating a new line item(s) from the modal to the submission page.
          */
          $scope.saveNew = function () {
              var returnArray = [];
              var errorMsg = 'please create a ' + $scope.selectedType + ' expense.';
              switch ( $scope.selectedType )
              {
                  case 'Mileage':
                      returnArray = _ConvertMileageArrayContents( $scope.mileageArray );
                      _SaveNewMileage( returnArray, errorMsg );
                      break;
                  case 'Per Diem':
                      _SaveNewPerDiem( LineItemService.getLineItem(), LineItemService.isLineItemValid(), errorMsg );
                      break;
                  default:
                      _SaveNewOther( LineItemService.getLineItem(), LineItemService.isLineItemValid(), errorMsg );
                      break;
              };
          };

          /**
           * Submit the information for updating a line item from the modal to the submission page.
           */
          $scope.saveEdit = function () {

              var returnObj;
              var errorMsg = 'please fix your ' + $scope.selectedType + ' expense.';

              switch ( $scope.selectedType )
              {
                  case 'Mileage':
                      returnObj = _ConvertMileageArrayContents( $scope.mileageArray );
                      break;
                  default:
                      returnObj = LineItemService.getLineItem();
                      break;
              };
              if ( !LineItemService.isLineItemValid() )
              {
                  console.log( 'invalid expense' );
              } else
              {
                  console.log( 'Successfully edited report' );
                  $modalInstance.close( LineItemService.getLineItem() );
              }
          };


          /**
           * Close out of the modal without sending in any of the information to the submission page.
           */
          $scope.cancel = function () {
              $modalInstance.dismiss( 'Form was cancelled.' );
          };


          /**
          * Disables the submit button based on info.
          */
          $scope.checkFile = function () {
              $( '#upload' ).prop( 'disabled', !"" === $( 'input:file' ).val() );
              $scope.divShow = false;
          };

          /**
          * post receipt image to database
          */
          $scope.upload = function () {
              $scope.noReceipt = false;
              if ( $scope.image )
              {
                  var datauri = $scope.image.dataURL + "";
                  var base64 = datauri.substring( datauri.indexOf( ',' ) + 1 );
                  var receipt = {
                      "LineItemId": LineItemService.getLineItemId(),
                      "Base64String": base64,
                      "Name": $scope.image.file.name,
                      "Type": $scope.image.file.type
                  };
                  ReceiptService.submitReceipt( receipt ).then( function ( receipt ) {
                      $( '#upload' ).prop( 'disabled', true );
                      $scope.divShow = true;
                      $rootScope.$broadcast( "addNewReceipt", receipt.data );
                      $scope.image = undefined;
                  } );
              } else
              {
                  $( '#upload' ).prop( 'disabled', true );
                  $scope.noReceipt = true;
              }
          }
      }
  ] );
