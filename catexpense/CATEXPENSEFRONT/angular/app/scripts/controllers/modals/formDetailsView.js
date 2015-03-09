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
  .controller('FormDetailsCtrl', ["$scope", "$modalInstance", "$modal", "$rootScope", "LineItemService", "ValidationService", "Application", "ReceiptService", "ExpenseCategory", function ($scope, $modalInstance, $modal, $rootScope, LineItemService, ValidationService, Application, ReceiptService, ExpenseCategory) {

      $scope.divShow = false;

      $scope.showDetailsViewSaveCancel = true;

      $scope.showDetailsViewSaveCancel = true;
      $scope.showSaveAndCancel = function () {
          $scope.showDetailsViewSaveCancel = true;
      };
      $scope.hideSaveAndCancel = function () {
          $scope.showDetailsViewSaveCancel = false;
      };

      //stores the value if the user is currently creating a mileage expense
      var mileageStatus = false;
      $scope.creatingMileage = function ( value ) {
          mileageStatus = !!value;
      };


      /**
      * contains the list of the different types of expenses
      * set to current values in database upon page load by getExpenseCategories function
      */
      $scope.formTypes = [];

      /** 
      * these arrays will store the list of expenses that will be submitted
      * they will be modified by MileageCtrl, PerDiemCtrl, and OtherCtrl
      */
      $scope.mileageArray = [];

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
          if ( mileageStatus ) {
              $scope.hideSaveAndCancel();
          } else {
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
          if ( $scope.selectedType === 'Per Diem' ) {
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
          if ( $scope.selectedType === 'Transportation' || $scope.selectedType === 'Lodging'
          || $scope.selectedType === 'Parking' || $scope.selectedType === 'Entertainment'
          || $scope.selectedType === 'Meals' || $scope.selectedType === 'Airfare'
          || $scope.selectedType === 'Other' ) {
              $scope.showSaveAndCancel();
          };
          return $scope.selectedType === 'Transportation' || $scope.selectedType === 'Lodging'
          || $scope.selectedType === 'Parking' || $scope.selectedType === 'Entertainment'
          || $scope.selectedType === 'Meals' || $scope.selectedType === 'Airfare'
          || $scope.selectedType === 'Other';
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
              templateUrl: 'Views/Home/views/modals/policyView.html',
              controller: 'PolicyCtrl',
              resolve: {
                  selectedType: function () {
                      return $scope.selectedType;
                  }
              }
          });
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
                  _SaveNewPerDiem(LineItemService.getLineItem(), LineItemService.isLineItemValid(), errorMsg);
                  break;
              default:
                  _SaveNewOther(LineItemService.getLineItem(), LineItemService.isLineItemValid(), errorMsg);
                  break;
          };
      };

      function getExpenseCategories() {
          ExpenseCategory.getAllExpenseCategories().then(
              function (success) {
                  success.data.forEach(function (category) {
                      $scope.formTypes.push(category.ExpenseCategoryName);
                  });
              },
              function (error) {
                  console.log(error);
              });
      }
      getExpenseCategories();

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
      function _SaveNewPerDiem(lineitem, valid, errorMsg) {
          var obj = [];
          obj.push(lineitem);
          if (!valid) {
              console.log(errorMsg);
          } else {
              console.log('Successfully saved report(s)');
              $modalInstance.close(obj);
          }

      };

      /**
      * Called by saveNew function to perform validation
      * then proceed to close the modal upon which 
      * line item will be saved to db in submission.js
      */
      function _SaveNewOther(lineitem, valid, errorMsg) {
          var obj = [];
          obj.push(lineitem);
          if (!valid) {
              console.log(errorMsg);
          } else {
              console.log('Successfully saved report(s)');
              $modalInstance.close(obj);
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
          };

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
              default:
                  returnObj = LineItemService.getLineItem();
                  break;
          };
          if (!LineItemService.isLineItemValid()) {
              console.log('invalid expense');
          } else {
              console.log('Successfully edited report');
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
