'use strict';

angular.module('expenseApp')
  .controller('EmployeeTableController', function ($scope, $location, $modal, $route, $rootScope, $filter, Application, SubmissionService, MessageService, receiptService) {

      // statuses is used for the drop down filter
      $scope.statuses = [
        { name: 'All', value: '0' },
        { name: 'In Progress', value: '1' },
        { name: 'Submitted', value: '2' },
        { name: 'Manager Approved', value: '3' },
        { name: 'Manager Rejected', value: '4' },
        { name: 'Finance Approved', value: '5' },
        { name: 'Finance Rejected', value: '6' }
      ];

      $scope.expanded = true;

      var orderBy = $filter('orderBy');

      var sortColumn = { field: 'DateCreated', reverse: false };

      $scope.expandContract = function (value) {
          $scope.expanded = value;
      };

      $scope.employeeOrder = function (field) {
          if (field === sortColumn.field) {
              sortColumn.reverse = !sortColumn.reverse;
              $scope.employeeSubmissions = orderBy($scope.employeeSubmissions, sortColumn.field, sortColumn.reverse);
          } else {
              sortColumn.field = field;
              sortColumn.reverse = false;
              $scope.employeeSubmissions = orderBy($scope.employeeSubmissions, sortColumn.field, sortColumn.reverse);
          };
      };

      // set $scope.statuses[0] to the default selected item in the list
      $scope.selectedStatus = $scope.statuses[0];
      // container for the submissions
      var employeeSubmissionsContainer = [];
      $scope.loadEmployeeTable = function () {
          if (Application.getAllUserSubmissions() != undefined) {
              var rejected = 0;
              var userSubmissions = Application.getAllUserSubmissions();
              $scope.employeeSubmissions = Application.getAllUserSubmissions();
              for (var i = 0; i < userSubmissions.length; i++) {                  
                  var receipts = [];
                  //get all receipts in that submission
                  for (var b = 0; b < userSubmissions[i].LineItems.length; b++) {
                      if (userSubmissions[i].LineItems[b].Receipts.length != 0) {
                          for (var c = 0; c < userSubmissions[i].LineItems[b].Receipts.length; c++) {
                              receipts.push(userSubmissions[i].LineItems[b].Receipts[c]);
                          }
                      }
                  }
                  userSubmissions[i]["allSubmissionReceipts"] = receipts;
                  if (receipts.length > 0) {
                      userSubmissions[i]["ReceiptPresent"] = true;
                  } else {
                      userSubmissions[i]["ReceiptPresent"] = false;
                  }
              }
              employeeSubmissionsContainer = $scope.employeeSubmissions;
              for (var i = 0; i < $scope.employeeSubmissions.length; i++) {
                  // a status of 4 and 6 means the submission was rejected
                  if ($scope.employeeSubmissions[i].StatusId == 4 || $scope.employeeSubmissions[i].StatusId == 6) {
                      rejected++;
                  }
              }
              $rootScope.$broadcast("employeeTotal", rejected);
          } else {
              SubmissionService.getSubmissionsByUsername().then(function (submissions) {
                  var rejected = 0;                  
                  var userSubmissions = submissions.data;
                  if (userSubmissions.length > 0) {
                      for (var i = 0; i < userSubmissions.length; i++) {
                          // a status of 4 and 6 means the submission was rejected
                          if (userSubmissions[i].StatusId == 4 || userSubmissions[i].StatusId == 6) {
                              rejected++;
                          }
                          var receipts = [];
                          //get all receipts in that submission
                          for (var b = 0; b < userSubmissions[i].LineItems.length; b++) {                              
                              if (userSubmissions[i].LineItems[b].Receipts.length != 0) {
                                  for (var c = 0; c < userSubmissions[i].LineItems[b].Receipts.length; c++) {
                                      receipts.push(userSubmissions[i].LineItems[b].Receipts[c]);
                                  }
                              }
                          }
                          userSubmissions[i]["allSubmissionReceipts"] = receipts;
                          if (receipts.length > 0) {
                              userSubmissions[i]["ReceiptPresent"] = true;
                          } else {
                              userSubmissions[i]["ReceiptPresent"] = false;
                          }                         
                      }
                      Application.setAllUserSubmissions(userSubmissions);
                  }
                  $scope.employeeSubmissions = Application.getAllUserSubmissions();
                  $rootScope.$broadcast("employeeTotal", rejected);
                  employeeSubmissionsContainer = $scope.employeeSubmissions;
              });
          }
      }
      $scope.loadEmployeeTable();
      // load the table with the filtered items
      $scope.loadEmployeeTableStatusX = function (status) {
          var employeeSubmissionsFilter = [];
          for (var i = 0; i < employeeSubmissionsContainer.length; i++) {
              if (employeeSubmissionsContainer[i].StatusId == status || status == 0) {
                  employeeSubmissionsFilter.push(employeeSubmissionsContainer[i]);
              }
          }
          $scope.employeeSubmissions = employeeSubmissionsFilter;
      }
      // redirect to submission page with the submission id to allow the table to populate
      $scope.loadEmployeeSubmission = function (submission, index) {
          $scope.dt1 = "";
          Application.setSubmission(submission);
          Application.setSubmissionStatus(submission.Status.StatusId);
          Application.setOrigin("EmployeeTable");
          Application.setSubmissionIndex(index);
          receiptService.setAllReceipts(submission.allSubmissionReceipts);
          $location.path('/submission');
      }
      // redirect to submission page with the submission id to allow the table to populate
      $scope.deleteSubmission = function (submission, index) {
          Application.setSubmissionIndex(index);
          MessageService.setMessage("Are you sure you want to delete this submission?");
          MessageService.setBroadCastMessage("confirmDeleteSubmission");
          MessageService.setId(submission.SubmissionId);
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

      $scope.showAllAvailableReceipts = function (allReceipts, submission, submissionIndex) {
          receiptService.setReceipts(allReceipts);
          receiptService.setShowAllReceipts(true);
          Application.setSubmission(submission);
          Application.setSubmissionIndex(submissionIndex);
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
              controller: 'receiptController'
          });
      }

      $scope.$on("confirmDeleteSubmission", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          SubmissionService.deleteExpenseReport(MessageService.getId()).then(function (success) {
              $scope.employeeSubmissions.splice(Application.getSubmissionIndex(), 1);
              Application.setAllUserSubmissions($scope.employeeSubmissions);
          }, function (error) { });

      });

  });