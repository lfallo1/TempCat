﻿'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller(
  'FinanceTableController',
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
      "LogError",
      function ( $scope,
          $location,
          $modal,
          $route,
          $rootScope,
          $filter,
          Cache,
          SubmissionService,
          MessageService,
          Authentication,
          ReceiptService,
          LogError
          ) {

          /****************************************************
           *
           * Private Variables
           *
           ***************************************************/

          /** 
          * container for the submissions
          */
          var financeSubmissionsContainer = [];

          /**
           * Allows the fields to be orderable
           */
          var orderBy = $filter( 'orderBy' );

          /**
           * Determines how the submissions will be sorted.
           * Default sorting is by the 'TotalAmount' field.
           */
          var sortColumn = {
              field: 'TotalAmount',
              reverse: false
          };

          /****************************************************
           *
           * Public Variables
           *
           ***************************************************/

          /**
           * Determines if the finance table is expanded or contracted
           * True -> table expanded, hide the expand (+) button, show the contract (-) button
           * False -> contracted, hide the contract (-) button, show the expand (+) button
           */
          $scope.expanded = true;

          /**   
           * Determines if the finance table becomes visible to the user.
           * True -> table is visible because user is a finance approver
           * False -> table is not visible because user is not a finance approver
           */
          $scope.isFinanceApprover = Authentication.getIsFinanceApprover();

          /**
          * finance tatuses is used for the drop down filter
          */
          $scope.financeStatusList = [
            {
                name: 'All',
                value: '0'
            },
            {
                name: 'Manager Approved',
                value: '3'
            },
            {
                name: 'Finance Approved',
                value: '5'
            },
            {
                name: 'Finance Rejected',
                value: '6'
            }
          ];



          /**
          * set $scope.financeStatuses[1] to the default selected item in the list
          */
          $scope.selectedFinanceStatus = $scope.financeStatusList[1];

          /****************************************************
           *
           * Private Methods
           *
           ***************************************************/

          /**
           * Load all of the submissions for a finance table.
           *
           */
          function loadFinanceTable() {

              //load the submissions from the cache
              if ( Cache.getPendingSubmissionsByFinanceApprover() != undefined && Cache.getPendingSubmissionsByFinanceApprover().length != 0 )
              {
                  //load submissions from cache
                  financeSubmissionsContainer = Cache.getPendingSubmissionsByFinanceApprover();

                  //filter the submissions and make them appear in the table
                  $scope.filterTableBySubmissionStatus( 3 );

                  //call parent controller to set the count of the submissions awaiting finance approval.
                  $scope.setFinanceSubmissionCount( $scope.financeSubmissions.length );
              }

                  //cache is empty, load submissions from the database
              else
              {
                  //Call the SubmissionService and get all the submissions awaiting the user's approval
                  SubmissionService.getPendingSubmissionsByFinanceApprover().then(

                      //call to Db successful
                      function ( submissions ) {
                          var userSubmissions = submissions.data;

                          //look at each submission
                          for ( var i = 0; i < userSubmissions.length; i++ )
                          {
                              //create a list to store all of the receipts within the submission
                              var receipts = [];

                              //look at each lineitem within each submission
                              for ( var j = 0; j < userSubmissions[i].LineItems.length; j++ )
                              {
                                  //look at each receipt within each lineitem
                                  for ( var k = 0; k < userSubmissions[i].LineItems[j].Receipts.length; k++ )
                                  {
                                      //save each receipt to the list of total receipts
                                      receipts.push( userSubmissions[i].LineItems[j].Receipts[k] );
                                  }
                              }

                              //save the list of all receipts within the submission to a parameter
                              userSubmissions[i]["allSubmissionReceipts"] = receipts;

                              //does the specific submission have at least one receipt attached?
                              userSubmissions[i]["ReceiptPresent"] = receipts.length > 0;
                          }

                          //save the submissions to the cache
                          if ( userSubmissions.length > 0 )
                          {
                              Cache.setPendingSubmissionsByFinanceApprover( userSubmissions );
                          }

                          //save submissiosn to the list of all submissions
                          financeSubmissionsContainer = userSubmissions;

                          //filter the submissions and make them appear in the table
                          $scope.filterTableBySubmissionStatus( 3 );

                          //call parent controller to set the count of the submissions awaiting approval
                          $scope.setFinanceSubmissionCount( $scope.financeSubmissions.length );
                      },

                      //error calling to the DB
                      function ( error ) {

                          var errorObj = {
                              username: Authentication.getUser(),
                              endpoint: error.config.url,
                              errormessage: error.statusText
                          };

                          //save error
                          LogError.logError( errorObj );
                      } );
              }
          };



          /****************************************************
           *
           * Public Methods
           *
           ***************************************************/



          /**
          * expand and contract financeTable view
          */
          $scope.expandContract = function ( value ) {
              $scope.expanded = value;
          };

          /**
          * allow user to sort the submissions in the table by values in each column
          */
          $scope.financeOrder = function ( field ) {

              //if currently sorted by a column, clicking the same column again will reverse the current sorting order
              if ( field === sortColumn.field )
              {
                  sortColumn.reverse = !sortColumn.reverse;
                  $scope.financeSubmissions = orderBy( $scope.financeSubmissions, sortColumn.field, sortColumn.reverse );
              }

                  //sort by a column in alphabetical order
              else
              {
                  sortColumn.field = field;
                  sortColumn.reverse = false;
                  $scope.financeSubmissions = orderBy( $scope.financeSubmissions, sortColumn.field, sortColumn.reverse );
              };
          };

          /**
           * Display the submissions that match the status selected in the dropdown.
           */
          $scope.filterTableBySubmissionStatus = function ( status ) {

              //array to store the submissions that are found to match the filter
              var financeSubmissionsFilter = [];

              //find and save the submissions that match the filter
              for ( var i = 0; i < financeSubmissionsContainer.length; i++ )
              {
                  //if the submission's status matches the filter selected OR the filter is set to All
                  if ( financeSubmissionsContainer[i].StatusId == status || status == 0 )
                  {
                      financeSubmissionsFilter.push( financeSubmissionsContainer[i] );
                  }
              }

              //display the filtered submissiosn
              $scope.financeSubmissions = financeSubmissionsFilter;
          };

          /**
          * show all the receipts related to expense items in the particular submission
          */
          $scope.showAllAvailableReceipts = function ( allReceipts, submission, submissionIndex ) {
              Cache.setOrigin( "FinanceTable" );
              ReceiptService.setReceipts( allReceipts );
              ReceiptService.setShowAllReceipts( true );
              Cache.setSubmission( submission );
              Cache.setSubmissionIndex( submissionIndex );
              ReceiptService.setAddReceipt( false );
              var modalInstance = $modal.open( {
                  templateUrl: 'Views/Home/views/modals/receiptModal.html',
                  controller: 'receiptController'
              } );
          };

          /**
          * redirect to submission page with the submission id to allow the table to populate
          */
          $scope.loadFinaceSubmission = function ( submission, index ) {
              Cache.setSubmission( submission );
              Cache.setSubmissionStatus( submission.Status.StatusId );
              Cache.setOrigin( "FinanceTable" );
              Cache.setSubmissionIndex( index );
              var receipts = [];
              //get all receipts in that submission
              for ( var i = 0; i < submission.LineItems.length; i++ )
              {
                  for ( var b = 0; b < submission.LineItems[i].Receipts.length; b++ )
                  {
                      receipts.push( submission.LineItems[i].Receipts[b] );
                  }
              }
              ReceiptService.setAllReceipts( receipts );
              $location.path( '/submission' );
          };

          /**
          * Delete a submission by id
          */
          $scope.deleteSubmission = function ( submission, index ) {
              Cache.setSubmissionIndex( index );
              MessageService.setMessage( "Are you sure you want to delete this submission?" );
              MessageService.setBroadCastMessage( "confirmFinanceDeleteSubmission" );
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
          };

          /**
          * recieve broadcast message from MessageService
          * confirming that the user would like to remove a submission from 
          * view in their finance table
          */
          $scope.$on( "confirmFinanceDeleteSubmission", function () {
              MessageService.setMessage( "" );
              MessageService.setBroadCastMessage( "" );
              SubmissionService.deleteExpenseReport( MessageService.getId() ).then( function ( success ) {
                  $scope.financeSubmissions.splice( Cache.getSubmissionIndex(), 1 );
                  Cache.setPendingSubmissionsByFinanceApprover( $scope.financeSubmissions );
              } );

          } );


          /**
           * This method will run on page load.
           */
          $scope._onLoad = function () {

              /**
               * if the user is a finance approver, load the financeTable 
               * with submissions awaiting their approval
               */
              if ( Authentication.getIsFinanceApprover() )
              {
                  loadFinanceTable();
              }
          };

          $scope._onLoad();

      }
  ] );