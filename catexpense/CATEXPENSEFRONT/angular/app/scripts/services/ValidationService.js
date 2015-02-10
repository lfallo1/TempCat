'use strict';

/**
 * This service will contain the functions that will validate the submission information that the user wishes to submit from the submission modal.
 *
 * @ngdoc service
 * @name FormService
 * @description # Validation Service 
 */
angular.module('expenseApp.Services')
  .service('ValidationService', [function ValidationService() {

      var self = this;
      var invalidObj = {};

      /**
       * This function take the metadata from the lineItem and get the 'Miles' value from it and return it.
       *
       * NOTE: this is a private method
       */
      function _GetMilesFromMetaData(lineItem) {
          var result = lineItem.LineItemMetadata.split(',');
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', etc...]
          */

          var nextResult = result[0].split(':');
          /*
           nextResult = ['Miles', '10'];
          */

          return parseInt(nextResult[1]);
      };

      /**
       * This function take the metadata from the lineItem and get the 'Origin' value from it and return it.
       *
       * NOTE: this is a private method
       */
      function _GetOriginFromMetaData(lineItem) {
          var result = lineItem.LineItemMetadata.split(',');
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', etc...]
          */

          var nextResult = result[1].split(':');
          /*
           nextResult = ['Origin', 'A'];
          */

          return nextResult[1];
      };

      /**
       * This function take the metadata from the lineItem and get the 'Destination' value from it and return it.
       *
       * NOTE: this is a private method
       */
      function _GetDestinationFromMetaData(lineItem) {
          var result = lineItem.LineItemMetadata.split(',');
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', etc...]
          */

          var nextResult = result[2].split(':');
          /*
           nextResult = ['Destination', 'B'];
          */

          return nextResult[1];
      };

      /**
       * This function take the metadata from the lineItem and get the 'sunday, monday, tuesday, etc' values from it and return them.
       *
       * NOTE: this is a private method
       */
      function _GetDaysFromMetaData(lineItem) {
          var result = lineItem.LineItemMetadata.split(',');
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', 'Sunday:false', etc...]
          */

          var nextResult = result[3].split(':');
          /*
           nextResult = ['Sunday', 'false'];
          */

          var days = {};
          days.sunday = 'true' === nextResult[1];
          nextResult = result[4].split(':');
          days.monday = 'true' === nextResult[1];
          nextResult = result[5].split(':');
          days.tuesday = 'true' === nextResult[1];
          nextResult = result[6].split(':');
          days.wednesday = 'true' === nextResult[1];
          nextResult = result[7].split(':');
          days.thursday = 'true' === nextResult[1];
          nextResult = result[8].split(':');
          days.friday = 'true' === nextResult[1];
          nextResult = result[9].split(':');
          days.saturday = 'true' === nextResult[1];

          return days;
      };

      /**
       * This function takes in the data contained within Formservice and validates it if the user chose the per diem form.
       * TODO: complete this after validation for 'per diem' and 'other' works
       * Currently, sets the validity as false as default.
       */
      self.validateMileage = function (lineitem) {

          var extra = {
              origin: _GetOriginFromMetaData(lineitem),
              destination: _GetDestinationFromMetaData(lineitem),
              miles: _GetMilesFromMetaData(lineitem)
          };

          invalidObj = {
              validInput: false,
              date: {
                  valid: true,
                  message: 'default message'
              },
              origin: {
                  valid: true,
                  message: 'default message'
              },
              destination: {
                  valid: true,
                  message: 'default message'
              },
              miles: {
                  valid: true,
                  message: 'default message'
              },
              description: {
                  valid: true,
                  message: 'default message'
              },
              amount: {
                  valid: true,
                  message: 'default message'
              }
          };

          invalidObj.date.valid = lineitem.LineItemDate instanceof Date && !isNaN(lineitem.LineItemDate.valueOf());

          //provides a validation message if the field was invalid
          if (!invalidObj.date.valid) {
              if (lineitem.LineItemDate === '') {
                  invalidObj.date.message = 'Please provide a date.';
              } else {
                  invalidObj.date.message = 'Invalid date.';
              }
          };

          invalidObj.origin.valid = extra.origin.length > 0;
          if (!invalidObj.origin.valid) {
              invalidObj.origin.message = 'Please input an origin.';
          };

          invalidObj.destination.valid = extra.destination.length > 0;
          if (!invalidObj.destination.valid) {
              invalidObj.destination.message = 'Please input a destination.';
          };

          var regExp = /^(\d*.?\d+)$/;
          invalidObj.miles.valid = regExp.test(extra.miles) && extra.miles > 0;
          if (!invalidObj.miles.valid) {
              invalidObj.miles.message = 'Please input a valid distance.';
          };

          invalidObj.description.valid = lineitem.LineItemDesc.length > 0;
          if (!invalidObj.description.valid) {
              invalidObj.description.message = 'Please input a description.';
          };

          invalidObj.amount.valid = regExp.test(lineitem.LineItemAmount) && lineitem.LineItemAmount >= 0;
          if (!invalidObj.amount.valid) {
              invalidObj.amount.message = 'Please input a valid amount.';
          };


          invalidObj.validInput = invalidObj.date.valid && invalidObj.origin.valid && invalidObj.destination.valid &&
              invalidObj.miles.valid && invalidObj.description.valid && invalidObj.amount.valid;
          return invalidObj;

      };

      /**
       * This function takes in the data contained within FormService and validates it if the user chose the per diem form.
       *
       */
      self.validatePerDiem = function (lineitem) {

          var extra = {
              days: _GetDaysFromMetaData(lineitem)
          };

          invalidObj = {
              validInput: true,
              days: {
                  valid: true,
                  message: 'default message'
              }
          };

          invalidObj.days.valid = extra.days.sunday || extra.days.monday || extra.days.tuesday
          || extra.days.wednesday || extra.days.thursday || extra.days.friday || extra.days.saturday;
          if (!invalidObj.days.valid) {
              invalidObj.days.message = 'Please select at least one day.';
          };

          invalidObj.validInput = invalidObj.days.valid;
          return invalidObj;

      };

      /**
       * This function takes in the data contained within Formservice and validates it 
       * if the user chose another form besides the mileage form and the per diem form..
       *
       */
      self.validateOther = function (lineitem) {

          invalidObj = {
              validInput: true,
              date: {
                  valid: true,
                  message: 'default message'
              },
              description: {
                  valid: true,
                  message: 'default message'
              },
              amount: {
                  valid: true,
                  message: 'default message'
              }
          };

          invalidObj.date.valid = lineitem.LineItemDate instanceof Date && !isNaN(lineitem.LineItemDate.valueOf());
          if (!invalidObj.date.valid) {
              if (lineitem.LineItemDate === '') {
                  invalidObj.date.message = 'Please provide a date.';
              } else {
                  invalidObj.date.message = 'Invalid date.';
              }
          };
          invalidObj.description.valid = lineitem.LineItemDesc.length > 0;

          if (!invalidObj.description.valid) {
              invalidObj.description.message = 'Please input a description.';
          };

          var regExp = /^(\d*.?\d+)$/;
          invalidObj.amount.valid = regExp.test(lineitem.LineItemAmount) && lineitem.LineItemAmount >= 0;
          if (!invalidObj.amount.valid) {
              invalidObj.amount.message = 'Please input a valid amount.';
          };

          invalidObj.validInput = invalidObj.date.valid && invalidObj.description.valid && invalidObj.amount.valid;
          return invalidObj;

      };

  }]);