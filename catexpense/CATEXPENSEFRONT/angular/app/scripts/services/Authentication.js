'use strict';

angular.module('expenseApp.Services')
  .factory('Authentication', ["$q", "$http", "$timeout", "Application", function Authentication($q, $http, $timeout, Application) {

      var authenticatedUser = null;
      var Username;
      var isManager;
      var isFinanceApprover;

      /**
      * methods made accessable outside the Authentication service
      */
      return {
          requestUser: function () {
              var deferred = $q.defer();

              $http.get('/api/user.json').success(function (user) {
                  $timeout(function () {
                      // Check if user is defined first
                      if (user) {
                          authenticatedUser = user;
                      }

                      deferred.resolve(authenticatedUser);
                  }, 1000);

              }).error(function (error) {
                  deferred.reject(error);
              });

              return deferred.promise;
          },

          getUser: function () {
              return authenticatedUser;
          },

          exists: function () {
              return authenticatedUser != null;
          },

          login: function (userLoginSuccess) {
              if (userLoginSuccess) {
                  authenticatedUser = userLoginSuccess.Username;
                  Username = userLoginSuccess.Username;
                  isManager = userLoginSuccess.isManager;
                  isFinanceApprover = userLoginSuccess.isFinanceApprover;
                  Application.makeReady();
              }
          },

          logout: function () {
              authenticatedUser = undefined;
              Username = undefined;
              isManager = undefined;
              isFinanceApprover = undefined;
          },

          isDeveloper: function () {
              return this.exists() && authenticatedUser.type == 'developer';
          },

          setUserName: function (name) {
              Username = name;
              authenticatedUser = name;
          },

          getUserName: function () {
              return Username;
          },

          getIsManager: function () {
              return isManager;
          },

          getIsFinanceApprover: function () {
              return isFinanceApprover;
          },
      }
  }]);
