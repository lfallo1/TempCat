'use strict';

angular.module('expenseApp')

  .controller('SubmissionCtrl', function ($scope, $modal, $window, $location, $route, $rootScope, $timeout, LineItemService, SubmissionService, RepliconProjectService, MessageService, DateService, Application, Authentication, receiptService) {

      $scope.syncComplete = false;
      $scope.flag = false;
      $scope.hasNoProjects = false;
      $scope.clients = [{ RepliconProjectName: "Loading..." }];
      $scope.loading = true;
      $scope.lineItems = [];
      $scope.disabled = true;
      $scope.submission = Application.getSubmission();
      $scope.submissionLoad = Application.getSubmission() === undefined;
      $scope.submissionUnderEdit = LineItemService.getUnderEdit();
      $scope.submissionCreated = false;
      $scope.currentDescription = '';
      $scope.editExistingSubmission = false;
      $scope.receiptsAmount = 0;
      if (Application.getSubmission()) {
          $scope.submittedNotApproved = Application.getSubmissionStatus() === 2
        && Application.getSubmission().ActiveDirectoryUser.toUpperCase() == Authentication.getUserName().toUpperCase();
          $scope.createNewItemLoad = $scope.submission.StatusId == 1 || $scope.submission.StatusId == 4 || $scope.submission.StatusId == 6
      }

      //this variable stores the date string chosen from the datepicker
      $scope.dt1 = '';
      $scope.currentDescription = "";
      //this variable stores a boolean which determines if the 'create submission' button appears or the 'add new line item'
      //Also, if true, the submission table will be visible
      $scope.submissionExists = false;

      $scope.se = function () {
          return $scope.submissionExists;
      };

      $scope.editComment = function (index) {
          $rootScope.$broadcast("editCommentFromSubmission", index);
      }

      function setDisabledButtons() {
          if (Application.getSubmission() !== undefined) {
              $scope.missingLineItems = Application.getSubmission().LineItems.length < 1;
          }
      }
      setDisabledButtons();

      $scope.findSpecificSubmission = function () {

          var submission = false;
          $scope.totalSubmissions.forEach(function (entry, index) {
              var dbdate = new Date(entry.WeekEndingDate);
              var dbDate = new Date(dbdate.toUTCString().substring(0, 16));
              var datepickerDate = new Date($scope.dt1.toUTCString().substring(0, 16));
              if (dbDate.valueOf() === datepickerDate.valueOf()) {
                  if (entry.RepliconProjectId === $scope.selectedClient.RepliconProjectId) {
                      //return the matching submission
                      submission = entry;
                      Application.setSubmissionIndex(index);
                  }
              }
          });

          return submission;
      };



      $scope.clientAndDate = function () {

          if ($scope.selectedClient !== null && ($scope.dt1 instanceof Date && !isNaN($scope.dt1.valueOf()))) {
              //gets the submission that matches the date and client
              $scope.submission = $scope.findSpecificSubmission();
              $rootScope.$broadcast("submissionFound", $scope.submission);
              Application.setAllUserSubmissions($scope.totalSubmissions);
              if ($scope.submission) {
                  $scope.missingLineItems = $scope.submission.LineItems.length < 1;
                  $scope.submissionExists = true;
                  $scope.createNewItemLoad = $scope.submission.StatusId == 1 || $scope.submission.StatusId == 4 || $scope.submission.StatusId == 6;
              } else {
                  $scope.submissionExists = false;
              }
              return true;
          } else {
              return false;
          }

      };

      //Get the list of all submissions made by that user
      $scope.getSubmissionList = function () {
          if (Application.getAllUserSubmissions() != undefined) {
              $scope.totalSubmissions = Application.getAllUserSubmissions();
          } else {
              SubmissionService.getSubmissionsByUsername().then(
              function (success) {
                  var userSubmissions = success.data;
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
                  $scope.totalSubmissions = userSubmissions;
                  Application.setAllUserSubmissions(userSubmissions);
              }, function (error) {
                  console.log(error);
              }
             )
          }
      };

      $scope.getSubmissionList();

      if (Application.getRepliconProjects() != undefined) {
          $scope.clients = Application.getRepliconProjects();
          $scope.selectedClient = $scope.clients[0];
          $scope.clientManager = $scope.selectedClient.RepliconManagerName + "@catalystitservices.com";
          $scope.loading = false;
      } else {
          // load replicon projects into clients array upon page load
          getAllProjects();
      }
      $scope.$on("syncComplete", function () {
          $scope.syncComplete = true;
          //populates the drop down list with projects.
          getAllProjects();
      });


      /**
       * Poulates the client drop down list.
      **/
      function getAllProjects() {
          //update the project list when sync succeeds
          RepliconProjectService.getAllRepliconProjects().then(

              function (allRepliconProjects) {
                  if (allRepliconProjects.data.length > 0) {
                      Application.setRepliconProjects(allRepliconProjects.data);
                      $scope.clients = allRepliconProjects.data;
                      $scope.selectedClient = $scope.clients[0];
                      $scope.clientManager = $scope.selectedClient.RepliconManagerName + "@catalystitservices.com";
                      $scope.loading = false;
                      $scope.hasNoProjects = false;
                  } else {
                      $scope.hasNoProjects = true;
                  }

              }, function (fail) {
                  console.log(fail);
              });
      }

      // opens the modal so the user can create a new submission
      $scope.createNewSubmission = function () {

          $scope.disableCreate = true;

          var submission = {
              statusId: 1,
              RepliconProjectId: $scope.selectedClient.RepliconProjectId,
              WeekEndingDate: $scope.dt1,
              ManagerName: $scope.selectedClient.RepliconManagerName,
              Description: $scope.currentDescription
          };

          SubmissionService.submitExpenseReport(submission).then(
              function (success) {
                  $scope.submissionCreated = true;

                  $scope.submissionId = success.data.SubmissionId;
                  $scope.submission = success.data;

                  $scope.getSubmissionList();
                  LineItemService.resetLineItem();
                  LineItemService.setUnderEdit(false);
                  LineItemService.setSubmissionId(success.data.SubmissionId);
                  LineItemService.setExpenseCategoryName('Mileage');
                  LineItemService.setEndingWeek($scope.dt1);                  
                  if (Application.getAllUserSubmissions() != undefined) {
                      var userSubmission = Application.getAllUserSubmissions();
                  } else {
                      var userSubmission = $scope.totalSubmissions;
                  }
                  $scope.submission.RepliconProject = $scope.selectedClient;
                  $scope.submission.Status = { "StatusName": "In Progress" };
                  $scope.submission["allSubmissionReceipts"] = [];
                  $scope.submission["ReceiptPresent"] = false;
                  userSubmission.push($scope.submission);
                  Application.setAllUserSubmissions(userSubmission);
                  $rootScope.$broadcast("addSubmissionEmployeeTable");
                  $scope.openModal();
              }, function (error) {
                  console.log(error);
              }
          );
      };

      // if user selects to delete the submission they are currently viewing or editing,
      // display the confirmation modal asking if they are certain they want to delete it
      $scope.deleteSubmission = function () {
          MessageService.setMessage("Are you sure you want to delete this submission?");
          MessageService.setBroadCastMessage("confirmDeleteSubmissionUnderEdit");
          MessageService.setId($scope.submission.SubmissionId);
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
              controller: 'confirmModalController',
              resolve: {
                  selectedType: function () {
                      return $scope.selectedType;
                  }
              }
          });
      };

      // this will recieve the broadcast message if user confirms their desire
      // to delete the current submission and remove it from the db
      $scope.$on("confirmDeleteSubmissionUnderEdit", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          SubmissionService.deleteExpenseReport(MessageService.getId()).then(function (success) {
              $window.location.href = '/';
          }, function (error) { });

      });

      $scope.addNewLineItem = function () {
          LineItemService.resetLineItem();
          LineItemService.setUnderEdit(false);
          var currentDate = $scope.dt1;

          if (!$scope.submission) {
              $scope.submission = Application.getSubmission();
              LineItemService.setSubmissionId($scope.submission.SubmissionId);
          }

          if (!currentDate) {
              currentDate = new Date($scope.submission.WeekEndingDate);
          }

          LineItemService.setSubmissionId($scope.submission.SubmissionId);
          LineItemService.setExpenseCategoryName('Mileage');
          LineItemService.setEndingWeek(currentDate);
          console.log(LineItemService.getEndingWeek());
          $scope.openModal();
      };

      // edit the selected expense line
      $scope.editExpenseLine = function (lineItem, index) {
          Application.setLineItemIndex(index);
          LineItemService.resetLineItem();
          parseMetaData(lineItem.LineItemMetadata);
          LineItemService.setSubmissionId(lineItem.SubmissionId);
          LineItemService.setLineItemId(lineItem.LineItemId);
          LineItemService.setExpenseCategoryName(lineItem.ExpenseCategory.ExpenseCategoryName);
          LineItemService.setLineItemDate(new Date(lineItem.LineItemDate));
          LineItemService.setLineItemDesc(lineItem.LineItemDesc);
          LineItemService.setLineItemAmount(lineItem.LineItemAmount);
          LineItemService.setBillable(lineItem.Billable);
          LineItemService.setEndingWeek($scope.dt1);
          LineItemService.setUnderEdit(true);
          $scope.openModal();
      };

      $scope.openDetailsView = function () {
      };

      function parseMetaData(string) {
          var days = {
              sunday: {},
              monday: {},
              tuesday: {},
              wednesday: {},
              thursday: {},
              friday: {},
              saturday: {}
          };
          var res = string.split(',');
          res.forEach(function (str) {
              var keyValue = str.split(':');
              switch (keyValue[0]) {
                  case 'Miles':
                      LineItemService.setMiles(keyValue[1]);
                  case 'Origin':
                      LineItemService.setOrigin(keyValue[1]);
                  case 'Destination':
                      LineItemService.setDestination(keyValue[1]);
                  case 'EndingWeek':
                      LineItemService.setEndingWeek(new Date(keyValue[1]));
                  case 'Sunday':
                      days.sunday = keyValue[1] === 'true';
                  case 'Monday':
                      days.monday = keyValue[1] === 'true';
                  case 'Tuesday':
                      days.tuesday = keyValue[1] === 'true';
                  case 'Wednesday':
                      days.wednesday = keyValue[1] === 'true';
                  case 'Thursday':
                      days.thursday = keyValue[1] === 'true';
                  case 'Friday':
                      days.friday = keyValue[1] === 'true';
                  case 'Saturday':
                      days.saturday = keyValue[1] === 'true';
              }
          });
          LineItemService.setDays(days);
      }

      $scope.showAllReceipts = function () {
          receiptService.setReceipts(receiptService.getAllReceipts());
          receiptService.setShowAllReceipts(true);
          receiptService.setAddReceipt(false);
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
              controller: 'receiptController'
          });
      }
      $scope.$on("checkReceipts", function () {
          if (receiptService.getAllReceipts() && receiptService.getAllReceipts().length != 0) {
              $scope.receipts = false;
          } else {
              var receipts = [];
              //get all receipts in that submission
              for (var i = 0; i < $scope.submission.LineItems.length; i++) {
                  if ($scope.submission.LineItems[i].Receipts.length != 0) {
                      for (var b = 0; b < $scope.submission.LineItems[i].Receipts.length; b++) {
                          receipts.push($scope.submission.LineItems[i].Receipts[b]);
                      }
                  }
              }
              receiptService.setAllReceipts(receipts);
              if (receipts.length != 0) {
                  $scope.receipts = false;
              } else {
                  $scope.receipts = true;
              }
          }
          $scope.receiptsAmount = receiptService.getAllReceipts().length;
      });

      // populate the manager in the view for the client selected from the dropdown
      $scope.getManager = function () {
          $scope.clientManager = $scope.selectedClient.RepliconManagerName + "@catalystitservices.com";
      };

      // functions for interacting with the modal pages
      // pulling expense items from modals and displaying them in the submissionTable
      $scope.openModal = function (index) {

          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/formDetailsView.html',
              controller: 'FormDetailsCtrl',
          });

          modalInstance.result.then(
              function (successMessage) {
                  if (LineItemService.getUnderEdit() == true) {
                      LineItemService.updateLineItem(successMessage.LineItemId, successMessage).then(
                          function (success) {
                              if (Application.getAllUserSubmissions() != undefined) {
                                  var userSubmission = Application.getAllUserSubmissions();
                              } else {
                                  var userSubmission = $scope.totalSubmissions;
                              }
                              userSubmission[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()] = success.data;                              
                              var submissionTotalAmount = 0;
                              for (var i = 0; i < userSubmission[Application.getSubmissionIndex()].LineItems.length; i++) {
                                  submissionTotalAmount += userSubmission[Application.getSubmissionIndex()].LineItems[i].LineItemAmount;
                              }
                              userSubmission[Application.getSubmissionIndex()].TotalAmount = submissionTotalAmount;
                              LineItemService.resetLineItem();
                          },
                            function (error) {
                                console.log(error);
                            });
                      LineItemService.setUnderEdit(false);
                  } else {
                      successMessage.forEach(function (lineItem) {
                          LineItemService.submitLineItem(lineItem).then(
                                          function (success) {
                                              if (Application.getAllUserSubmissions() != undefined) {
                                                  var userSubmission = Application.getAllUserSubmissions();
                                              } else {
                                                  var userSubmission = $scope.totalSubmissions;
                                              }
                                              $scope.disableCreate = false;
                                              success.data.ExpenseCategory = { "ExpenseCategoryName": LineItemService.getExpenseCategoryNameById(success.data.ExpenseCategoryId) };
                                              userSubmission[Application.getSubmissionIndex()].LineItems.push(success.data);
                                              var submissionTotalAmount = 0;
                                              for (var i = 0; i < userSubmission[Application.getSubmissionIndex()].LineItems.length; i++) {
                                                  submissionTotalAmount += userSubmission[Application.getSubmissionIndex()].LineItems[i].LineItemAmount;
                                              }
                                              userSubmission[Application.getSubmissionIndex()].TotalAmount = submissionTotalAmount;
                                              $scope.showComments = true;
                                              LineItemService.setLineItemId(success.data.LineItemId);
                                              Application.setLineItemIndex(userSubmission[Application.getSubmissionIndex()].LineItems.length - 1);
                                              if (receiptService.getAddReceipt()) {
                                                  receiptService.setReceipts(userSubmission[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()].Receipts);
                                                  var modalInstance = $modal.open({
                                                      templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
                                                      controller: 'receiptController'
                                                  });
                                              } else {
                                                  MessageService.setMessage('Would you like to add a receipt for this line item?');
                                                  MessageService.setBroadCastMessage("addReeciptForLineItem");
                                                  var modalInstance = $modal.open({
                                                      templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
                                                      controller: 'confirmModalController'
                                                  });
                                              }                                              
                                              $scope.$on("addReeciptForLineItem", function () {
                                                  receiptService.setAddReceipt(true);
                                                  receiptService.setReceipts(userSubmission[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()].Receipts);
                                                  var modalInstance = $modal.open({
                                                      templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
                                                      controller: 'receiptController'
                                                  });
                                              });
                                          },
                                          function (err) {
                                              console.log(err);
                                          });
                      });

                  }
              },
            function (errorMessage) {
                $scope.disableCreate = false;
                console.log(errorMessage);
            }
        );
      };

      $scope.submitTable = function () {
          if ($scope.submission.LineItems.length > 0) {
              $scope.submission.Status["StatusName"] = 'Submitted'
              $scope.submission.Status["StatusId"] = 2
              SubmissionService.updateSubmission($scope.submission.SubmissionId, $scope.submission).then(
                  function (success) {
                      var userSubmission = Application.getAllUserSubmissions();
                      userSubmission[Application.getSubmissionIndex()] = $scope.submission
                      $scope.dt1 = '';
                      $scope.currentDescription = "";
                      $scope.submissionCreated = false;
                      $window.location.reload();
                  },
                  function (error) {
                      console.log(error);
                  });
          } else {
              MessageService.setMessage('You can not submit a table without any expense items');
              MessageService.setBroadCastMessage("confirmNoEmptyLineItems");
              MessageService.setId($scope.submission.SubmissionId);
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

      };

      //recieves broadcast message from MessageService confirming
      //that user can not submit an empty table
      $scope.$on("confirmNoEmptyLineItems", function () {
          MessageService.setMessage("");
          MessageService.setBroadCastMessage("");
          $route.reload();
      });

      //changes submission status from 2 back to 1 so that 
      //user may update the line items in their submission
      $scope.unSubmit = function () {

          $scope.submission.Status["StatusName"] = 'In Progress'
          $scope.submission.Status["StatusId"] = 1

          SubmissionService.updateSubmission($scope.submission.SubmissionId, $scope.submission).then(
              function (success) {
                  var userSubmission = Application.getAllUserSubmissions();
                  userSubmission[Application.getSubmissionIndex()] = $scope.submission
                  $scope.dt1 = '';
                  $scope.currentDescription = "";
                  $scope.submissionCreated = false;
                  $window.location.reload();
              },
              function (error) {

              });
      }


      $scope.saveTable = function () {

          //Update the updatable fields
          $scope.submission.Description = $scope.currentDescription;
          $scope.submission.RepliconProjectId = $scope.selectedClient.RepliconProjectId,
          $scope.submission.WeekEndingDate = $scope.dt1,
          $scope.submission.Status["StatusName"] = 'In Progress'
          $scope.submission.Status["StatusId"] = 1

          //Save the changes to the database
          SubmissionService.updateSubmission($scope.submission.SubmissionId, $scope.submission).then(
             function (success) {
                 var userSubmission = Application.getAllUserSubmissions();
                 userSubmission[Application.getSubmissionIndex()] = $scope.submission
                 $scope.dt1 = '';
                 $scope.currentDescription = "";
                 $scope.submissionCreated = false;
                 $window.location.reload();
             },
             function (error) {

             });


      };

  });
