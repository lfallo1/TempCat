'use strict';

angular.module('expenseApp.Controllers')
    .controller('NavController', ["$scope", "$location", "$timeout", "Application", "$route", "$rootScope", "Authentication", "LoginService", "SubmissionService", "RepliconProjectService", function ($scope, $location, $timeout, Application, $route, $rootScope, Authentication, LoginService, SubmissionService, RepliconProjectService) {
        $scope.isLoggedIn = Authentication.exists();
        $scope.isAdmin = false;
        $scope.flag = false;
        $scope.spinner = "";
        $scope.$on("refresh", function () {
            $scope.isLoggedIn = true;
        });
        $scope.isActive = function (view) {
            return view === $location.path();
        };
        $scope.navToSubmissionPage = function () {
            Application.setSubmission(undefined);
            $route.reload();
            $location.path('/submission');
        }

        /**
        * end user's session and direct to login page
        */
        $scope.logout = function () {
            $scope.isLoggedIn = false;
            Authentication.logout();
            Application.logout();
            $location.path('/login');
            LoginService.userLogout();
        }

        /**
        * sync the projects in the replicon database with the project database
        */
        $scope.syncProjects = function () {
            $scope.flag = true;
            $scope.spinner = "spinner";
            RepliconProjectService.updateRepliconProjects().then(
             function (success) {
                 $scope.flag = false;
                 $scope.spinner = "";
                 $rootScope.$broadcast("syncComplete");
             },
             function (error) {
                 alert(error);
                 $scope.flag = false;
             });
        };

        /**
        * only show the admin tab if the logged in user in infact an admin
        */
        if (Authentication.getIsFinanceApprover() === 'true') {
            $scope.isAdmin = true;
        }
    }]);