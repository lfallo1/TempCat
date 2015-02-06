'use strict';

/**
 * This service will primarily deal with any functions and ajax calls related to line item comments.
 *
 * @ngdoc service
 * @name LineItemService
 * @description # LineItemComment Service 
 */
angular.module( 'expenseApp.Services' )
  .service( 'LineItemCommentService', function LineItemCommentService( $http ) {
      var self = this;

      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      self.getLineItemCommentById = function ( id ) {
          return $http( {
              method: "GET",
              url: "/api/LineItemComment",
              params: { id: id }
          } );
      };

      self.getLineItemCommentsBySubmissionId = function ( id ) {
          return $http( {
              method: "GET",
              url: "/api/LineItem/GetLineItemCommentsBySubmissionId",

          } );
      };

      //=====================================================================//
      //
      //  list of POST methods
      //
      //=====================================================================//

      self.CreateLineItemComment = function ( id, comment ) {
          return $http( {
              url: '/api/LineItem/CreateLineItemComment',
              method: 'POST',
              params: { submissionId: id, comment: comment }
          } );
      };

      //=====================================================================//
      //
      //  list of PUT methods
      //
      //=====================================================================//

      self.PutLineItemComment = function ( id, comment ) {
          return $http( {
              url: '/api/LineItem/PutLineItemComment',
              method: 'PUT',
              params: { id: id, comment: comment }
          } );
      };

      //=====================================================================//
      //
      //  list of DELETE methods
      //
      //=====================================================================//

      self.DeleteLineItemComment = function ( id ) {
          return $http( {
              url: '/api/LineItem/DeleteLineItemComment',
              method: 'DELETE',
              params: { "id": id }
          } );
      };

  } );