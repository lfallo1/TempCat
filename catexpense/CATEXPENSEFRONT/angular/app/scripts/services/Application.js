'use strict';

angular.module('expenseApp.Services')
  .factory('Application', [function Application() {

      var ready = false, registeredListeners = [];
      var submission;
      var submissions;
      var status;
      var lineItemId;
      var origin;
      var comment;
      var pendingSubmissionsByManagerName;
      var PendingSubmissionsByFinanceApprover;
      var submissionIndex;
      var lineItemIndex;
      var repliconProjects;
      var commentIndex;
      var isNewComment;

      /**
      * execute all functions sin registeredListeners array
      */
      var callListeners = function () {
          for (var i = registeredListeners.length - 1; i >= 0; i--) {
              registeredListeners[i]();
          };
      }

      return {
          isReady: function () {
              return ready;
          },

          makeReady: function () {
              ready = true;

              callListeners();
          },

          logout: function () {
              ready = false;
              submission = undefined;
              submissions = undefined;
              status = undefined;
              lineItemId = undefined;
              origin = undefined;
              comment = undefined;
              pendingSubmissionsByManagerName = undefined;
              PendingSubmissionsByFinanceApprover = undefined;
              submissionIndex = undefined;
              lineItemIndex = undefined;
              repliconProjects = undefined;
          },

          /**
          * register a new listener
          */
          registerListener: function (callback) {
              if (ready) callback();
              else registeredListeners.push(callback);
          },

          /**
          * getters and setters
          */
          setSubmission: function (currentSubmission) {
              submission = currentSubmission;
          },

          getSubmission: function () {
              return submission;
          },

          setAllUserSubmissions: function (allUserSubmissions) {
              submissions = allUserSubmissions;
          },

          getAllUserSubmissions: function () {
              return submissions;
          },

          setSubmissionStatus: function (statusId) {
              status = statusId;
          },

          getSubmissionStatus: function () {
              return status;
          },

          setLineItemId: function (id) {
              lineItemId = id;
          },

          getLineItemId: function () {
              return lineItemId;
          },

          setOrigin: function (originString) {
              origin = originString;
          },

          getOrigin: function () {
              return origin;
          },

          setComment: function (commentResponse) {
              comment = commentResponse;
          },

          getComment: function () {
              return comment;
          },

          setCommentIndex: function (index) {
              commentIndex = index;
          },

          getCommentIndex: function () {
              return commentIndex;
          },

          getIsNewComment: function () {
              return isNewComment;
          },

          setIsNewComment: function (isResponse) {
              isNewComment = isResponse;
          },

          setPendingSubmissionsByManagerName: function (pendingSubmissions) {
              pendingSubmissionsByManagerName = pendingSubmissions;
          },

          getPendingSubmissionsByManagerName: function () {
              return pendingSubmissionsByManagerName;
          },

          setPendingSubmissionsByFinanceApprover: function (pendingSubmissions) {
              PendingSubmissionsByFinanceApprover = pendingSubmissions;
          },

          getPendingSubmissionsByFinanceApprover: function () {
              return PendingSubmissionsByFinanceApprover;
          },

          setSubmissionIndex: function (index) {
              submissionIndex = index;
          },

          getSubmissionIndex: function () {
              return submissionIndex;
          },

          setLineItemIndex: function (index) {
              lineItemIndex = index;
          },

          getLineItemIndex: function () {
              return lineItemIndex;
          },

          setRepliconProjects: function (projects) {
              repliconProjects = projects;
          },

          getRepliconProjects: function () {
              return repliconProjects;
          }
      }
  }]);
