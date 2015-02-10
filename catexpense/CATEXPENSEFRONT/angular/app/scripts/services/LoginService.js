'use strict';

angular.module('expenseApp.Services')
  .service('LoginService', ["$http", function LoginService($http) {
      var self = this;

      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      /**
      * This will check to see if the user is logged in.
      */
      self.isLoggedIn = function () {
          return $http({
              url: '/api/login/isLoggedIn',
              method: 'GET'
          });
      };

      //=====================================================================//
      //
      //  list of POST methods
      //
      //=====================================================================//

      /**
       * This will attempt to log the user in with the given user name and password
       */
      self.userlogin = function (username, password) {
          return $http({
              method: "POST",
              url: "/api/login/userlogin",
              data: {
                  Username: username,
                  Password: password
              }
          });
      };

      /**
       * This will log the user out and destroy the session
       */
      self.userLogout = function () {
          return $http({
              method: "POST",
              url: "/api/login/userLogout"
          });
      };

      //=====================================================================//
      //
      //  list of PUT methods
      //
      //=====================================================================//

      //=====================================================================//
      //
      //  list of DELETE methods
      //
      //=====================================================================//

  }]);
