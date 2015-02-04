'use strict';

angular.module('expenseApp')
  .controller('CommentController', function ($scope, $modalInstance, $rootScope, Application) {
      $scope.comment = Application.getComment().ExpenseComment;
      $scope.cancel = function () {
          $modalInstance.dismiss("dismiss comment modal");
          Application.setComment("");
      }
      $scope.save = function () {
          $rootScope.$broadcast("saveComment", $scope.comment);
          $modalInstance.dismiss();
      }
  });