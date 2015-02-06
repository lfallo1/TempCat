'use strict';

angular.module('expenseApp')
  .controller('confirmModalController', function ($scope, $modalInstance, MessageService, $rootScope) {
      $scope.message = MessageService.getMessage();
      $scope.addComment = MessageService.getAddComment();
      if (!$scope.addComment) {
          $scope.comment = "filler";
      }
      $scope.confirm = function () {          
          $rootScope.$broadcast(MessageService.getBroadCastMessage(), $scope.comment);
          $modalInstance.dismiss();
      }
      $scope.cancel = function () {
          $modalInstance.dismiss("dismiss confirm modal");
          MessageService.setAddComment(false);
      }
  });