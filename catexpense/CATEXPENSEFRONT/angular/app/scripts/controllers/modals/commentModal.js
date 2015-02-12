'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller('CommentController', ["$scope", "$modalInstance", "$modal", "$rootScope", "Application", "CommentService", "MessageService", function ($scope, $modalInstance, $modal, $rootScope, Application, CommentService, MessageService) {

      $scope.comment = Application.getComment().ExpenseComment;
      $scope.isNewComment = Application.getIsNewComment();

      /**
      * cancel the addition of a comment and close the modal
      */
      $scope.cancel = function () {
          $modalInstance.dismiss("dismiss comment modal");
          Application.setComment("");
      }

      /**
      * sends broadcast message to submissionTable.js
      */
      $scope.save = function () {
          $rootScope.$broadcast("saveComment", $scope.comment);
          $modalInstance.dismiss();
      }
      var commentIndex = Application.getCommentIndex();
      /**
       * delete a comment, will pop up a confirmation modal before delete is performed
       */
      $scope.deleteComment = function () {          
          MessageService.setMessage("Are you sure you want to delete this comment?");
          MessageService.setBroadCastMessage("confirmDeleteComment");
          var modalInstance = $modal.open({
              templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
              controller: 'confirmModalController'
          });
      }

      /**
       * receives confirmation from confirmModal that a comment would like to be deleted
       * removes the comment from the line item in the database
       */
      $scope.$on("confirmDeleteComment", function () {
          CommentService.DeleteComment(Application.getSubmission().Comments[commentIndex].CommentId).then(function (success) {
              var submission = Application.getSubmission();
              submission.Comments.splice(commentIndex, 1);
              Application.setSubmission(submission);
              $modalInstance.dismiss("dismiss confirm modal");
          });
      });
  }]);