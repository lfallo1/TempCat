'use strict';

angular.module('expenseApp')
    .controller('NavController', function ($scope, $location, Application, $route, $rootScope, Authentication, SubmissionService) {
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
            SubmissionService.userLogout();
        }
    });