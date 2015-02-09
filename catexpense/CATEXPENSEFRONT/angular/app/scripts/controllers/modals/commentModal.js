'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller('CommentController', function ($scope, $modalInstance, $rootScope, Application) {

      $scope.comment = Application.getComment().ExpenseComment;

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
  });