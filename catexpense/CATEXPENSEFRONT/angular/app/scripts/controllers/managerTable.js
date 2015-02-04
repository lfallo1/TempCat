'use strict';

angular.module('expenseApp')
  .controller('ManagerTableController', function ($scope, $location, $modal, $route, $rootScope, $filter, Application, SubmissionService, MessageService, Authentication, receiptService) {
      $scope.isManager = Authentication.getIsManager();

      $scope.expanded = true;

      var orderBy = $filter('orderBy');

      var sortColumn = { field: 'DateCreated', reverse: false };

      $scope.managerOrder = function (field) {
          if (field === sortColumn.field) {
              sortColumn.reverse = !sortColumn.reverse;
              $scope.managerSubmissions = orderBy($scope.managerSubmissions, sortColumn.field, sortColumn.reverse);
          } else {
              sortColumn.field = field;
              sortColumn.reverse = false;
              $scope.managerSubmissions = orderBy($scope.managerSubmissions, sortColumn.field, sortColumn.reverse);
          };
      };

      $scope.expandContract = function (value) {
          $scope.expanded = value;
      };

      // container for the submissions
      var managerSubmissionsContainer = [];
      if (Authentication.getIsManager()) {
          $scope.loadManagerTable = function () {
              if (Application.getPendingSubmissionsByManagerName() != undefined) {
                  $scope.managerSubmissions = Application.getPendingSubmissionsByManagerName();
                  $rootScope.$broadcast("managerTotal", $scope.managerSubmissions.length);
              } else {
                  // get all the submissions for the manager
                  SubmissionService.getPendingSubmissionsByManagerName().then(
                      function (submissions) {
                          if (submissions.data.length > 0) {
                              Application.setPendingSubmissionsByManagerName(submissions.data);
                          }
                          $scope.managerSubmissions = submissions.data
                          $rootScope.$broadcast("managerTotal", $scope.managerSubmissions.length);
                      }, function (fail) {
                          //console.log(fail);
                      });
              }
          };
          $scope.loadManagerTable();
      }

      // redirect to submission page with the submission id to allow the table to populate
      $scope.loadManagerSubmission = function (submission, index) {
          Application.setSubmission(submission);
          Application.setSubmissionStatus(submission.Status.StatusId);
          Application.setOrigin("ManagerTable");
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
          receiptService.setAllReceipts(receipts);
          $location.path('/submission');
      }

      // Delete a submission by id
      $scope.deleteSubmission = function (submission, index) {
          Application.setSubmissionIndex(index);
          MessageService.setMessage("Are you sure you want to delete this submission?");
          MessageService.setBroadCastMessage("confirmManagerDeleteSubmission");
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


      //Listens for a delete broadcast message
      $scope.$on("confirmManagerDeleteSubmission", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          SubmissionService.deleteExpenseReport(MessageService.getId()).then(function (success) {
              $scope.managerSubmissions.splice(Application.getSubmissionIndex(), 1);
              Application.setPendingSubmissionsByManagerName($scope.managerSubmissions);
          }, function (error) { });

      });

  });