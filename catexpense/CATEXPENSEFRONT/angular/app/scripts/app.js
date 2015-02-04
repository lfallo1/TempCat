'use strict';

/**
 * @ngdoc overview
 * @name expenseApp
 * @description
 * # expenseApp
 *
 * Main module of the application.
 */

//this module will store all of the services
angular.module( 'expenseApp.Services', [] );

//this module will store all of the controllers
//currently not used
//angular.module( 'expenseApp.Controllers', [] );

//this is the main module
angular
  .module( 'expenseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ui.bootstrap',
    'expenseApp.Services'
  ] )
  .config( function ( $routeProvider ) {
      $routeProvider
        .when( '/', {
            templateUrl: 'Views/HotTowel/views/home.html',
            controller: 'HomeController'
        } ).when( '/login', {
            title: 'Login',
            templateUrl: 'Views/HotTowel/views/login.html',
            controller: 'LoginController'
        } ).when( '/logout', {
            title: 'Logout',
            templateUrl: 'Views/HotTowel/views/login.html',
            controller: 'LogoutController'
        } ).when( '/navbar', {
            templateUrl: 'views/navbar.html',
            controller: 'NavController'
        } ).when( '/home', {
            title: 'Home',
            templateUrl: 'Views/HotTowel/views/home.html',
            controller: 'HomeController'
        } )
        .when( '/EmployeeTable', {
            templateUrl: 'Views/HotTowel/views/EmployeeTable.html',
            controller: 'EmployeeTableController'
        } )
        .when( '/ManagerTable', {
            templateUrl: 'Views/HotTowel/views/ManagerTable.html',
            controller: 'ManagerTableController'
        } )
        .when( '/submission', {
            title: 'Submission Page',
            templateUrl: 'Views/HotTowel/views/submissionPage.html',
            controller: 'SubmissionCtrl'
        } )
        .otherwise( {
            redirectTo: '/home'
        } );
  } )
    .run( function ( $rootScope, $location, Authentication, $route, Application, RouteFilter, SubmissionService ) {;
        $location.path( '/login' );
        if ( Authentication.getUser() !== null ) {
            Application.makeReady();
        }

        SubmissionService.isLoggedIn().then( function ( isLoggedIn ) {
            if ( !isLoggedIn.data.isLoggedIn ) {
                Authentication.logout();
                Application.logout();
                $location.path( '/login' );
                SubmissionService.userLogout();
            } else {
                Authentication.login( isLoggedIn.data );
                Application.makeReady();
                $rootScope.$broadcast( "refresh" );
                $location.path( '/home' );
            }
        } );

        $rootScope.$on( '$locationChangeStart', function ( scope, next, current ) {

            if ( $location.path() === '/login' ) {
                return;
            }
            // if application is not ready then check if user is logged in
            if ( !Application.isReady() ) {
                SubmissionService.isLoggedIn().then( function ( isLoggedIn ) {
                    // if the user is not logged in then destroy the front end and send the user to login page
                    if ( !isLoggedIn.data.isLoggedIn ) {
                        Authentication.logout();
                        Application.logout();
                        $location.path( '/login' );
                        SubmissionService.userLogout();
                    } else {
                        Authentication.login( isLoggedIn.data );
                        Application.makeReady();
                        $rootScope.$broadcast( "refresh" );
                    }
                } );
            }

            if ( $location.path() == '/login' || $location.path() == '/home' || $location.path() == '/logout' ) {
                Application.setSubmission( undefined );
            }
            RouteFilter.run( $location.path() );
        } )
        //set the title of the page
        $rootScope.$on( '$routeChangeSuccess', function ( event, current, previous ) {
            $rootScope.title = current.title;
        } );

    } );
