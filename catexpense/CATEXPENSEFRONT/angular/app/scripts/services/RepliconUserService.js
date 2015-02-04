'use strict';

/**
 * @ngdoc service
 * @name RepliconUserService
 * @description # RepliconUser Service 
 */
angular.module('expenseApp.Services')
  .service('RepliconUserService', function RepliconUserService($http) {
      var service = {};

      service.isFinanceApprover = function (data) {
          return $http({
              url: '/api/RepliconUser/IsFinanceApprover',
              method: 'GET'
          });
      };

      return service;
  });