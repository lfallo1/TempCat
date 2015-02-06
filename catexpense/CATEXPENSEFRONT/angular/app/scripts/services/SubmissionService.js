'use strict';

/**
 * @ngdoc service
 * @name SubmissionService
 * @description # Submission Service 
 */
angular.module( 'expenseApp.Services' )
  .service( 'SubmissionService', function SubmissionService( $http, Application ) {
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








      //=====================================================================//
      //
      //  THESE METHODS DO NOT BELONG HERE. PLEASE MOVE THEM TO THEIR APPROPRIATE SERVICE FOR MY SANITY'S SAKE.
      //
      //=====================================================================//

      /**
      * This will check to see if the user is logged in.
      */
      self.isLoggedIn = function () {
          return $http( {
              url: '/api/login/isLoggedIn',
              method: 'GET'
          } );
      };

      /**
       * This will log the user out and destroy the session
       */
      self.userLogout = function () {
          return $http( {
              method: "POST",
              url: "/api/login/userLogout"
          } );
      };

      /**
       * This will attempt to log the user in with the given user name and password
       */
      self.userlogin = function ( username, password ) {
          return $http( {
              method: "POST",
              url: "/api/login/userlogin",
              data: {
                  Username: username,
                  Password: password
              }
          } );
      };


      self.PutLineItemComment = function ( id, comment ) {
          return $http( {
              url: '/api/LineItem/PutLineItemComment',
              method: 'PUT',
              params: { id: id, comment: comment }
          } );
      };

      self.DeleteLineItemComment = function ( id ) {
          return $http( {
              url: '/api/LineItem/DeleteLineItemComment',
              method: 'DELETE',
              params: { "id": id }
          } );
      };

      self.CreateLineItemComment = function ( id, comment ) {
          return $http( {
              url: '/api/LineItem/CreateLineItemComment',
              method: 'POST',
              params: { submissionId: id, comment: comment }
          } );
      };
  } );