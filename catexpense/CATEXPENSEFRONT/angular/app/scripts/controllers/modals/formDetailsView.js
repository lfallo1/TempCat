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
angular.module('expenseApp.Controllers')
  .controller('FormDetailsCtrl', ["$scope", "$modalInstance", "$modal", "$rootScope", "LineItemService", "ValidationService", "Application", "ReceiptService", function ($scope, $modalInstance, $modal, $rootScope, LineItemService, ValidationService, Application, ReceiptService) {

      $scope.divShow = false;

      /**
      * contains the list of the different types of expenses
      */
      $scope.formTypes = [
          'Mileage',
          'Per Diem',
          'Transportation',
          'Lodging',
          'Parking',
          'Entertainment',
          'Meals',
          'Airfare',
          'Other'
      ];

      /** 
      * these arrays will store the list of expenses that will be submitted
      * they will be modified by MileageCtrl, PerDiemCtrl, and OtherCtrl
      */
      $scope.mileageArray = [];
      $scope.perDiemArray = [];
      $scope.otherArray = [];

      /**
      * default expense category chosen
      */
      $scope.selectedType = LineItemService.getExpenseCategoryName();
      /**
      * is the user currently editing a line item?
      */
      $scope.editingLineItem = LineItemService.getUnderEdit();

      $scope.addNewReceipt = false;

      /**
       * Determines if the mileage form will display in the modal.
       * Returns true if the dropdown has 'Mileage' selected.
       * Returns false otherwise.
       */
      $scope.displayMileageForm = function () {
          return $scope.selectedType === 'Mileage';
      };

      /**
       * Determines if the per diem form will display in the modal.
       * Returns true if the dropdown has 'Per Diem' selected.
       * Returns false otherwise.
       */
      $scope.displayPerDiemForm = function () {
          return $scope.selectedType === 'Per Diem';
      };

      /**
       * Determines if the other form will display in the modal.
       * Returns true if the dropdown has any form selected other than 'Mileage' or 'Per Diem'.
       * Returns false otherwise.
       */
      $scope.displayOtherForm = function () {
          return $scope.displayMileageForm() === false && $scope.displayPerDiemForm() === false;
      };

      /**
       * Reset the submission values to their defaults.
       */
      $scope.resetValues = function () {
          LineItemService.setExpenseCategoryName($scope.selectedType);
      };

      /**
       * Display the policy modal depending on the expense category chosen.
       */
      $scope.getPolicy = function () {
          var modalInstance = $modal.open({
              //templateUrl: 'views/modals/policyView.html',
              templateUrl: 'Views/HotTowel/views/modals/policyView.html',
              controller: 'PolicyCtrl',
              resolve: {
                  selectedType: function () {
                      return $scope.selectedType;
                  }
              }
          });

          modalInstance.result.then(
              function (successMessage) {
                  //console.log( successMessage );
              },
              function (errorMessage) {
                  //console.log( errorMessage );
              }
          );
      };

      /**
      * Submit the information for creating a new line item(s) from the modal to the submission page.
      */
      $scope.saveNew = function () {
          var returnArray = [];
          var errorMsg = 'please create a ' + $scope.selectedType + ' expense.';
          ReceiptService.setAddReceipt($scope.addNewReceipt);
          switch ($scope.selectedType) {
              case 'Mileage':
                  returnArray = _ConvertMileageArrayContents($scope.mileageArray);
                  _SaveNewMileage(returnArray, errorMsg);
                  break;
              case 'Per Diem':
                  returnArray = _ConvertPerDiemArrayContents($scope.perDiemArray);
                  _SaveNewPerDiem(returnArray, errorMsg);
                  break;
              case 'Transportation':
              case 'Lodging':
              case 'Parking':
              case 'Entertainment':
              case 'Meals':
              case 'Airfare':
              case 'Other':
                  returnArray = _ConvertOtherArrayContents(LineItemService.getLineItem(), $scope.otherArray[0].valid);
                  _SaveNewOther(returnArray, errorMsg);
                  break;
              default:
                  returnArray = [{ msg: 'something went wrong' }];
          };
      };

      /**
      * Called by saveNew function to perform validation
      * then proceed to close the modal upon which 
      * line item will be saved to db in submission.js
      */
      function _SaveNewMileage(returnArray, errorMsg) {
          if (returnArray.length === 0) {
              console.log(errorMsg);
          } else {
              console.log('Successfully saved report(s)');
              for (var i = 0; i < returnArray.length; i++) {
                  delete returnArray[i].valid;
              }
              $modalInstance.close(returnArray);
          }
      };

      /**
      * Called by saveNew function to perform validation
      * then proceed to close the modal upon which 
      * line item will be saved to db in submission.js
      */
      function _SaveNewPerDiem(returnArray, errorMsg) {
          if (returnArray.length === 0) {
              console.log(errorMsg);
          } else if (!returnArray[0].valid) {
              console.log('invalid per diem');
          } else {
              console.log('Successfully saved report(s)');
              delete returnArray[0].valid;
              $modalInstance.close(returnArray);
          }

      };

      /**
      * Called by saveNew function to perform validation
      * then proceed to close the modal upon which 
      * line item will be saved to db in submission.js
      */
      function _SaveNewOther(returnArray, errorMsg) {
          if (returnArray.length === 0) {
              console.log(errorMsg);
          } else if (!returnArray[0].valid) {
              console.log('invalid other');
          } else {
              console.log('Successfully saved report(s)');
              delete returnArray[0].valid;
              $modalInstance.close(returnArray);
          }

      };

      /**
       * Converts the contents of the mileageArray into an array filled with 'LineItem's
       * 
       * NOTE: this is a private method
       */
      function _ConvertMileageArrayContents(oldArray) {
          var newArray = [];
          for (var i = 0; i < oldArray.length; i++) {

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
              newArray.push(item);



              /*( function ( i ) {
                  LineItemService.resetLineItem();
                  LineItemService.setLineItemDate( oldArray[i].date );
                  LineItemService.setLineItemDesc( oldArray[i].description );
                  LineItemService.setOrigin( oldArray[i].origin );
                  LineItemService.setDestination( oldArray[i].destination );
                  LineItemService.setMiles( oldArray[i].miles );
                  LineItemService.setLineItemAmount( oldArray[i].amount );
                  LineItemService.setBillable( oldArray[i].billable );
                  newArray.push( LineItemService.getLineItem() );
              } )( i );*/


          };

          return newArray;
      };

      /**
       * Converts the contents of the perdiemArray into an array filled with 'LineItem's
       * 
       * NOTE: this is a private method
       */
      function _ConvertPerDiemArrayContents(oldArray) {
          var newArray = [];
          for (var i = 0; i < oldArray.length; i++) {
              LineItemService.setExpenseCategoryName($scope.selectedType);
              LineItemService.setDays(oldArray[i].days);
              LineItemService.setLineItemAmount(oldArray[i].amount);
              LineItemService.setBillable(oldArray[i].billable);
              LineItemService.setLineItemDate(oldArray[i].lineItemDate);
              newArray.push(LineItemService.getLineItem());
              newArray[i].valid = oldArray[i].valid;
          };
          return newArray;
      };

      /**
       * Converts the contents of the perdiemArray into an array filled with 'LineItem's
       * 
       * NOTE: this is a private method
       */
      function _ConvertOtherArrayContents(oldArray, valid) {
          var newArray = [];
          /*var item = {};
          item.Billable = oldArray[i].billable;
          item.LineItemAmount = oldArray[i].amount;
          item.LineItemMetadata = 'Miles:0,Origin:,Destination:,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
          item.StatusId = 1;
          item.SubmissionId = LineItemService.getSubmissionId();
          newArray.push( item );*/

          //LineItemService.resetLineItem();
          //LineItemService.setExpenseCategoryName($scope.selectedType);
          //LineItemService.setLineItemDate(oldArray[i].date);
          //LineItemService.setLineItemDesc(oldArray[i].description);
          //LineItemService.setLineItemAmount(oldArray[i].amount);
          //LineItemService.setBillable(oldArray[i].billable);
          newArray.push(LineItemService.getLineItem());
          newArray[0].valid = valid;
          return newArray;
      };

      /**
       * Submit the information for updating a line item from the modal to the submission page.
       */
      $scope.saveEdit = function () {

          var returnObj;
          var errorMsg = 'please fix your ' + $scope.selectedType + ' expense.';
          switch ($scope.selectedType) {
              case 'Mileage':
                  returnObj = _ConvertMileageArrayContents($scope.mileageArray);
                  break;
              case 'Per Diem':
                  returnObj = _ConvertPerDiemArrayContents($scope.perDiemArray);
                  break;
              case 'Transportation':
              case 'Lodging':
              case 'Parking':
              case 'Entertainment':
              case 'Meals':
              case 'Airfare':
              case 'Other':
                  returnObj = _ConvertOtherArrayContents(LineItemService.getLineItem(), $scope.otherArray[0].valid);
                  break;
              default:
                  returnObj = { msg: 'something went wrong' };
          };
          if (undefined === returnObj) {
              console.log('you didnt make any changes');
          }
          else if (!returnObj[0].valid) {
              console.log('invalid expense');
          } else {
              console.log('Successfully edited report');
              for (var i = 0; i < returnObj.length; i++) {
                  delete returnObj[i].valid;
              }
              $modalInstance.close(LineItemService.getLineItem());
          }
      };


      /**
       * Close out of the modal without sending in any of the information to the submission page.
       */
      $scope.cancel = function () {
          $modalInstance.dismiss('Form was cancelled.');
      };


      /**
      * Disables the submit button based on info.
      */
      $scope.checkFile = function () {
          $('#upload').prop('disabled', !"" === $('input:file').val());
          $scope.divShow = false;
      };

      /**
      * post receipt image to database
      */
      $scope.upload = function () {
          $scope.noReceipt = false;
          if ($scope.image) {
              var datauri = $scope.image.dataURL + "";
              var base64 = datauri.substring(datauri.indexOf(',') + 1);
              var receipt = {
                  "LineItemId": LineItemService.getLineItemId(),
                  "Base64String": base64,
                  "Name": $scope.image.file.name,
                  "Type": $scope.image.file.type
              };
              ReceiptService.submitReceipt(receipt).then(function (receipt) {
                  $('#upload').prop('disabled', true);
                  $scope.divShow = true;
                  $rootScope.$broadcast("addNewReceipt", receipt.data);
                  $scope.image = undefined;
              });
          } else {
              $('#upload').prop('disabled', true);
              $scope.noReceipt = true;
          }
      }
  }]);