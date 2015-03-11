﻿'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller(
  'ManagerTableController',
  [
      "$scope",
      "$location",
      "$modal",
      "$route",
      "$rootScope",
      "$filter",
      "Cache",
      "SubmissionService",
      "MessageService",
      "Authentication",
      "ReceiptService",
      function (
          $scope,
          $location,
          $modal,
          $route,
          $rootScope,
          $filter,
          Cache,
          SubmissionService,
          MessageService,
          Authentication,
          ReceiptService
          ) {
          /**
          * container for the submissions
          */
          var managerSubmissionsContainer = [];
          var orderBy = $filter( 'orderBy' );
          var sortColumn = { field: 'DateCreated', reverse: false };
          $scope.expanded = true;
          $scope.isManager = Authentication.getIsManager();

          /**
          * statuses used for the drop down filter
          */
          $scope.statuses = [
            { name: 'All', value: '0' },
            { name: 'Submitted', value: '2' },
            { name: 'Manager Approved', value: '3' },
            { name: 'Manager Rejected', value: '4' }
          ];

          /**
          * set $scope.statuses[0] to the default selected item in the list
          */
          $scope.selectedStatus = $scope.statuses[1];

          /**
          * allow user to sort submissions in table by any column
          */
          $scope.managerOrder = function ( field ) {
              if ( field === sortColumn.field )
              {
                  sortColumn.reverse = !sortColumn.reverse;
                  $scope.managerSubmissions = orderBy( $scope.managerSubmissions, sortColumn.field, sortColumn.reverse );
              } else
              {
                  sortColumn.field = field;
                  sortColumn.reverse = false;
                  $scope.managerSubmissions = orderBy( $scope.managerSubmissions, sortColumn.field, sortColumn.reverse );
              };
          };

          /**
          * allow user to expand and contract manager table view
          */
          $scope.expandContract = function ( value ) {
              $scope.expanded = value;
          };

          /**
          * load the table with the filtered items
          */
          $scope.filterTableBySubmissionStatus = function ( status ) {
              var managerSubmissionsFilter = [];
              for ( var i = 0; i < managerSubmissionsContainer.length; i++ )
              {
                  if ( managerSubmissionsContainer[i].StatusId == status || status == 0 )
                  {
                      managerSubmissionsFilter.push( managerSubmissionsContainer[i] );
                  }
              }
              if ( managerSubmissionsFilter.length != 0 )
              {
                  $scope.managerSubmissions = managerSubmissionsFilter;
              } else
              {
                  $scope.managerSubmissions = [];
              }
          }

          var loadManagerTable = function () {
              if ( Cache.getPendingSubmissionsByManagerName() != undefined )
              {
                  $scope.managerSubmissions = Cache.getPendingSubmissionsByManagerName();
                  managerSubmissionsContainer = $scope.managerSubmissions;
                  $scope.filterTableBySubmissionStatus( 2 );
                  $rootScope.$broadcast( "managerTotal", $scope.managerSubmissions.length );
              } else
              {
                  // get all the submissions for the manager
                  SubmissionService.getPendingSubmissionsByManagerName().then(
                      function ( submissions ) {
                          var userSubmissions = submissions.data;
                          for ( var i = 0; i < userSubmissions.length; i++ )
                          {
                              // a status of 4 and 6 means the submission was rejected
                              if ( userSubmissions[i].StatusId == 4 || userSubmissions[i].StatusId == 6 )
                              {
                                  //rejected++;
                              }
                              var receipts = [];
                              //get all receipts in that submission
                              for ( var b = 0; b < userSubmissions[i].LineItems.length; b++ )
                              {
                                  for ( var c = 0; c < userSubmissions[i].LineItems[b].Receipts.length; c++ )
                                  {
                                      receipts.push( userSubmissions[i].LineItems[b].Receipts[c] );
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
                          if ( userSubmissions.length > 0 )
                          {
                              Cache.setPendingSubmissionsByManagerName( userSubmissions );
                          }
                          $scope.managerSubmissions = userSubmissions;
                          managerSubmissionsContainer = $scope.managerSubmissions;
                          $scope.filterTableBySubmissionStatus( 2 );
                          $rootScope.$broadcast( "managerTotal", $scope.managerSubmissions.length );
                      } );
              }
          };

          /**
          * if user is a manager, load managerTable with submissions awaiting approval
          */
          if ( Authentication.getIsManager() )
          {
              loadManagerTable();
          }

          /**
          * show all the receipts related to expense items in the particular submission
          */
          $scope.showAllAvailableReceipts = function ( allReceipts, submission, submissionIndex ) {
              Cache.setOrigin( "ManagerTable" );
              ReceiptService.setReceipts( allReceipts );
              ReceiptService.setShowAllReceipts( true );
              Cache.setSubmission( submission );
              Cache.setSubmissionIndex( submissionIndex );
              ReceiptService.setAddReceipt( false );
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/receiptModal.html',
                  controller: 'receiptController'
              } );
          }

          /**
          * load the table with the filtered items
          */
          $scope.filterTableBySubmissionStatus = function ( status ) {
              var managerSubmissionsFilter = [];
              for ( var i = 0; i < managerSubmissionsContainer.length; i++ )
              {
                  if ( managerSubmissionsContainer[i].StatusId == status || status == 0 )
                  {
                      managerSubmissionsFilter.push( managerSubmissionsContainer[i] );
                  }
              }
              $scope.managerSubmissions = managerSubmissionsFilter;
          }

          /**
          * redirect to submission page with the submission id to allow the table to populate
          */
          $scope.loadManagerSubmission = function ( submission, index ) {
              Cache.setSubmission( submission );
              Cache.setSubmissionStatus( submission.Status.StatusId );
              Cache.setOrigin( "ManagerTable" );
              Cache.setSubmissionIndex( index );
              var receipts = [];
              //get all receipts in that submission
              for ( var i = 0; i < submission.LineItems.length; i++ )
              {
                  if ( submission.LineItems[i].Receipts.length != 0 )
                  {
                      for ( var b = 0; b < submission.LineItems[i].Receipts.length; b++ )
                      {
                          receipts.push( submission.LineItems[i].Receipts[b] );
                      }
                  }
              }
              ReceiptService.setAllReceipts( receipts );
              $location.path( '/submission' );
          }

          /**
          * Delete a submission by id
          */
          $scope.deleteSubmission = function ( submission, index ) {
              Cache.setSubmissionIndex( index );
              MessageService.setMessage( "Are you sure you want to delete this submission?" );
              MessageService.setBroadCastMessage( "confirmManagerDeleteSubmission" );
              MessageService.setId( submission.SubmissionId )
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


          /**
          * Listens for a delete broadcast message
          */
          $scope.$on( "confirmManagerDeleteSubmission", function () {
              MessageService.setMessage( "" );
              MessageService.setBroadCastMessage( "" );
              SubmissionService.deleteExpenseReport( MessageService.getId() ).then( function ( success ) {
                  $scope.managerSubmissions.splice( Cache.getSubmissionIndex(), 1 );
                  Cache.setPendingSubmissionsByManagerName( $scope.managerSubmissions );
              } );

          } );

      }
  ] );