'use strict';

angular.module('expenseApp')
    .directive('submissionPage', function () {
        return {
            restrict: 'E',
            templateUrl: 'Views/HotTowel/views/submissionPage.html',
            transclude: true,
            controller: 'SubmissionCtrl',
            controllerAs: 'submission'
        }
    });