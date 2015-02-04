'use strict';

/**
 * @ngdoc service
 * @name RepliconProjectService
 * @description # RepliconProject Service 
 */
angular.module('expenseApp.Services')
  .service('RepliconProjectService', function RepliconProjectService($http) {
      var service = {};

      service.getAllRepliconProjects = function (data) {
          return $http({
              method: 'GET',
              url: '/api/RepliconProject',
              params: data
          });
      };

      service.updateRepliconProjects = function () {
          return $http({
              method: 'POST',
              url: '/api/RepliconProject/UpdateRepliconProjectTable'
          });
      };

      return service;
  });