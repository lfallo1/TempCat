'use strict';

angular.module('expenseApp.Controllers')
  .controller('FinanceTableController', ["$scope", "$location", "$modal", "$route", "$rootScope", "$filter", "Application", "SubmissionService", "MessageService", "Authentication", "ReceiptService", function ($scope, $location, $modal, $route, $rootScope, $filter, Application, SubmissionService, MessageService, Authentication, ReceiptService) {

      var orderBy = $filter('orderBy');
      var sortColumn = { field: 'TotalAmount', reverse: false };
      $scope.isFinanceApprover = Authentication.getIsFinanceApprover();
      $scope.expanded = true;

      /**
      * expand and contract financeTable view
      */
      $scope.expandContract = function (value) {
          $scope.expanded = value;
      };

      /**
      * allow user to sort the submissions in the table by values in each column
      */
      $scope.financeOrder = function (field) {
          if (field === sortColumn.field) {
              sortColumn.reverse = !sortColumn.reverse;
              $scope.financeSubmissions = orderBy($scope.financeSubmissions, sortColumn.field, sortColumn.reverse);
          } else {
              sortColumn.field = field;
              sortColumn.reverse = false;
              $scope.financeSubmissions = orderBy($scope.financeSubmissions, sortColumn.field, sortColumn.reverse);
          };
      };


      /**
      * finance tatuses is used for the drop down filter
      */
      $scope.financeStatuses = [
        { name: 'All', value: '0' },
        { name: 'Manager Approved', value: '3' }
      ];

      /**
      * set $scope.financeStatuses[1] to the default selected item in the list
      */
      $scope.selectedFinanceStatus = $scope.financeStatuses[1];

      /** 
      * container for the submissions
      */
      var financeSubmissionsContainer = [];

      var loadFinanceTable = function () {
          if (Application.getPendingSubmissionsByFinanceApprover() != undefined && Application.getPendingSubmissionsByFinanceApprover().length != 0) {
              $scope.financeSubmissions = Application.getPendingSubmissionsByFinanceApprover();
              financeSubmissionsContainer = $scope.financeSubmissions;
              $rootScope.$broadcast("financeTotal", $scope.financeSubmissions.length);
          } else {
              // get all the submissions for the finance approver
              SubmissionService.getPendingSubmissionsByFinanceApprover().then(
                function (submissions) {
                    var userSubmissions = submissions.data;
                    for (var i = 0; i < userSubmissions.length; i++) {
                        // a status of 4 and 6 means the submission was rejected
                        if (userSubmissions[i].StatusId == 4 || userSubmissions[i].StatusId == 6) {
                            rejected++;
                        }
                        var receipts = [];
                        //get all receipts in that submission
                        for (var b = 0; b < userSubmissions[i].LineItems.length; b++) {
                            for (var c = 0; c < userSubmissions[i].LineItems[b].Receipts.length; c++) {
                                receipts.push(userSubmissions[i].LineItems[b].Receipts[c]);
                            }
                        }
                        userSubmissions[i]["allSubmissionReceipts"] = receipts;
                        if (receipts.length > 0) {
                            userSubmissions[i]["ReceiptPresent"] = true;
                        } else {
                            userSubmissions[i]["ReceiptPresent"] = false;
                        }
                    }
                    if (userSubmissions.length > 0) {
                        Application.setPendingSubmissionsByFinanceApprover(userSubmissions);
                    }
                    $scope.financeSubmissions = userSubmissions;
                    financeSubmissionsContainer = $scope.financeSubmissions;
                    $scope.loadFinanceTableStatusX(3);
                    $rootScope.$broadcast("financeTotal", $scope.financeSubmissions.length);
                });
          }
      }

      /**
      * if the user is a finance approver, load the financeTable 
      * with submissions awaiting their approval
      */
      if (Authentication.getIsFinanceApprover()) {
          loadFinanceTable();
      }

      /**
      * load the table with the filtered items
      */
      $scope.loadFinanceTableStatusX = function (status) {
          var financeSubmissionsFilter = [];
          for (var i = 0; i < financeSubmissionsContainer.length; i++) {
              if (financeSubmissionsContainer[i].StatusId == status || status == 0) {
                  financeSubmissionsFilter.push(financeSubmissionsContainer[i]);
              }
          }
          if (financeSubmissionsFilter.length != 0) {
              $scope.financeSubmissions = financeSubmissionsFilter;
          }
      }

      /**
      * show all the receipts related to expense items in the particular submission
      */
      $scope.showAllAvailableReceipts = function (allReceipts, submission, submissionIndex) {
          Application.setOrigin("FinanceTable");
          ReceiptService.setReceipts(allReceipts);
          ReceiptService.setShowAllReceipts(true);
          Application.setSubmission(submission);
          Application.setSubmissionIndex(submissionIndex);
          ReceiptService.setAddReceipt(false);
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
              controller: 'receiptController'
          });
      }

      /**
      * redirect to submission page with the submission id to allow the table to populate
      */
      $scope.loadFinaceSubmission = function (submission, index) {
          Application.setSubmission(submission);
          Application.setSubmissionStatus(submission.Status.StatusId);
          Application.setOrigin("FinanceTable");
          Application.setSubmissionIndex(index);
          var receipts = [];
          //get all receipts in that submission
          for (var i = 0; i < submission.LineItems.length; i++) {
              for (var b = 0; b < submission.LineItems[i].Receipts.length; b++) {
                  receipts.push(submission.LineItems[i].Receipts[b]);
              }
          }
          ReceiptService.setAllReceipts(receipts);
          $location.path('/submission');
      }

      /**
      * Delete a submission by id
      */
      $scope.deleteSubmission = function (submission, index) {
          Application.setSubmissionIndex(index);
          MessageService.setMessage("Are you sure you want to delete this submission?");
          MessageService.setBroadCastMessage("confirmFinanceDeleteSubmission");
          MessageService.setId(submission.SubmissionId)
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
              controller: 'confirmModalController',
              resolve: {
                  selectedType: function () {
                      return $scope.selectedType;
                  }
              }
          });
      }

      /**
      * recieve broadcast message from MessageService
      * confirming that the user would like to remove a submission from 
      * view in their finance table
      */
      $scope.$on("confirmFinanceDeleteSubmission", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          SubmissionService.deleteExpenseReport(MessageService.getId()).then(function (success) {
              $scope.financeSubmissions.splice(Application.getSubmissionIndex(), 1);
              Application.setPendingSubmissionsByFinanceApprover($scope.financeSubmissions);
          });

      });

  }]);