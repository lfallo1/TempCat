'use strict';

angular.module('expenseApp.Controllers')
  .controller('receiptController', ["$scope", "$modalInstance", "ReceiptService", "$rootScope", "MessageService", "$modal", "Application", "$route", "LineItemService", function ($scope, $modalInstance, ReceiptService, $rootScope, MessageService, $modal, Application, $route, LineItemService) {
      var receiptId = 0;
      var receiptIndexId = 0;
      var allReceipts = false;
      $scope.canDelete = true;
      $scope.hover = false;
      $scope.userReceipts = ReceiptService.getReceipts();
      $scope.createNewReceipt = ReceiptService.getAddReceipt();

      /**
      * set boolean based on value stored in ReceiptService
      */
      if (ReceiptService.getShowAllReceipts()) {
          allReceipts = true;
      }

      /**
      * only the user who added the receipt can delete it, not that user's manager or finance approver
      */
      if (Application.getOrigin() == "ManagerTable" || Application.getOrigin() == "FinanceTable") {
          $scope.canDelete = false;
      }

      /**
      * download the receipt from the database
      */
      $scope.downloadFile = function (receiptId) {
          ReceiptService.getReceiptById(receiptId);
      }

      /**
      * before receipt is removed from database, display confirmation modal to user
      */
      $scope.deleteReceipt = function (receipt, index) {
          receiptId = receipt;
          receiptIndexId = index;
          MessageService.setMessage("Are you sure you want to delete this receipt?");
          MessageService.setBroadCastMessage("confirmDeleteReceipt");
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
              controller: 'confirmModalController'
          });
      }

      /**
      * receives broadcast message from MessageService that
      * user has confirmed their wish to delete the receipt in question
      */
      $scope.$on("confirmDeleteReceipt", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          ReceiptService.deleteReceipt(receiptId, $scope.userReceipts[receiptIndexId].LineItemId).then(
            function (success) {
                var submissions = Application.getAllUserSubmissions();
                LineItemService.getLineItemsBySubmissionId(Application.getSubmission().SubmissionId).then(function (LineItems) {
                    $scope.userReceipts.splice(receiptIndexId, 1);
                    var lineItems = LineItems.data;
                    submissions[Application.getSubmissionIndex()].LineItems = lineItems;
                    ReceiptService.setReceipts($scope.userReceipts);
                    var receipts = [];
                    //get all receipts in that submission
                    for (var i = 0; i < lineItems.length; i++) {
                        if (lineItems[i].Receipts.length > 0) {
                            for (var b = 0; b < lineItems[i].Receipts.length; b++) {
                                receipts.push(lineItems[i].Receipts[b]);
                            }
                        }
                    }
                    ReceiptService.setAllReceipts(receipts);
                    submissions[Application.getSubmissionIndex()].allSubmissionReceipts = receipts;
                    if (receipts.length == 0) {
                        submissions[Application.getSubmissionIndex()].ReceiptPresent = false;
                    }
                    if ($scope.userReceipts.length == 0) {
                        $modalInstance.dismiss("dismiss receipt modal");
                    }
                    Application.setAllUserSubmissions(submissions);
                });
            });
      });

      /**
      * Disables the submit button based on info.
      */
      $scope.checkFile = function () {
          $('#upload').prop('disabled', !"" === $('input:file').val());
          $scope.divShow = false;
      };

      /**
      * upload a receipt and add it to the information stored 
      * in the database for the expense it is related to 
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
