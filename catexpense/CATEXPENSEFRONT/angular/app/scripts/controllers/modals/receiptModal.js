'use strict';

angular.module('expenseApp')
  .controller('receiptController', function ($scope, $modalInstance, receiptService, $http, $rootScope, MessageService, $modal, Application, $route, LineItemService) {
      var allReceipts = false;
      $scope.canDelete = true;
      if (receiptService.getShowAllReceipts()) {
          allReceipts = true;
      }
      $scope.userReceipts = receiptService.getReceipts();
      if (Application.getOrigin() == "ManagerTable" || Application.getOrigin() == "FinanceTable") {
          $scope.canDelete = false;
      }
      //if ($scope.userReceipts[0].)

      $scope.createNewReceipt = receiptService.getAddReceipt();
      $scope.hover = false;
      $scope.downloadFile = function (receiptId) {
          $http({
              method: "GET",
              url: "/api/Receipts",
              params: { id: receiptId }
          });
      }
      var receiptId = 0;
      var receiptIndexId = 0;
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
      $scope.$on("confirmDeleteReceipt", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          var lineItems = receiptService.getReceipts().LineItems;
          var indexId = Application.getLineItemIndex();
          $http({
              method: "DELETE",
              url: "/api/Receipts/",
              params: { id: receiptId, lineItemId: $scope.userReceipts[receiptIndexId].LineItemId }
          }).then(
            function (success) {
                var submissions = Application.getAllUserSubmissions();
                $http({
                    method: "GET",
                    url: "/api/LineItem/GetLineItemsBySubmissionId",
                    params: { id: Application.getSubmission().SubmissionId }
                }).then(function (LineItems) {
                    $scope.userReceipts.splice(receiptIndexId, 1);
                    var lineItems = LineItems.data;
                    submissions[Application.getSubmissionIndex()].LineItems = lineItems;
                    receiptService.setReceipts($scope.userReceipts);
                    var receipts = [];
                    //get all receipts in that submission
                    for (var i = 0; i < lineItems.length; i++) {
                        if (lineItems[i].Receipts.length > 0) {
                            for (var b = 0; b < lineItems[i].Receipts.length; b++) {
                                receipts.push(lineItems[i].Receipts[b]);
                            }
                        }
                    }
                    receiptService.setAllReceipts(receipts);
                    submissions[Application.getSubmissionIndex()].allSubmissionReceipts = receipts;
                    if (receipts.length == 0) {
                        submissions[Application.getSubmissionIndex()].ReceiptPresent = false;
                    }
                    if ($scope.userReceipts.length == 0) {
                        $modalInstance.dismiss("dismiss receipt modal");
                    }
                    Application.setAllUserSubmissions(submissions)
                    $route.reload();
                });


            }, function (fail) {
                //console.log(fail);
            });
      });
      /**
      * Disables the submit button based on info.
      */
      $scope.checkFile = function () {
          $('#upload').prop('disabled', !"" === $('input:file').val());
          $scope.divShow = false;
      };

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
              $http({
                  url: '/api/Receipts/',
                  method: 'POST',
                  data: receipt
              }).then(function (receipt) {
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

      $scope.$on("refreshReceipts", function () {
          $route.reload();
      });
  });