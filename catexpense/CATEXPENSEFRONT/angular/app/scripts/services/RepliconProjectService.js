'use strict';

/**
 * @ngdoc service
 * @name RepliconProjectService
 * @description # RepliconProject Service 
 */
angular.module('expenseApp.Services')
  .service('RepliconProjectService', ["$http", function RepliconProjectService($http) {
      var self = this;

      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      self.getAllRepliconProjects = function (data) {
          return $http({
              method: 'GET',
              url: '/api/RepliconProject',
              params: data
          });
      };

      //=====================================================================//
      //
      //  list of POST methods
      //
      //=====================================================================//

      self.updateRepliconProjects = function () {
          return $http({
              method: 'POST',
              url: '/api/RepliconProject/UpdateRepliconProjectTable'
          });
      };

      //=====================================================================//
      //
      //  list of PUT methods
      //
      //=====================================================================//

      //=====================================================================//
      //
      //  list of DELETE methods
      //
      //=====================================================================//

  }]);