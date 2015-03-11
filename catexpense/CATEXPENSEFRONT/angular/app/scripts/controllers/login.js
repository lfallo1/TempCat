'use strict';

angular.module( 'expenseApp.Controllers' )
  .controller( 'LoginController',
  [
      "$scope",
      "$location",
      "$rootScope",
      "Authentication",
      "LoginService",
      function (
          $scope,
          $location,
          $rootScope,
          Authentication,
          LoginService
          ) {

          $scope.ErrorMessage = "";

          /**
          * log user in with username and password
          */
          $scope.doLogin = function ( user ) {
              LoginService.userlogin( user.username, user.password ).then( function ( results ) {
                  $scope.ErrorMessage = "";
                  Authentication.login( results.data );
                  $location.path( '/home' );
                  $rootScope.$broadcast( "refresh" );
                  $rootScope.$broadcast( "refreshHome" );

              }, function ( error ) {
                  $scope.ErrorMessage = "The user name and password do not match any records we have.\nPlease try agian, be carefull, too many failed attemps could result in your account being locked.";

              } );
          };
      }
  ] );