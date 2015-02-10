'use strict';

/**
 * This service will primarily deal with any functions and ajax calls related to comments.
 *
 * @ngdoc service
 * @name Service
 * @description # Comment Service 
 */
angular.module('expenseApp.Services')
  .service('CommentService', ["$http", function CommentService($http) {
      var self = this;

      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      self.getCommentById = function (id) {
          return $http({
              method: "GET",
              url: "/api/Comment",
              params: { id: id }
          });
      };

      self.getCommentsBySubmissionId = function (id) {
          return $http({
              method: "GET",
              url: "/api/Comment/GetCommentsBySubmissionId",

          });
      };

      //=====================================================================//
      //
      //  list of POST methods
      //
      //=====================================================================//

      self.CreateComment = function (id, comment) {
          return $http({
              url: '/api/Comment/CreateComment',
              method: 'POST',
              params: { submissionId: id, comment: comment }
          });
      };

      //=====================================================================//
      //
      //  list of PUT methods
      //
      //=====================================================================//

      self.PutComment = function (id, comment) {
          return $http({
              url: '/api/Comment/PutComment',
              method: 'PUT',
              params: { id: id, comment: comment }
          });
      };

      //=====================================================================//
      //
      //  list of DELETE methods
      //
      //=====================================================================//

      self.DeleteComment = function (id) {
          return $http({
              url: '/api/Comment/DeleteComment',
              method: 'DELETE',
              params: { "id": id }
          });
      };

  }]);