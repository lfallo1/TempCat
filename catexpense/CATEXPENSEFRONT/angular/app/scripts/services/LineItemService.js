﻿'use strict';

/**
 * This service will primarily deal with any functions and ajax calls related to line items.
 * When creating or editing a line item, the data will be stored in this service and then later retrieved when necessary.
 *
 * @ngdoc service
 * @name LineItemService
 * @description # LineItem Service 
 */
angular.module( 'expenseApp.Services' )
  .service( 'LineItemService', function LineItemService( $http ) {

      //This will contain all of the methods in this service.
      var service = {};

      //used by modals to determine whether an expense line
      //is being edited and respond accordingly
      var underEdit = false;

      //This variable will store the necessary fields and values for a lineitem as required to pass into the database
      var lineItem = {
          LineItemId: '',
          SubmissionId: '',
          Billable: false,
          ExpenseCategoryId: 1,
          LineItemDate: '',
          LineItemDesc: '',
          LineItemAmount: 0,
          LineItemMetadata: 'Miles:0,Origin:,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false',
          ReceiptPresent: 0,
          StatusId: 1,
          ManagerApproverDate: null,
          FinanceApproverDate: null
      };

      //This variable will store data that is not needed to pass into the database but might be necessary to compute the necessary data
      var extraData = {
          expenseCategoryName: 'Mileage',
          endingWeek: '',
          origin: '',
          destination: '',
          miles: 0,
          days: {
              sunday: false,
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false
          },
          daysString: {
              sunday: '',
              monday: '',
              tuesday: '',
              wednesday: '',
              thursday: '',
              friday: '',
              saturday: ''
          }
      };


      //=====================================================================//
      //
      //  list of private methods
      //
      //=====================================================================//

      /**
       * This function creates and sets the LineItemMetadata.
       * This function should be called whenever a new value for miles, origin, destination, or days is set.
       * 
       * NOTE: this is a private method
       */
      function _GenerateMetaData() {
          var metadata = 'Miles:' + extraData.miles +
                        ',Origin:' + extraData.origin +
                        ',Destination:' + extraData.destination +
                        ',Sunday:' + extraData.days.sunday +
                        ',Monday:' + extraData.days.monday +
                        ',Tuesday:' + extraData.days.tuesday +
                        ',Wednesday:' + extraData.days.wednesday +
                        ',Thursday:' + extraData.days.thursday +
                        ',Friday:' + extraData.days.friday +
                        ',Saturday:' + extraData.days.saturday;

          lineItem.LineItemMetadata = metadata;

      };


      /**
       * This function will take in a Date String and return a json consisting of the seven days of the week that the inputted date is a part of.
       * The week begins with sunday.
       * This function should be called when an endingWeek is chosen.
       *
       * NOTE: this is a private method
       */
      function _GetDaysOfThisWeekGivenDate( thisdate ) {

          var sunday = new Date( thisdate );
          sunday.setDate( thisdate.getDate() - thisdate.getDay() );

          var monday = new Date( sunday );
          monday.setDate( sunday.getDate() + 1 );

          var tuesday = new Date( sunday );
          tuesday.setDate( sunday.getDate() + 2 );

          var wednesday = new Date( sunday );
          wednesday.setDate( sunday.getDate() + 3 );

          var thursday = new Date( sunday );
          thursday.setDate( sunday.getDate() + 4 );

          var friday = new Date( sunday );
          friday.setDate( sunday.getDate() + 5 );

          var saturday = new Date( sunday );
          saturday.setDate( sunday.getDate() + 6 );

          var datesOfWeek = {
              sunday: sunday,
              monday: monday,
              tuesday: tuesday,
              wednesday: wednesday,
              thursday: thursday,
              friday: friday,
              saturday: saturday
          };

          return datesOfWeek;
      };

      /**
       * This function will take in an expense category name and return its cooresponding expensecategory id.
       * This function should be called when setting the ExpenseCategoryId when only the name is known.
       *
       * NOTE: this is a private method
       */
      function _GetExpenseCategoryId( name ) {
          var id = 0;

          switch ( name ) {
              case 'Mileage':
                  id = 1;
                  break;
              case 'Per Diem':
                  id = 2;
                  break;
              case 'Transportation':
                  id = 3;
                  break;
              case 'Lodging':
                  id = 4;
                  break;
              case 'Parking':
                  id = 5;
                  break;
              case 'Entertainment':
                  id = 6;
                  break;
              case 'Meals':
                  id = 7;
                  break;
              case 'Airfare':
                  id = 8;
                  break;
              case 'Other':
                  id = 9;
                  break;
              default:
                  id = null;
          };

          return id;

      };

      /**
       * This function take the metadata from the lineItem and get the 'Miles' value from it and return it.
       *
       * NOTE: this is a private method
       */
      function _GetMilesFromMetaData() {
          var result = lineItem.LineItemMetadata.split( ',' );
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', etc...]
          */

          var nextResult = result[0].split( ':' );
          /*
           nextResult = ['Miles', '10'];
          */

          return nextResult[1];
      };

      /**
       * This function take the metadata from the lineItem and get the 'Origin' value from it and return it.
       *
       * NOTE: this is a private method
       */
      function _GetOriginFromMetaData() {
          var result = lineItem.LineItemMetadata.split( ',' );
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', etc...]
          */

          var nextResult = result[1].split( ':' );
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
      function _GetDestinationFromMetaData() {
          var result = lineItem.LineItemMetadata.split( ',' );
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', etc...]
          */

          var nextResult = result[2].split( ':' );
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
      function _GetDaysFromMetaData() {
          var result = lineItem.LineItemMetadata.split( ',' );
          /*
          result = [ 'Miles:10', 'Origin:A', 'Destination:B', 'Sunday:false', etc...]
          */

          var nextResult = result[3].split( ':' );
          /*
           nextResult = ['Sunday', 'false'];
          */
          extraData.days.sunday = 'true' === nextResult[1];
          nextResult = result[4].split( ':' );
          extraData.days.monday = 'true' === nextResult[1];
          nextResult = result[5].split( ':' );
          extraData.days.tuesday = 'true' === nextResult[1];
          nextResult = result[6].split( ':' );
          extraData.days.wednesday = 'true' === nextResult[1];
          nextResult = result[7].split( ':' );
          extraData.days.thursday = 'true' === nextResult[1];
          nextResult = result[8].split( ':' );
          extraData.days.friday = 'true' === nextResult[1];
          nextResult = result[9].split( ':' );
          extraData.days.saturday = 'true' === nextResult[1];

          return extraData.days;
      };

      function _setLineItemMetadata( value ) {
          lineItem.LineItemMetadata = value;
      };


      //=====================================================================//
      //
      //  list of getter and setter methods
      //
      //=====================================================================//

      service.getUnderEdit = function () {
          return underEdit;
      };

      service.setUnderEdit = function ( value ) {
          underEdit = !!value;
      };

      /**
       * Gets the lineItem's LineItemId
       */
      service.getLineItemId = function () {
          return lineItem.LineItemId;
      };

      service.setLineItemId = function ( id ) {
          if ( !isNaN( parseInt( id ) ) ) {
              lineItem.LineItemId = id;
          } else {
              lineItem.LineItemId = '';
          }
      };

      /**
       * Gets the lineItem's SubmissionId
       */
      service.getSubmissionId = function () {
          return lineItem.SubmissionId;
      };

      /**
       * Sets the lineItem's SubmissionId
       */
      service.setSubmissionId = function ( value ) {
          if ( !isNaN( parseInt( value ) ) ) {
              lineItem.SubmissionId = value;
          } else {
              lineItem.SubmissionId = '';
          }
      };

      /**
       * Gets the lineItem's Billable
       */
      service.getBillable = function () {
          return lineItem.Billable;
      };

      /**
       * Sets the lineItem's Billable
       */
      service.setBillable = function ( value ) {
          lineItem.Billable = !!value;
      };

      /**
       * Gets the lineItem's Expensecategory
       */
      service.getExpenseCategoryId = function () {
          return lineItem.ExpenseCategoryId;
      };

      /**
       * Sets the lineItem's ExpenseCategoryId
       */
      service.setExpenseCategoryId = function ( value ) {
          if ( !isNaN( parseInt( value ) ) && value >= 1 && value <= 9 ) {
              lineItem.ExpenseCategoryId = value;
          } else {
              lineItem.ExpenseCategoryId = 0;
          }
      };

      /**
       * Gets the lineItem's LineItemDate
       */
      service.getLineItemDate = function () {
          return lineItem.LineItemDate;
      };

      /**
       * Sets the lineItem's LineItemDate
       */
      service.setLineItemDate = function ( value ) {
          var date = new Date( value );
          if ( date instanceof Date && !isNaN( date.valueOf() ) ) {
              lineItem.LineItemDate = date;
          } else {
              lineItem.LineItemDate = '';
          };
      };

      /**
       * Gets the lineItem's LineItemDesc
       */
      service.getLineItemDesc = function () {
          return lineItem.LineItemDesc;
      };

      /**
       * Sets the lineItem's LineItemDesc
       */
      service.setLineItemDesc = function ( value ) {
          lineItem.LineItemDesc = value;
      };

      /**
       * Gets the lineItem's LineItemAmount
       */
      service.getLineItemAmount = function () {
          return lineItem.LineItemAmount;
      };

      /**
       * Sets the lineItem's LineItemAmount
       */
      service.setLineItemAmount = function ( value ) {
          if ( !isNaN( parseInt( value ) ) && value > 0 ) {
              lineItem.LineItemAmount = value;
          } else {
              lineItem.LineItemAmount = 0;
          }
      };

      /**
       * Gets the lineItem's LineItemMetadata
       */
      service.getLineItemMetadata = function () {
          return lineItem.LineItemMetadata;
      };

      /**
       * Gets the lineItem's ReceiptPresent
       */
      service.getReceiptPresent = function () {
          return lineItem.ReceiptPresent;
      };

      /**
       * Sets the lineItem's ReceiptPresent
       */
      service.setReceiptPresent = function ( value ) {
          lineItem.ReceiptPresent = !!value;
      };

      /**
       * Gets the lineItem's StatusId
       */
      service.getStatusId = function () {
          return lineItem.StatusId;
      };

      /**
       * Sets the lineItem's StatusId
       */
      service.setStatusId = function ( value ) {
          if ( !isNaN( parseInt( value ) ) && value >= 1 && value <= 6 && value % 1 === 0 ) {
              lineItem.StatusId = value;
          } else {
              lineItem.StatusId = 0;
          }
      };

      /**
       * Gets the lineItem's ManagerApproverDate
       */
      service.getManagerApproverDate = function () {
          return lineItem.ManagerApproverDate;
      };

      /**
       * Sets the lineItem's ManagerApproverDate
       */
      service.setManagerApproverDate = function ( value ) {
          var date = new Date( value );
          if ( date instanceof Date && !isNaN( date.valueOf() ) ) {
              lineItem.ManagerApproverDate = date;
          } else {
              lineItem.ManagerApproverDate = null;
          };
      };

      /**
       * Gets the lineItem's FinanceApproverDate
       */
      service.getFinanceApproverDate = function () {
          return lineItem.FinanceApproverDate;
      };

      /**
       * Sets the lineItem's FinanceApproverDate
       */
      service.setFinanceApproverDate = function ( value ) {
          var date = new Date( value );
          if ( date instanceof Date && !isNaN( date.valueOf() ) ) {
              lineItem.FinanceApproverDate = date;
          } else {
              lineItem.FinanceApproverDate = null;
          };
      };

      /**
       * Gets the lineItem's expense category name.
       * NOTE: this value is not part of the lineItem object
       */
      service.getExpenseCategoryName = function () {
          return extraData.expenseCategoryName;
      };

      /**
       * Sets the lineItem's expense category name.
       * NOTE: these values is not part of the lineItem object
       */
      service.setExpenseCategoryName = function ( value ) {
          switch ( value ) {
              case 'Mileage':
                  extraData.expenseCategoryName = 'Mileage';
                  lineItem.ExpenseCategoryId = 1;
                  break;
              case 'Per Diem':
                  extraData.expenseCategoryName = 'Per Diem';
                  lineItem.ExpenseCategoryId = 2;
                  break;
              case 'Transportation':
                  extraData.expenseCategoryName = 'Transportation';
                  lineItem.ExpenseCategoryId = 3;
                  break;
              case 'Lodging':
                  extraData.expenseCategoryName = 'Lodging';
                  lineItem.ExpenseCategoryId = 4;
                  break;
              case 'Parking':
                  extraData.expenseCategoryName = 'Parking';
                  lineItem.ExpenseCategoryId = 5;
                  break;
              case 'Entertainment':
                  extraData.expenseCategoryName = 'Entertainment';
                  lineItem.ExpenseCategoryId = 6;
                  break;
              case 'Meals':
                  extraData.expenseCategoryName = 'Meals';
                  lineItem.ExpenseCategoryId = 7;
                  break;
              case 'Airfare':
                  extraData.expenseCategoryName = 'Airfare';
                  lineItem.ExpenseCategoryId = 8;
                  break;
              case 'Other':
                  extraData.expenseCategoryName = 'Other';
                  lineItem.ExpenseCategoryId = 9;
                  break;
              default:
                  extraData.expenseCategoryName = '';
                  lineItem.ExpenseCategoryId = 0;
          };
      };

      /**
       * Gets the lineItem's week ending.
       * NOTE: this value is not part of the lineItem object
       */
      service.getEndingWeek = function () {
          return extraData.endingWeek;
      };

      /**
       * Sets the lineItem's week ending.
       * Also sets the object containing the days of the week as strings.
       * NOTE: these values is not part of the lineItem object
       */
      service.setEndingWeek = function ( value ) {
          var date = new Date( value );
          if ( date instanceof Date && !isNaN( date.valueOf() ) ) {
              extraData.endingWeek = date;
              extraData.daysString = _GetDaysOfThisWeekGivenDate( date );
              lineItem.LineItemDate = date;
          } else {
              extraData.endingWeek = '';
              extraData.daysString = {
                  sunday: '',
                  monday: '',
                  tuesday: '',
                  wednesday: '',
                  thursday: '',
                  friday: '',
                  saturday: ''
              };
              lineItem.LineItemDate = '';
          };
      };

      /**
       * Gets the lineItem's Origin.
       */
      service.getOrigin = function () {
          return _GetOriginFromMetaData();
      }

      /**
       * Sets the lineItem's Origin.
       */
      service.setOrigin = function ( value ) {
          extraData.origin = value;
          _GenerateMetaData();
      };

      /**
       * Gets the lineItem's Destination.
       */
      service.getDestination = function () {
          return _GetDestinationFromMetaData();
      };

      /**
       * Sets the lineItem's Destination.
       */
      service.setDestination = function ( value ) {
          extraData.destination = value;
          _GenerateMetaData();
      };

      /**
       * Gets the lineItem's Miles.
       */
      service.getMiles = function () {
          return parseFloat( _GetMilesFromMetaData() );
      };

      /**
       * Sets the current travel miles.
       */
      service.setMiles = function ( value ) {
          if ( !isNaN( parseInt( value ) ) && value >= 0 ) {
              extraData.miles = value;
          } else {
              extraData.miles = 0;
          }
          _GenerateMetaData();
      };

      /**
       * Gets the lineItem's Days that were checked for the per diem.
       */
      service.getDays = function () {
          return _GetDaysFromMetaData();
      };

      /**
       * Sets the lineItem's Days that were checked for the per diem.
       */
      service.setDays = function ( value ) {
          if ( typeof value !== 'undefined' && value !== null && value.hasOwnProperty( 'sunday' ) && value.hasOwnProperty( 'monday' ) && value.hasOwnProperty( 'tuesday' )
              && value.hasOwnProperty( 'wednesday' ) && value.hasOwnProperty( 'thursday' ) && value.hasOwnProperty( 'friday' )
              && value.hasOwnProperty( 'saturday' ) ) {

              extraData.days.sunday = !!value.sunday;
              extraData.days.monday = !!value.monday;
              extraData.days.tuesday = !!value.tuesday;
              extraData.days.wednesday = !!value.wednesday;
              extraData.days.thursday = !!value.thursday;
              extraData.days.friday = !!value.friday;
              extraData.days.saturday = !!value.saturday;
          } else {
              extraData.days = {
                  sunday: false,
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                  saturday: false
              };
          };
          _GenerateMetaData();
      };

      /**
       * Gets the current days of the week.
       */
      service.getDaysString = function () {
          return extraData.daysString;
      };

      /**
       * Gets all of the current lineItem information.
       */
      service.getLineItem = function () {
          return lineItem;
      };

      /**
       * Sets the current lineItem information.
       * TODO: needs to be better coded, needs to ensure the value being passed in is a vali
       */
      service.setLineItem = function ( value ) {
          if ( typeof value !== 'undefined' && value !== null ) {
              if ( value.hasOwnProperty( 'LineItemId' ) ) {
                  service.setLineItemId( value.LineItemId );
              };
              if ( value.hasOwnProperty( 'SubmissionId' ) ) {
                  service.setSubmissionId( value.LineItemId );
              };
              if ( value.hasOwnProperty( 'Billable' ) ) {
                  service.setBillable( value.Billable );
              };
              if ( value.hasOwnProperty( 'ExpenseCategoryId' ) ) {
                  service.setExpenseCategoryId( value.ExpenseCategoryId );
              };
              if ( value.hasOwnProperty( 'LineItemDate' ) ) {
                  service.setLineItemDate( value.LineItemDate );
              };
              if ( value.hasOwnProperty( 'LineItemDesc' ) ) {
                  service.setLineItemDesc( value.LineItemDesc );
              };
              if ( value.hasOwnProperty( 'LineItemAmount' ) ) {
                  service.setLineItemAmount( value.LineItemAmount );
              };
              if ( value.hasOwnProperty( 'LineItemMetadata' ) ) {
                  _setLineItemMetadata( value.LineItemMetadata );
              };
              if ( value.hasOwnProperty( 'ReceiptPresent' ) ) {
                  service.setReceiptPresent( value.ReceiptPresent );
              };
              if ( value.hasOwnProperty( 'StatusId' ) ) {
                  service.setStatusId( value.StatusId );
              };
              if ( value.hasOwnProperty( 'ManagerApproverDate' ) ) {
                  service.setManagerApproverDate( value.ManagerApproverDate );
              };
              if ( value.hasOwnProperty( 'FinanceApproverDate' ) ) {
                  service.setFinanceApproverDate( value.FinanceApproverDate );
              };
          };
      }

      /**
       * Gets all of the current extra data.
       */
      service.getExtraData = function () {
          return extraData;
      };

      //=====================================================================//
      //
      //  list of specialized methods
      //
      //=====================================================================//

      /**
       * Resets the lineItem values to their defaults.
       */
      service.resetLineItem = function () {
          service.setLineItemDate( '' );
          service.setOrigin( '' );
          service.setDestination( '' );
          service.setMiles( 0 );
          service.setLineItemDesc( '' );
          service.setDays(
              {
                  sunday: false,
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                  saturday: false
              }
          );
          service.setLineItemAmount( 0 );
          service.setBillable( false );
      };

      /**
       * This function will take in an expense category id and return its cooresponding expensecategory name.
       *
       */
      service.getExpenseCategoryNameById = function ( id ) {
          var name = '';

          switch ( id ) {
              case 1:
                  name = 'Mileage';
                  break;
              case 2:
                  name = 'Per Diem';
                  break;
              case 3:
                  name = 'Transportation';
                  break;
              case 4:
                  name = 'Lodging';
                  break;
              case 5:
                  name = 'Parking';
                  break;
              case 6:
                  name = 'Entertainment';
                  break;
              case 7:
                  name = 'Meals';
                  break;
              case 8:
                  name = 'Airfare';
                  break;
              case 9:
                  name = 'Other';
                  break;
              default:
                  name = '';
          };

          return name;

      };



      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      /**
       * GETS all line items
       */
      service.getLineItems = function () {
          return $http( {
              url: '/api/LineItem',
              method: 'GET'
          } );
      };

      /**
       * GETS a line item by id
       */
      service.getLineItemById = function ( id ) {
          return $http( {
              url: '/api/LineItem/' + id,
              method: 'GET'
          } );
      };

      /**
       * GETS all line items by submission ID
       */
      service.getLineItemsBySubmissionId = function ( id ) {
          return $http( {
              url: '/api/LineItem/GetLineItemsBySubmissionId/' + id,
              method: 'GET'
          } );
      };


      //=====================================================================//
      //
      //  list of POST methods
      //
      //=====================================================================//


      /**
       * POSTS a new line item
       */
      service.submitLineItem = function ( data ) {
          return $http( {
              url: '/api/LineItem',
              method: 'POST',
              data: data
          } );
      };

      //=====================================================================//
      //
      //  list of PUT methods
      //
      //=====================================================================//

      /**
       * PUTS an existing line item
       */
      service.updateLineItem = function ( id, data ) {
          return $http( {
              url: '/api/LineItem/' + id,
              method: 'PUT',
              data: data
          } );
      };

      //=====================================================================//
      //
      //  list of DELETE methods
      //
      //=====================================================================//

      /**
       * DELETES an existing line item
       */
      service.deleteLineItem = function ( id ) {
          return $http( {
              url: '/api/LineItem/' + id,
              method: 'DELETE'
          } );
      };

      //=====================================================================//
      //
      //  Return a json consisting of all the methods contained within this service.
      //
      //=====================================================================//
      return service;
  } );