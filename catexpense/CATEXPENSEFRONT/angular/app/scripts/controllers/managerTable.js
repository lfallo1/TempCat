'use strict';

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
      "LogError",
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
          ReceiptService,
          LogError
          ) {

          /****************************************************
           *
           * Private Variables
           *
           ***************************************************/

          /**
          * Array containing all of the submissions visible to the manager.
          */
          var managerSubmissionsContainer = [];

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
           * Determines if the manager table is expanded or contracted
           * True -> table expanded, hide the expand (+) button, show the contract (-) button
           * False -> contracted, hide the contract (-) button, show the expand (+) button
           */
          $scope.expanded = true;

          /**   
           * Determines if the manager table becomes visible to the user.
           * True -> table is visible because user is a manager
           * False -> table is not visible because user is not a manager
           */
          $scope.isManager = Authentication.getIsManager();

          /**
           * List of statuses that appear in the dropdown filter.
           */
          $scope.managerStatusList = [
            {
                name: 'All',
                value: '0'
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
            }
          ];

          /**
           * Set the default manager table filter.
           * Currently set to filter by 'Submitted' status.
           */
          $scope.selectedStatus = $scope.managerStatusList[1];

          /****************************************************
           *
           * Private Methods
           *
           ***************************************************/

          /**
           * Load all of the submissions for a manager table.
           */
          function loadManagerTable() {

              //load the submissions from the cacahe
              if ( Cache.getPendingSubmissionsByManagerName() !== undefined && Cache.getPendingSubmissionsByManagerName().length !== 0 )
              {

                  //load submissions from cache 
                  managerSubmissionsContainer = Cache.getPendingSubmissionsByManagerName();

                  //filter the submissions and make them appear in the table
                  $scope.filterTableBySubmissionStatus( 2 );

                  //call parent controller to set the count of the submissions awaiting approval
                  $scope.setManagerSubmissionCount( $scope.managerSubmissions.length );
              }

                  //cache is empty, load the submissions from the Database
              else
              {
                  //Call the SubmissionService and get all the submissions awaiting the user's approval
                  SubmissionService.getPendingSubmissionsByManagerName().then(

                      //call to DB was successfully
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
                              Cache.setPendingSubmissionsByManagerName( userSubmissions );
                          }

                          //save submissions to the list of all submissions
                          managerSubmissionsContainer = userSubmissions;

                          //filter the submissions and make them appear in the table
                          $scope.filterTableBySubmissionStatus( 2 );

                          //call parent controller to set the count of the submissions awaiting approval
                          $scope.setManagerSubmissionCount( $scope.managerSubmissions.length );
                      },

                      //error calling to Db
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
          * allow user to expand and contract manager table view
          */
          $scope.expandContract = function ( value ) {
              $scope.expanded = !!value;
          };

          /**
           * allow for sorting of submissions displayed in managerTable
           */
          $scope.managerOrder = function ( field ) {

              //if currently sorted by a column, clicking the same column again will reverse the current sorting order
              if ( field === sortColumn.field )
              {
                  sortColumn.reverse = !sortColumn.reverse;
                  $scope.managerSubmissions = orderBy( $scope.managerSubmissions, sortColumn.field, sortColumn.reverse );
              }

                  //sort by a column in alphabetical order
              else
              {
                  sortColumn.field = field;
                  sortColumn.reverse = false;
                  $scope.managerSubmissions = orderBy( $scope.managerSubmissions, sortColumn.field, sortColumn.reverse );
              };
          };

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
          };

          /**
           * Display the submissions that match the status selected in the dropdown.
           */
          $scope.filterTableBySubmissionStatus = function ( status ) {

              //array to store the submissions that are found to match the filter
              var managerSubmissionsFilter = [];

              //find and save the submissions that match the filter
              for ( var i = 0; i < managerSubmissionsContainer.length; i++ )
              {
                  //if the submissions's status matches the filter selected OR the filter is set to All
                  if ( managerSubmissionsContainer[i].StatusId == status || status == 0 )
                  {
                      managerSubmissionsFilter.push( managerSubmissionsContainer[i] );
                  }
              }

              //display the filtered submissions
              $scope.managerSubmissions = managerSubmissionsFilter;
          };

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
          };

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
          };


          /**
          * Listens for a delete broadcast message
          */
          $scope.$on( "confirmManagerDeleteSubmission", function () {
              MessageService.setMessage( "" );
              MessageService.setBroadCastMessage( "" );
              SubmissionService.deleteExpenseReport( MessageService.getId() ).then(
                  function ( success ) {
                      $scope.managerSubmissions.splice( Cache.getSubmissionIndex(), 1 );
                      Cache.setPendingSubmissionsByManagerName( $scope.managerSubmissions );
                  } );
          } );

          /**
           * This method will run on page load.
           */
          $scope._onLoad = function () {

              /**
               * if user is a manager, load managerTable with submissions awaiting approval
               */
              if ( Authentication.getIsManager() )
              {
                  loadManagerTable();
              }
          };

          $scope._onLoad();

      }
  ] );