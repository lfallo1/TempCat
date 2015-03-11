'use strict';

/**
 * @ngdoc service
 * @name SubmissionService
 * @description # Submission Service 
 */
angular.module( 'expenseApp.Services' )
  .service(
  'SubmissionService',
  [
      "$http",
      function SubmissionService(
          $http
          ) {

          var self = this;

          //=====================================================================//
          //
          //  list of GET methods
          //
          //=====================================================================//

          /**
           * GETS all submissions that were created by the current user
           */
          self.getSubmissionsByUsername = function () {
              return $http( {
                  method: "GET",
                  url: "/api/Submissions",
                  async: false
              } );
          };

          /**
           * GETS all submissions that have the logged in user as a manager and that have a status of 'submitted'
           */
          self.getPendingSubmissionsByManagerName = function ( data ) {
              return $http( {
                  method: "GET",
                  url: "/api/Submission/GetPendingSubmissionsByManagerName"
              } );
          };

          /**
           * GETS all submissions that have the logged in user as a finance approver and that have a status of 'manager_approved'
           */
          self.getPendingSubmissionsByFinanceApprover = function ( data ) {
              return $http( {
                  method: "GET",
                  url: "/api/Submission/GetPendingSubmissionsByFinanceApprover"
              } );
          };

          //=====================================================================//
          //
          //  list of POST methods
          //
          //=====================================================================//

          /**
           * POSTS a new submission
           */
          self.submitExpenseReport = function ( data ) {
              return $http( {
                  url: '/api/Submission',
                  method: 'POST',
                  data: data
              } );
          };

          //=====================================================================//
          //
          //  list of PUT methods
          //
          //=====================================================================//

          /**
           * updates the submission that the submission id belongs to, it will update the status, and 
           * the line item comment as well
           */
          self.updateSubmission = function ( SubmissionId, submission ) {
              delete submission['Receipts'];
              return $http( {
                  method: "PUT",
                  url: '/api/Submissions',
                  params: { id: SubmissionId },
                  data: submission
              } )
          };

          //=====================================================================//
          //
          //  list of DELETE methods
          //
          //=====================================================================//

          /**
           * DELETES an existing submission
           */
          self.deleteExpenseReport = function ( id ) {
              return $http( {
                  url: '/api/Submissions',
                  method: 'DELETE',
                  params: { "id": id }
              } );
          };

      }
  ] );