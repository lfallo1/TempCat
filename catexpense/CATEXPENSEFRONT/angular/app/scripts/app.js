'use strict';

/**
 * @ngdoc overview
 * @name expenseApp
 * @description
 * # expenseApp
 *
 * Main module of the Application.
 */

/**
* this module will store all of the services
*/
angular.module( 'expenseApp.Services', [] );

/**
* this module will store all of the controllers
*/
angular.module( 'expenseApp.Controllers', [] );

/**
* this module will store all of the constants
*/
angular.module( 'expenseApp.Constants', [] );

/**
* this is the main module
*/
angular
  .module( 'expenseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ui.bootstrap',
    'expenseApp.Services',
    'expenseApp.Controllers',
    'expenseApp.Constants'
  ] )
  .config( ["$routeProvider", function ( $routeProvider ) {
      $routeProvider
        .when( '/', {
            templateUrl: 'Views/Home/views/home.html',
            controller: 'HomeController'
        } ).when( '/login', {
            title: 'Login',
            templateUrl: 'Views/Home/views/login.html',
            controller: 'LoginController'
        } ).when( '/logout', {
            title: 'Logout',
            templateUrl: 'Views/Home/views/login.html',
            controller: 'LogoutController'
        } ).when( '/navbar', {
            templateUrl: 'views/navbar.html',
            controller: 'NavController'
        } ).when( '/home', {
            title: 'Home',
            templateUrl: 'Views/Home/views/home.html',
            controller: 'HomeController'
        } )
        .when( '/EmployeeTable', {
            templateUrl: 'Views/Home/views/EmployeeTable.html',
            controller: 'EmployeeTableController'
        } )
        .when( '/ManagerTable', {
            templateUrl: 'Views/Home/views/ManagerTable.html',
            controller: 'ManagerTableController'
        } )
        .when( '/submission', {
            title: 'Submission Page',
            templateUrl: 'Views/Home/views/submissionPage.html',
            controller: 'SubmissionCtrl'
        } )
        .when( '/admin', {
            title: 'Submission Page',
            templateUrl: 'Views/Home/views/admin.html',
            controller: 'AdminCtrl'
        } )
        .otherwise( {
            redirectTo: '/home'
        } );
  }] )
    .run( ["$rootScope", "$location", "Authentication", "$route", "Cache", "RouteFilter", "LoginService", "SubmissionService", function ( $rootScope, $location, Authentication, $route, Cache, RouteFilter, LoginService, SubmissionService ) {;
        $location.path( '/login' );
        if ( Authentication.getUser() !== null )
        {
            Cache.makeReady();
        }

        LoginService.isLoggedIn().then( function ( isLoggedIn ) {

            Authentication.login( isLoggedIn.data );
            Cache.makeReady();
            $rootScope.$broadcast( "refresh" );
            $location.path( '/home' );

        }, function ( error ) {

            Authentication.logout();
            Cache.logout();
            $location.path( '/login' );
            LoginService.userLogout();
        } );



        $rootScope.$on( '$locationChangeStart', function ( scope, next, current ) {

            if ( $location.path() === '/login' )
            {
                return;
            }
            // if Cache is not ready then check if user is logged in
            if ( !Cache.isReady() )
            {
                LoginService.isLoggedIn().then( function ( isLoggedIn ) {
                    // if the user is not logged in then destroy the front end and send the user to login page
                    if ( !isLoggedIn.data.isLoggedIn )
                    {
                        Authentication.logout();
                        Cache.logout();
                        $location.path( '/login' );
                        LoginService.userLogout();
                    } else
                    {
                        Authentication.login( isLoggedIn.data );
                        Cache.makeReady();
                        $rootScope.$broadcast( "refresh" );
                    }
                } );
            }

            if ( $location.path() == '/login' || $location.path() == '/home' || $location.path() == '/logout' )
            {
                Cache.setSubmission( undefined );
            }
            RouteFilter.run( $location.path() );
        } )
        //set the title of the page
        $rootScope.$on( '$routeChangeSuccess', function ( event, current, previous ) {
            $rootScope.title = current.title;
        } );

    }] );
