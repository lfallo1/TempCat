'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller('confirmModalController', function ($scope, $modalInstance, MessageService, $rootScope) {

      $scope.message = MessageService.getMessage();
      $scope.addComment = MessageService.getAddComment();

      /**
      * add comment filler upon page load if no comment is stored in MessageService 
      */
      if (!$scope.addComment) {
          $scope.comment = "filler";
      }

      /**
      * send broadcase message stored in MessageService to submissionTable.js
      */
      $scope.confirm = function () {          
          $rootScope.$broadcast(MessageService.getBroadCastMessage(), $scope.comment);
          $modalInstance.dismiss();
      }

      /**
      * cancel the most recent action and close modal
      */
      $scope.cancel = function () {
          $modalInstance.dismiss("dismiss confirm modal");
          MessageService.setAddComment(false);
      }
  });