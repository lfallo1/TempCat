'use strict';

angular.module('expenseApp.Services')
  .service('ExpenseCategory', ["$http", function RepliconProjectService($http) {

      var self = this;

      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      self.getAllExpenseCategories = function () {
          return $http({
              method: 'GET',
              url: '/api/ExpenseCategory/GetAllExpenseCategories'
          });
      };

  }]);