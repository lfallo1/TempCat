﻿angular.module('expenseApp')
    .directive('submissionTable', function () {
        return {
            restrict: 'E',
            templateUrl: 'Views/HotTowel/views/submissionTable.html',
            controller: 'submissionTableCtrl',
            controllerAs: 'table'
        }
    });