'use strict';

angular.module('expenseApp')
    .directive('datepickerIcon', function () {
        return {
            restrict: 'E',
            templateUrl: 'Views/HotTowel/views/datepicker.html',
            transclude: true,
            controller: 'DatepickerCtrl',
            controllerAs: 'picker'
        }
    });