'use strict';

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
          ReceiptService
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

          $scope.isFinanceApprover = Authentication.getIsFinanceApprover();

          /**
          * finance tatuses is used for the drop down filter
          */
          $scope.financeStatuses = [
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
           * Determines if the employee table is expanded or contracted
           * True -> table expanded, hide the expand (+) button, show the contract (-) button
           * False -> contracted, hide the contract (-) button, show the expand (+) button
           */
          $scope.expanded = true;

          /**
          * set $scope.financeStatuses[1] to the default selected item in the list
          */
          $scope.selectedFinanceStatus = $scope.financeStatuses[1];

          /****************************************************
           *
           * Private Methods
           *
           ***************************************************/

          function loadFinanceTable() {
              if ( Cache.getPendingSubmissionsByFinanceApprover() != undefined && Cache.getPendingSubmissionsByFinanceApprover().length != 0 )
              {
                  $scope.financeSubmissions = Cache.getPendingSubmissionsByFinanceApprover();
                  financeSubmissionsContainer = $scope.financeSubmissions;
                  $scope.filterTableBySubmissionStatus( 3 );
                  $scope.setFinanceSubmissionCount( $scope.financeSubmissions.length );
              } else
              {
                  // get all the submissions for the finance approver
                  SubmissionService.getPendingSubmissionsByFinanceApprover().then(
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
                            Cache.setPendingSubmissionsByFinanceApprover( userSubmissions );
                        }
                        $scope.financeSubmissions = userSubmissions;
                        financeSubmissionsContainer = $scope.financeSubmissions;
                        $scope.filterTableBySubmissionStatus( 3 );
                        $scope.setFinanceSubmissionCount( $scope.financeSubmissions.length );
                    } );
              }
          };



          /****************************************************
           *
           * Public Methods
           *
           ***************************************************/

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
          * load the table with the filtered items
          */
          $scope.filterTableBySubmissionStatus = function ( status ) {
              var financeSubmissionsFilter = [];
              for ( var i = 0; i < financeSubmissionsContainer.length; i++ )
              {
                  if ( financeSubmissionsContainer[i].StatusId == status || status == 0 )
                  {
                      financeSubmissionsFilter.push( financeSubmissionsContainer[i] );
                  }
              }
              if ( financeSubmissionsFilter.length != 0 )
              {
                  $scope.financeSubmissions = financeSubmissionsFilter;
              } else
              {
                  $scope.financeSubmissions = [];
              }
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

      }
  ] );