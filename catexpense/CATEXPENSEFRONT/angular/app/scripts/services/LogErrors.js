'use strict';

angular.module('expenseApp.Services')
    .service('LogError', function LogError($http) {
        var self = this;

        self.logError = function (data) {
            return $http({
                method: 'POST',
                url: '/api/Error',
                data: data
            });
        };
    });