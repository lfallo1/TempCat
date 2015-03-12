'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller(
  'EmployeeTableController',
  [
      "$scope",
      "$location",
      "$modal",
      "$route",
      "$rootScope",
      "$filter",
      "Cache",
      "Authentication",
      "SubmissionService",
      "MessageService",
      "ReceiptService",
      "LogError",
      function (
          $scope,
          $location,
          $modal,
          $route,
          $rootScope,
          $filter,
          Cache,
          Authentication,
          SubmissionService,
          MessageService,
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
          var employeeSubmissionsContainer = [];

          /**
           * Allows the fields to be orderable
           */
          var orderBy = $filter( 'orderBy' );

          /**
           * Determines how the submissions will be sorted.
           * Default sorting is by the 'DateCreated' field.
           */
          var sortColumn = {
              field: 'DateCreated',
              reverse: false
          };

          /****************************************************
          *
          * Public Variables
          *
          ***************************************************/

          /**
          * statuses used for the drop down filter
          */
          $scope.statuses = [
            {
                name: 'All',
                value: '0'
            },
            {
                name: 'In Progress',
                value: '1'
            },
            {
                name: 'Submitted',
                value: '2'
            },
            {
                name: 'Manager Approved',
                value: '3'
            },
            {
                name: 'Manager Rejected',
                value: '4'
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
          * set $scope.statuses[0] to the default selected item in the list
          */
          $scope.selectedStatus = $scope.statuses[0];

          /****************************************************
          *
          * Private Methods
          *
          ***************************************************/

          /**
          * load the user's submissions from the database into the table
          * upon page load
          */
          function loadEmployeeTable() {
              if ( Cache.getAllUserSubmissions() != undefined )
              {
                  var rejected = 0;
                  var userSubmissions = Cache.getAllUserSubmissions();
                  $scope.employeeSubmissions = Cache.getAllUserSubmissions();
                  for ( var i = 0; i < userSubmissions.length; i++ )
                  {
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
                  }
                  employeeSubmissionsContainer = $scope.employeeSubmissions;
                  for ( var i = 0; i < $scope.employeeSubmissions.length; i++ )
                  {
                      // a status of 4 and 6 means the submission was rejected
                      if ( $scope.employeeSubmissions[i].StatusId == 4 || $scope.employeeSubmissions[i].StatusId == 6 )
                      {
                          rejected++;
                      }
                  }
                  $rootScope.$broadcast( "employeeTotal", rejected );
              } else
              {
                  SubmissionService.getSubmissionsByUsername().then( function ( submissions ) {
                      var rejected = 0;
                      var userSubmissions = submissions.data;
                      for ( var i = 0; i < userSubmissions.length; i++ )
                      {
                          // a status of 4 and 6 means the submission was rejected
                          if ( userSubmissions[i].StatusId == 4 || userSubmissions[i].StatusId == 6 )
                          {
                              rejected++;
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
                      Cache.setAllUserSubmissions( userSubmissions );
                      $scope.employeeSubmissions = Cache.getAllUserSubmissions();
                      $rootScope.$broadcast( "employeeTotal", rejected );
                      employeeSubmissionsContainer = $scope.employeeSubmissions;
                  } );
              }
          }

          /****************************************************
          *
          * Public Methods
          *
          ***************************************************/

          /**
           * This function is called on page load.
           */
          $scope._onLoad = function () {
              loadEmployeeTable();
          };

          $scope._onLoad();

          /**
          * allow expansion and contraction of employeeTable
          */
          $scope.expandContract = function ( value ) {
              $scope.expanded = !!value;
          };

          /**
          * allow for sorting of submissions displayed in employeeTable
          */
          $scope.employeeOrder = function ( field ) {

              //if currently sorted by a column, clicking the same column again will reverse the current sorting order
              if ( field === sortColumn.field )
              {
                  sortColumn.reverse = !sortColumn.reverse;
                  $scope.employeeSubmissions = orderBy( $scope.employeeSubmissions, sortColumn.field, sortColumn.reverse );
              }

                  //sort by a column in alphabetical order
              else
              {
                  sortColumn.field = field;
                  sortColumn.reverse = false;
                  $scope.employeeSubmissions = orderBy( $scope.employeeSubmissions, sortColumn.field, sortColumn.reverse );
              };
          };

          /**
          * load the table with the filtered items
          */
          $scope.loadEmployeeTableStatusX = function ( status ) {
              var employeeSubmissionsFilter = [];
              for ( var i = 0; i < employeeSubmissionsContainer.length; i++ )
              {
                  if ( employeeSubmissionsContainer[i].StatusId == status || status == 0 )
                  {
                      employeeSubmissionsFilter.push( employeeSubmissionsContainer[i] );
                  }
              }
              $scope.employeeSubmissions = employeeSubmissionsFilter;
          };

          /**
          * redirect to submission page with the submission id to allow the table to populate
          */
          $scope.loadEmployeeSubmission = function ( submission, index ) {
              $scope.dt1 = "";
              Cache.setSubmission( submission );
              Cache.setSubmissionStatus( submission.Status.StatusId );
              Cache.setOrigin( "EmployeeTable" );
              Cache.setSubmissionIndex( index );
              ReceiptService.setAllReceipts( submission.allSubmissionReceipts );
              $location.path( '/submission' );
          };

          /**
          * redirect to submission page with the submission id to allow the table to populate
          */
          $scope.deleteSubmission = function ( submission, index ) {
              Cache.setSubmissionIndex( index );
              MessageService.setMessage( "Are you sure you want to delete this submission?" );
              MessageService.setBroadCastMessage( "confirmDeleteSubmission" );
              MessageService.setId( submission.SubmissionId );
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
          * show all the receipts related to expense items in the particular submission
          */
          $scope.showAllAvailableReceipts = function ( allReceipts, submission, submissionIndex ) {
              Cache.setOrigin( "EmployeeTable" );
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
          * recieves broadcast message from MessageService confirming user would like to delete submission
          */
          $scope.$on( "confirmDeleteSubmission", function () {
              MessageService.setMessage( "" );
              MessageService.setBroadCastMessage( "" );
              SubmissionService.deleteExpenseReport( MessageService.getId() ).then( function ( success ) {
                  $scope.employeeSubmissions.splice( Cache.getSubmissionIndex(), 1 );
                  Cache.setAllUserSubmissions( $scope.employeeSubmissions );
              }, function ( error ) { } );
          } );

          /**
          * recieves broadcast message from MessageService
          * adds newly created submission as row in employeeTable
          */
          $scope.$on( "addSubmissionEmployeeTable", function ( message ) {
              $scope.employeeSubmissions = Cache.getAllUserSubmissions();
          } );

      }
  ] );