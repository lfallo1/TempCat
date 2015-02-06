'use strict';

angular.module('expenseApp')
    .controller('NavController', function ($scope, $location, $timeout, Application, $route, $rootScope, Authentication, LoginService, SubmissionService, RepliconProjectService) {
        $scope.isLoggedIn = Authentication.exists();
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
        $scope.logout = function () {
            $scope.isLoggedIn = false;
            Authentication.logout();
            Application.logout();
            $location.path('/login');
            LoginService.userLogout();
        }

        // sync the projects in the replicon database with the project database
        $scope.syncProjects = function () {
            $scope.flag = true;
            $scope.countFrom = 0;
            $scope.progressValue = 0;

            RepliconProjectService.updateRepliconProjects().then(
             function (success) {
                 $scope.progressValue = 98;
                 $scope.flag = false;
                 $rootScope.$broadcast("syncComplete");
             },
             function (error) {
                 alert(error);
                 $scope.flag = false;
             });

            $scope.onTimeout = function () {
                $scope.progressValue += .325;
                mytimeout = $timeout($scope.onTimeout, 100);
            }
            var mytimeout = $timeout($scope.onTimeout, 100);
            $timeout(function () {
                $timeout.cancel(mytimeout);
            }, 28000);

        };
    });