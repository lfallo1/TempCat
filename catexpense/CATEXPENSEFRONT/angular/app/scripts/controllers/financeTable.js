'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller( 'FinanceTableController', function ( $scope, $location, $modal, $route, $rootScope, $filter, Application, SubmissionService, MessageService, Authentication, ReceiptService ) {
      $scope.isFinanceApprover = Authentication.getIsFinanceApprover();

      $scope.expanded = true;

      var orderBy = $filter('orderBy');

      var sortColumn = { field: 'TotalAmount', reverse: false };

      $scope.expandContract = function (value) {
          $scope.expanded = value;
      };

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


      // financeStatuses is used for the drop down filter
      $scope.financeStatuses = [
        { name: 'All', value: '0' },
        { name: 'Manager Approved', value: '3' }
      ];
      // set $scope.financeStatuses[1] to the default selected item in the list
      $scope.selectedFinanceStatus = $scope.financeStatuses[1];
      // container for the submissions
      var financeSubmissionsContainer = [];
      if (Authentication.getIsFinanceApprover()) {
          $scope.loadFinanceTable = function () {
              if (Application.getPendingSubmissionsByFinanceApprover() != undefined && Application.getPendingSubmissionsByFinanceApprover().length != 0) {
                  $scope.financeSubmissions = Application.getPendingSubmissionsByFinanceApprover();
                  financeSubmissionsContainer = $scope.financeSubmissions;
                  $rootScope.$broadcast("financeTotal", $scope.financeSubmissions.length);
              } else {
                  // get all the submissions for the finance approver
                  SubmissionService.getPendingSubmissionsByFinanceApprover().then(
                    function (submissions) {
                        if (submissions.data.length > 0) {
                            Application.setPendingSubmissionsByFinanceApprover(submissions.data);
                        }
                        $scope.financeSubmissions = submissions.data;
                        financeSubmissionsContainer = $scope.financeSubmissions;
                        $scope.loadFinanceTableStatusX(3);
                        $rootScope.$broadcast("financeTotal", $scope.financeSubmissions.length);
                    }, function (fail) {
                        //console.log(fail);
                    });
              }
          }
          $scope.loadFinanceTable();
      }
      // load the table with the filtered items
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
      // redirect to submission page with the submission id to allow the table to populate
      $scope.loadFinaceSubmission = function (submission, index) {
          Application.setSubmission(submission);
          Application.setSubmissionStatus(submission.Status.StatusId);
          Application.setOrigin("FinanceTable");
          Application.setSubmissionIndex(index);
          var receipts = [];
          //get all receipts in that submission
          for (var i = 0; i < submission.LineItems.length; i++) {
              if (submission.LineItems[i].Receipts.length != 0) {
                  for (var b = 0; b < submission.LineItems[i].Receipts.length; b++) {
                      receipts.push(submission.LineItems[i].Receipts[b]);
                  }
              }
          }
          ReceiptService.setAllReceipts( receipts );
          $location.path('/submission');
      }

      // Delete a submission by id
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


      $scope.$on("confirmFinanceDeleteSubmission", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          SubmissionService.deleteExpenseReport(MessageService.getId()).then(function (success) {
              $scope.financeSubmissions.splice(Application.getSubmissionIndex(), 1);
              Application.setPendingSubmissionsByFinanceApprover($scope.financeSubmissions);
          }, function (error) { });

      });

  });