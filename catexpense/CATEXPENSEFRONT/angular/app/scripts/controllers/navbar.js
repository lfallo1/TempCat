'use strict';

angular.module( 'expenseApp.Controllers' )
    .controller(
    'NavController',
    [
        "$scope",
        "$location",
        "$timeout",
        "Cache",
        "$route",
        "$rootScope",
        "Authentication",
        "LoginService",
        "SubmissionService",
        "RepliconProjectService",
        function (
            $scope,
            $location,
            $timeout,
            Cache,
            $route,
            $rootScope,
            Authentication,
            LoginService,
            SubmissionService,
            RepliconProjectService
            ) {

            /****************************************************
            *
            * Private Variables
            *
            ***************************************************/

            /****************************************************
            *
            * Public Variables
            *
            ***************************************************/

            $scope.isLoggedIn = Authentication.exists();

            /**
             * Determines if the logged in user is an admin.
             */
            $scope.isAdmin = false;

            /**
             * Determines if the Sync Button is disabled
             * True -> disabled
             * False -> not disabled
             */
            $scope.disableSyncButton = false;

            /**
             * Stores the attribute string that will be referenced inside of the sync button. 
             */
            $scope.spinner = "";

            /****************************************************
            *
            * Private methods
            *
            ***************************************************/

            /****************************************************
            *
            * Public Methods
            *
            ***************************************************/

            $scope._onLoad = function () {

                /**
                 * only show the admin tab if the logged in user in infact an admin
                 */
                if ( Authentication.getIsFinanceApprover() === 'true' )
                {
                    $scope.isAdmin = true;
                }
            };

            $scope._onLoad();

            /**
             * Catches the broadcast request that sends the "refresh" string.
             */
            $scope.$on( "refresh", function () {
                $scope.isLoggedIn = true;
            } );

            /**
             * Sets the tab that matches the current view as active.
             * Currently the only tab is the 'Admin' tab
             */
            $scope.isActive = function ( view ) {
                return view === $location.path();
            };


            /**
            * end user's session and direct to login page
            */
            $scope.logout = function () {
                $scope.isLoggedIn = false;
                Authentication.logout();
                Cache.logout();
                $location.path( '/login' );
                LoginService.userLogout();
            };

            /**
            * sync the projects in the replicon database with the project database
            */
            $scope.syncProjects = function () {

                //disable the sync button
                $scope.disableSyncButton = true;

                //set the icon attribute to be a 'spinner'
                $scope.spinner = "spinner";

                //call replicon and update the Database
                RepliconProjectService.updateRepliconProjects().then(

                    //call to Replicon successful
                    function ( success ) {

                        //re-enable the sync button
                        $scope.disableSyncButton = false;

                        //set the icon to be 'nothing'
                        $scope.spinner = "";
                        $rootScope.$broadcast( "syncComplete" );
                    },
                    function ( error ) {
                        alert( error );

                        //re-enable the sync button
                        $scope.disableSyncButton = false;
                    } );
            };


        }
    ] );