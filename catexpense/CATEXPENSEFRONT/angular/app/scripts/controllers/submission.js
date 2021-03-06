'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller(
  'SubmissionCtrl',
  [
      "$scope",
      "$modal",
      "$window",
      "$location",
      "$route",
      "$rootScope",
      "$timeout",
      "LineItemService",
      "SubmissionService",
      "RepliconProjectService",
      "MessageService",
      "Cache",
      "Authentication",
      "ReceiptService",
      "LogError",
      function (
          $scope,
          $modal,
          $window,
          $location,
          $route,
          $rootScope,
          $timeout,
          LineItemService,
          SubmissionService,
          RepliconProjectService,
          MessageService,
          Cache,
          Authentication,
          ReceiptService,
          LogError
          ) {

          $scope.syncComplete = false;
          $scope.flag = false;
          $scope.hasNoProjects = false;
          $scope.clients = [{ ProjectName: "Loading..." }];
          $scope.loading = true;
          $scope.lineItems = [];
          $scope.disabled = true;
          $scope.submission = Cache.getSubmission();
          $scope.submissionLoad = Cache.getSubmission() === undefined;
          $scope.submissionUnderEdit = LineItemService.getUnderEdit();
          $scope.startCreateSubmission = false;
          $scope.submissionCreated = false;
          $scope.currentDescription = '';
          $scope.editExistingSubmission = false;
          $scope.receiptsAmount = 0;

          /**
          * initialize variables upon page load 
          * if a submission has been set in the Cache service
          */
          if ( $scope.submission )
          {
              $scope.canUnsubmit = Cache.getSubmissionStatus() > 1 && Cache.getSubmissionStatus() != 6
                && Cache.getSubmission().ActiveDirectoryUser.toUpperCase() == Authentication.getUserName().toUpperCase() &&
                 Cache.getOrigin() == "EmployeeTable";
              $scope.submittedNotApproved = Cache.getSubmissionStatus() > 1
                                      && ( Cache.getOrigin() == "FinanceTable"
                                      || Cache.getSubmissionStatus() > 1 &&
                                         Cache.getOrigin() == "ManagerTable" );
              $scope.createNewItemLoad = $scope.submission.StatusId == 1 || $scope.submission.StatusId == 4 || $scope.submission.StatusId == 6
          }

          /**
          * this variable stores the date string chosen from the datepicker
          */
          $scope.dt1 = '';

          /**
          * this variable stores a boolean which determines if the 'create submission' 
          * button appears or the 'add new line item'
          * Also, if true, the submission table will be visible
          */
          $scope.submissionExists = false;

          /**
          * used for html validation,
          * displaying or hiding elements
          */
          $scope.se = function () {
              return $scope.submissionExists;
          };

          $scope.startCreate = function () {
              $scope.startCreateSubmission = true;
          };

          /**
          * send broadcast message to edit comment with the index of the comment in its array
          */
          $scope.editComment = function ( index ) {
              $rootScope.$broadcast( "editCommentFromSubmission", index );
          }

          /**
          * initializes html button validation depending on whether 
          * or not there are line items present in the submission
          * which the user is currently working with
          */
          function setDisabledButtons() {
              if ( Cache.getSubmission() !== undefined )
              {
                  $scope.missingLineItems = Cache.getSubmission().LineItems.length < 1;
                  $scope.startCreateSubmission = true;
              }
              //if (Cache.getOrigin() == "EmployeeTable" || "FinanceTable" || "ManagerTable") {
              //    $scope.startCreateSubmission = true;
              //}
          }
          setDisabledButtons();

          /**
          * this function is used by clientAndDate below
          */
          $scope.findSpecificSubmission = function () {

              var submission = false;
              $scope.totalSubmissions.forEach( function ( entry, index ) {
                  var dbdate = new Date( entry.WeekEndingDate );
                  var dbDate = new Date( dbdate.toUTCString().substring( 0, 16 ) );
                  var datepickerDate = new Date( $scope.dt1.toUTCString().substring( 0, 16 ) );
                  if ( dbDate.valueOf() === datepickerDate.valueOf() )
                  {
                      if ( entry.RepliconProjectId === $scope.selectedClient.ProjectId )
                      {
                          //return the matching submission
                          submission = entry;
                          Cache.setSubmissionIndex( index );
                      }
                  }
              } );

              return submission;
          };

          /**
          * this variable is used in front end validation,
          * determining the current state of the Cache
          * and displaying or hiding elements accordingly
          */
          $scope.clientAndDate = function () {

              if ( $scope.selectedClient !== null && ( $scope.dt1 instanceof Date && !isNaN( $scope.dt1.valueOf() ) ) )
              {
                  //gets the submission that matches the date and client
                  $scope.submission = $scope.findSpecificSubmission();
                  Cache.setAllUserSubmissions( $scope.totalSubmissions );
                  if ( $scope.submission )
                  {
                      $rootScope.$broadcast( "submissionFound", $scope.submission );
                      $scope.missingLineItems = $scope.submission.LineItems.length < 1;
                      $scope.submissionExists = true;
                      $scope.createNewItemLoad = $scope.submission.StatusId == 1 || $scope.submission.StatusId == 4 || $scope.submission.StatusId == 6;
                  } else
                  {
                      $scope.currentDescription = '';
                      $scope.submissionExists = false;
                  }
                  return true;
              } else
              {
                  return false;
              }

          };

          /**
          * Get the list of all submissions made by that user
          * this function is called on page load
          */
          $scope.getSubmissionList = function () {
              if ( Cache.getAllUserSubmissions() != undefined )
              {
                  $scope.totalSubmissions = Cache.getAllUserSubmissions();
              } else
              {
                  SubmissionService.getSubmissionsByUsername().then(
                  function ( success ) {
                      var userSubmissions = success.data;
                      for ( var i = 0; i < userSubmissions.length; i++ )
                      {
                          var receipts = [];
                          //get all receipts in that submission
                          for ( var b = 0; b < userSubmissions[i].LineItems.length; b++ )
                          {
                              if ( userSubmissions[i].LineItems[b].Receipts.length != 0 )
                              {
                                  for ( var c = 0; c < userSubmissions[i].LineItems[b].Receipts.length; c++ )
                                  {
                                      receipts.push( userSubmissions[i].LineItems[b].Receipts[c] );
                                  }
                              }
                          }
                          userSubmissions[i]["allSubmissionReceipts"] = receipts;
                          if ( receipts.length > 0 )
                          {
                              userSubmissions[i]["ReceiptPresent"] = true;
                          } else
                          {
                              userSubmissions[i]["ReceiptPresent"] = false;
                          }
                      }
                      $scope.totalSubmissions = userSubmissions;
                      Cache.setAllUserSubmissions( userSubmissions );
                  }, function ( error ) {

                      var errorObj = {
                          username: Authentication.getUser(),
                          endpoint: error.config.url,
                          errormessage: error.statusText
                      };

                      LogError.logError( errorObj );
                  }
                 )
              }
          };

          $scope.getSubmissionList();

          /**
          * set initial values of scope variables upon page load
          */
          if ( Cache.getRepliconProjects() != undefined )
          {
              $scope.clients = Cache.getRepliconProjects();
              $scope.selectedClient = $scope.clients[0];
              if ( Cache.getSubmission() )
              {
                  $scope.clientManager = Cache.getSubmission().ManagerName + "@catalystitservices.com";
              } else
              {
                  $scope.clientManager = $scope.selectedClient.ManagerName + "@catalystitservices.com";
              }

              $scope.loading = false;
          } else
          {
              // load replicon projects into clients array upon page load
              getAllProjects();
          }

          /**
          * listen for broadcast message signaling the completion of database sync
          */
          $scope.$on( "syncComplete", function () {
              $scope.syncComplete = true;
              //populates the drop down list with projects.
              getAllProjects();
          } );


          /**
           * Poulates the client drop down list.
          **/
          function getAllProjects() {
              //update the project list when sync succeeds
              RepliconProjectService.getAllRepliconProjects().then(

                  function ( allRepliconProjects ) {
                      if ( allRepliconProjects.data.length > 0 )
                      {
                          Cache.setRepliconProjects( allRepliconProjects.data );
                          $scope.clients = allRepliconProjects.data;
                          $scope.selectedClient = $scope.clients[0];
                          $scope.clientManager = $scope.selectedClient.ManagerName + "@catalystitservices.com";
                          $scope.loading = false;
                          $scope.hasNoProjects = false;
                      } else
                      {
                          $scope.hasNoProjects = true;
                      }

                  }, function ( error ) {

                      var errorObj = {
                          username: Authentication.getUser(),
                          endpoint: error.config.url,
                          errormessage: error.statusText
                      };

                      LogError.logError( errorObj );
                  } );
          }

          /**
          * opens the modal so the user can create a new submission
          */
          $scope.createNewSubmission = function () {
              Cache.setOrigin( "createSubmission" );
              $scope.disableCreate = true;

              var submission = {
                  statusId: 1,
                  RepliconProjectId: $scope.selectedClient.ProjectId,
                  WeekEndingDate: $scope.dt1,
                  ManagerName: $scope.selectedClient.ManagerName,
                  Description: $scope.currentDescription
              };

              SubmissionService.submitExpenseReport( submission ).then(
                  function ( success ) {
                      $scope.submissionCreated = true;

                      $scope.submissionId = success.data.SubmissionId;
                      $scope.submission = success.data;

                      $scope.getSubmissionList();
                      LineItemService.resetLineItem();
                      LineItemService.setUnderEdit( false );
                      LineItemService.setSubmissionId( success.data.SubmissionId );
                      LineItemService.setExpenseCategoryName( 'Mileage' );
                      LineItemService.setEndingWeek( $scope.dt1 );
                      if ( Cache.getAllUserSubmissions() != undefined )
                      {
                          var userSubmission = Cache.getAllUserSubmissions();
                      } else
                      {
                          var userSubmission = $scope.totalSubmissions;
                      }
                      $scope.submission.RepliconProject = $scope.selectedClient;
                      $scope.submission.Status = { "StatusName": "In Progress" };
                      $scope.submission["allSubmissionReceipts"] = [];
                      $scope.submission["ReceiptPresent"] = false;
                      userSubmission.push( $scope.submission );
                      Cache.setAllUserSubmissions( userSubmission );
                      Cache.setSubmission( $scope.submission );
                      $rootScope.$broadcast( "addSubmissionEmployeeTable" );
                      $scope.openModal();
                  }, function ( error ) {

                      var errorObj = {
                          username: Authentication.getUser(),
                          endpoint: error.config.url,
                          errormessage: error.statusText
                      };

                      LogError.logError( errorObj );
                  }
              );
          };

          /**
          * if user selects to delete the submission they are currently viewing or editing,
          * display the confirmation modal asking if they are certain they want to delete it
          */
          $scope.deleteSubmission = function () {
              MessageService.setMessage( "Are you sure you want to delete this submission?" );
              MessageService.setBroadCastMessage( "confirmDeleteSubmissionUnderEdit" );
              MessageService.setId( $scope.submission.SubmissionId );
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/confirmModal.html',
                  controller: 'confirmModalController',
                  resolve: {
                      selectedType: function () {
                          return $scope.selectedType;
                      }
                  }
              } );
          };

          /**
          * this will recieve the broadcast message if user confirms their desire
          * to delete the current submission and remove it from the db
          */
          $scope.$on( "confirmDeleteSubmissionUnderEdit", function () {
              MessageService.setMessage( "" );
              MessageService.setBroadCastMessage( "" );
              SubmissionService.deleteExpenseReport( MessageService.getId() ).then( function ( success ) {
                  $window.location.href = '/';
              }, function ( error ) {
                  var errorObj = {
                      username: Authentication.getUser(),
                      endpoint: error.config.url,
                      errormessage: error.statusText
                  };

                  LogError.logError( errorObj );
              } );

          } );

          /**
          * prepares LineItemService to create a new line item
          * then opens the LineItem modal
          */
          $scope.addNewLineItem = function () {
              LineItemService.resetLineItem();
              LineItemService.setUnderEdit( false );
              var currentDate = $scope.dt1;

              if ( !$scope.submission )
              {
                  $scope.submission = Cache.getSubmission();
                  LineItemService.setSubmissionId( $scope.submission.SubmissionId );
              }

              if ( !currentDate )
              {
                  currentDate = new Date( $scope.submission.WeekEndingDate );
              }

              LineItemService.setSubmissionId( $scope.submission.SubmissionId );
              LineItemService.setExpenseCategoryName( 'Mileage' );
              LineItemService.setEndingWeek( currentDate );
              $scope.openModal();
          };

          /**
          * edit the selected expense line
          */
          $scope.editExpenseLine = function ( lineItem, index ) {
              Cache.setLineItemIndex( index );
              LineItemService.resetLineItem();
              parseMetaData( lineItem.LineItemMetadata );
              LineItemService.setSubmissionId( lineItem.SubmissionId );
              LineItemService.setLineItemId( lineItem.LineItemId );
              LineItemService.setExpenseCategoryName( lineItem.ExpenseCategory.ExpenseCategoryName );
              LineItemService.setLineItemDate( new Date( lineItem.LineItemDate ) );
              LineItemService.setLineItemDesc( lineItem.LineItemDesc );
              LineItemService.setLineItemAmount( lineItem.LineItemAmount );
              LineItemService.setBillable( lineItem.Billable );
              LineItemService.setEndingWeek( $scope.dt1 );
              LineItemService.setUnderEdit( true );
              $scope.openModal();
          };

          $scope.openDetailsView = function () {
          };

          /**
          * internal function used by the editExpenseLine function above
          * to parse the MetaData string stored in a line item for display 
          * on the modal when editing the line item
          */
          function parseMetaData( string ) {
              var days = {
                  sunday: {},
                  monday: {},
                  tuesday: {},
                  wednesday: {},
                  thursday: {},
                  friday: {},
                  saturday: {}
              };
              var res = string.split( ',' );
              res.forEach( function ( str ) {
                  var keyValue = str.split( ':' );
                  switch ( keyValue[0] )
                  {
                      case 'Miles':
                          LineItemService.setMiles( keyValue[1] );
                      case 'Origin':
                          LineItemService.setOrigin( keyValue[1] );
                      case 'Destination':
                          LineItemService.setDestination( keyValue[1] );
                      case 'EndingWeek':
                          LineItemService.setEndingWeek( new Date( keyValue[1] ) );
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
              } );
              LineItemService.setDays( days );
          }

          /**
          * opens receiptModal.html to show all the receipts for all the line items 
          * in a particular submission
          */
          $scope.showAllReceipts = function () {
              ReceiptService.setReceipts( ReceiptService.getAllReceipts() );
              ReceiptService.setShowAllReceipts( true );
              ReceiptService.setAddReceipt( false );
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/receiptModal.html',
                  controller: 'receiptController'
              } );
          }

          /**
          * receives broadcast message from submissionTable.js
          * if there is a submission found, check for receipts related to it
          */
          $scope.$on( "checkReceipts", function () {
              if ( ReceiptService.getAllReceipts() && ReceiptService.getAllReceipts().length != 0 )
              {
                  $scope.receipts = false;
              } else
              {
                  var receipts = [];
                  //get all receipts in that submission
                  for ( var i = 0; i < $scope.submission.LineItems.length; i++ )
                  {
                      if ( $scope.submission.LineItems[i].Receipts.length != 0 )
                      {
                          for ( var b = 0; b < $scope.submission.LineItems[i].Receipts.length; b++ )
                          {
                              receipts.push( $scope.submission.LineItems[i].Receipts[b] );
                          }
                      }
                  }
                  ReceiptService.setAllReceipts( receipts );
                  if ( receipts.length != 0 )
                  {
                      $scope.receipts = false;
                  } else
                  {
                      $scope.receipts = true;
                  }
              }
              $scope.receiptsAmount = ReceiptService.getAllReceipts().length;
          } );

          /**
          * populate the manager in the view for the client selected from the dropdown
          */
          $scope.getManager = function () {
              $scope.clientManager = $scope.selectedClient.ManagerName + "@catalystitservices.com";
          };

          /** 
          * functions for interacting with the modal pages
          * pulling expense items from modals and displaying them in the submissionTable
          */
          $scope.openModal = function ( index ) {

              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/formDetailsView.html',
                  controller: 'FormDetailsCtrl',
              } );

              //as a result of the LineItem modal closing ($modalInstance.close in formDetailsView.js)
              //this will save the new line item or save the edited line item returned in successMessage
              modalInstance.result.then(
                  function ( successMessage ) {
                      if ( LineItemService.getUnderEdit() == true )
                      {
                          LineItemService.updateLineItem( successMessage.LineItemId, successMessage ).then(
                              function ( success ) {
                                  if ( Cache.getAllUserSubmissions() != undefined )
                                  {
                                      var userSubmission = Cache.getAllUserSubmissions();
                                  } else
                                  {
                                      var userSubmission = $scope.totalSubmissions;
                                  }
                                  userSubmission[Cache.getSubmissionIndex()].LineItems[Cache.getLineItemIndex()] = success.data;
                                  var submissionTotalAmount = 0;
                                  for ( var i = 0; i < userSubmission[Cache.getSubmissionIndex()].LineItems.length; i++ )
                                  {
                                      submissionTotalAmount += userSubmission[Cache.getSubmissionIndex()].LineItems[i].LineItemAmount;
                                  }
                                  userSubmission[Cache.getSubmissionIndex()].TotalAmount = submissionTotalAmount;
                                  LineItemService.resetLineItem();
                              },
                                function ( error ) {
                                    var errorObj = {
                                        username: Authentication.getUser(),
                                        endpoint: error.config.url,
                                        errormessage: error.statusText
                                    };

                                    LogError.logError( errorObj );
                                } );
                          LineItemService.setUnderEdit( false );
                      } else
                      {
                          successMessage.forEach( function ( lineItem ) {
                              LineItemService.submitLineItem( lineItem ).then(
                                              function ( success ) {
                                                  if ( Cache.getAllUserSubmissions() != undefined )
                                                  {
                                                      var userSubmission = Cache.getAllUserSubmissions();
                                                  } else
                                                  {
                                                      var userSubmission = $scope.totalSubmissions;
                                                  }
                                                  $scope.disableCreate = false;
                                                  success.data.ExpenseCategory = { "ExpenseCategoryName": LineItemService.getExpenseCategoryNameById( success.data.ExpenseCategoryId ) };
                                                  userSubmission[Cache.getSubmissionIndex()].LineItems.push( success.data );
                                                  var submissionTotalAmount = 0;
                                                  for ( var i = 0; i < userSubmission[Cache.getSubmissionIndex()].LineItems.length; i++ )
                                                  {
                                                      submissionTotalAmount += userSubmission[Cache.getSubmissionIndex()].LineItems[i].LineItemAmount;
                                                  }
                                                  userSubmission[Cache.getSubmissionIndex()].TotalAmount = submissionTotalAmount;
                                                  $scope.showComments = true;
                                                  LineItemService.setLineItemId( success.data.LineItemId );
                                                  Cache.setLineItemIndex( userSubmission[Cache.getSubmissionIndex()].LineItems.length - 1 );
                                                  if ( ReceiptService.getAddReceipt() )
                                                  {
                                                      ReceiptService.setReceipts( userSubmission[Cache.getSubmissionIndex()].LineItems[Cache.getLineItemIndex()].Receipts );
                                                      var modalInstance = $modal.open( {
                                                          templateUrl: 'Views/Home/views/modals/receiptModal.html',
                                                          controller: 'receiptController'
                                                      } );
                                                  } else
                                                  {
                                                      if ( success.data.ExpenseCategoryId !== 1 )
                                                      {
                                                          MessageService.setMessage( 'Would you like to add a receipt for this line item?' );
                                                          MessageService.setBroadCastMessage( "addReeciptForLineItem" );
                                                          var modalInstance = $modal.open( {
                                                              templateUrl: 'Views/Home/views/modals/confirmModal.html',
                                                              controller: 'confirmModalController'
                                                          } );
                                                      }
                                                  }
                                                  $scope.$on( "addReeciptForLineItem", function () {
                                                      ReceiptService.setAddReceipt( true );
                                                      ReceiptService.setReceipts( userSubmission[Cache.getSubmissionIndex()].LineItems[Cache.getLineItemIndex()].Receipts );
                                                      var modalInstance = $modal.open( {
                                                          templateUrl: 'Views/Home/views/modals/receiptModal.html',
                                                          controller: 'receiptController'
                                                      } );
                                                  } );
                                              },
                                              function ( error ) {
                                                  var errorObj = {
                                                      username: Authentication.getUser(),
                                                      endpoint: error.config.url,
                                                      errormessage: error.statusText
                                                  };

                                                  LogError.logError( errorObj );
                                              } );
                          } );

                      }
                  },
                function ( error ) {
                    $scope.disableCreate = false;
                    
                }
            );
          };


          /**
           ** Called when the unsubmit broadcast is triggered. 
           **/
          $scope.$on( "unsubmitExpense", function ( response, comment ) {

              $scope.submission.Status["StatusName"] = 'In Progress'
              $scope.submission.Status["StatusId"] = 1
              $scope.currentSubmission.Comments = new Array();
              $scope.currentSubmission.Comments[0] = {};
              $scope.currentSubmission.Comments[0]["ExpenseComment"] = comment;

              SubmissionService.updateSubmission( $scope.submission.SubmissionId, $scope.submission ).then(
                  function ( success ) {
                      var userSubmission = Cache.getAllUserSubmissions();
                      userSubmission[Cache.getSubmissionIndex()] = $scope.submission
                      $scope.dt1 = '';
                      $scope.currentDescription = "";
                      $scope.submissionCreated = false;
                      $scope.startCreateSubmission = false;
                      $window.location.reload();
                  },
                  function ( error ) {
                      var errorObj = {
                          username: Authentication.getUser(),
                          endpoint: error.config.url,
                          errormessage: error.statusText
                      };

                      LogError.logError( errorObj );
                  } );
          } );

          /** 
          * recieves broadcast message from MessageService confirming
          * that the expense report is being submitted.
          */
          $scope.$on( "confirmSubmission", function ( response, comment ) {
              if ( $scope.submission.LineItems.length > 0 )
              {
                  $scope.submission.Status["StatusName"] = 'Submitted'
                  $scope.submission.Status["StatusId"] = 2
                  $scope.currentSubmission.Comments = new Array();
                  $scope.currentSubmission.Comments[0] = {};
                  $scope.currentSubmission.Comments[0]["ExpenseComment"] = comment;

                  SubmissionService.updateSubmission( $scope.submission.SubmissionId, $scope.submission ).then(
                      function ( success ) {
                          var userSubmission = Cache.getAllUserSubmissions();
                          userSubmission[Cache.getSubmissionIndex()] = $scope.submission
                          $scope.dt1 = '';
                          $scope.currentDescription = "";
                          $scope.submissionCreated = false;
                          $scope.startCreateSubmission = false;
                          $window.location.reload();
                      },
                      function ( error ) {
                          var errorObj = {
                              username: Authentication.getUser(),
                              endpoint: error.config.url,
                              errormessage: error.statusText
                          };

                          LogError.logError( errorObj );

                      } );
              } else
              {
                  MessageService.setMessage( 'You can not submit a table without any expense items' );
                  MessageService.setBroadCastMessage( "confirmNoEmptyLineItems" );
                  MessageService.setId( $scope.submission.SubmissionId );
                  var modalInstance = $modal.open( {
                      templateUrl: 'Views/Home/views/modals/confirmModal.html',
                      controller: 'confirmModalController',
                      resolve: {
                          selectedType: function () {
                              return $scope.selectedType;
                          }
                      }
                  } );
              }

          } );



          /**
          * submit the submissionTable, checking to see that the submission has at least one
          * line item, then updating the submission with the correct status id
          */
          $scope.submitTable = function () {

              // the manager does not need a comment when approving
              MessageService.setAddComment( true );
              MessageService.setCommentRequired( false );
              MessageService.setMessage( "Please confirm you are about to submit this expense report for approval." );
              MessageService.setBroadCastMessage( "confirmSubmission" );
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/confirmModal.html',
                  controller: 'confirmModalController'
              } );



          };

          /** 
          * recieves broadcast message from MessageService confirming
          * that user can not submit an empty table
          */
          $scope.$on( "confirmNoEmptyLineItems", function () {
              MessageService.setMessage( "" );
              MessageService.setBroadCastMessage( "" );
              $route.reload();
          } );

          /**
          * changes submission status from 2 back to 1 so that 
          * user may update the line items in their submission
          */
          $scope.unSubmit = function () {

              MessageService.setAddComment( true );
              MessageService.setCommentRequired( false );
              MessageService.setMessage( "Please confirm you are about to unsubmit this expense report." );
              MessageService.setBroadCastMessage( "unsubmitExpense" );
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/confirmModal.html',
                  controller: 'confirmModalController'
              } );

          }

          /**
          * if user chooses to save a table, not submit it,
          * status will be set to 1, in progress
          */
          $scope.saveTable = function () {

              //Update the updatable fields
              $scope.submission.Description = $scope.currentDescription;
              $scope.submission.RepliconProjectId = $scope.selectedClient.ProjectId,
              $scope.submission.WeekEndingDate = $scope.dt1,
              $scope.submission.Status["StatusName"] = 'In Progress'
              $scope.submission.Status["StatusId"] = 1

              //Save the changes to the database
              SubmissionService.updateSubmission( $scope.submission.SubmissionId, $scope.submission ).then(
                 function ( success ) {
                     var userSubmission = Cache.getAllUserSubmissions();
                     userSubmission[Cache.getSubmissionIndex()] = $scope.submission
                     $scope.dt1 = '';
                     $scope.currentDescription = "";
                     $scope.submissionCreated = false;
                     $scope.startCreateSubmission = false;
                     $window.location.reload();
                 },
                 function ( error ) {
                     var errorObj = {
                         username: Authentication.getUser(),
                         endpoint: error.config.url,
                         errormessage: error.statusText
                     };

                     LogError.logError( errorObj );
                 } );


          };

          /**
          * if user clicks current week on datepicker,
          * set $scope.dt1 to the saturday of the current week
          */
          $scope.$watch(
              'dt1',
              function ( newValue, oldValue ) {
                  if ( newValue != '' )
                  {
                      if ( typeof newValue == 'string' )
                      {
                          return;
                      }
                      if ( newValue.getDay() === 6 )
                      {
                          $scope.dt1 = newValue;
                      }
                      else
                      {
                          var difference = 6 - newValue.getDay();
                          var weekEnding = new Date();
                          $scope.dt1 = new Date( weekEnding.setDate( newValue.getDate() + difference ) );
                      }
                  } else
                  {
                      return;
                  }
              },
              true
          );

          $scope.$watch(
              'selectedClient',
              function ( newValue, oldValue ) {
                  if ( newValue != oldValue )
                  {
                      $scope.clientAndDate();
                  } else
                  {
                      return;
                  }
              }, true );

      }
  ] );
