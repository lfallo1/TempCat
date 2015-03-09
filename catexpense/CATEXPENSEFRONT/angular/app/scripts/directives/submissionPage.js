'use strict';

angular.module('expenseApp')
    .directive('submissionPage', [function () {
        return {
            restrict: 'E',
            templateUrl: 'Views/Home/views/submissionPage.html',
            transclude: true,
            controller: 'SubmissionCtrl',
            controllerAs: 'submission'
        }
    }]);