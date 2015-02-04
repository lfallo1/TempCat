'use strict';

/**
 * This service will contain the functions needed to manipulate Date objects for the expenseApp.
 *
 * @ngdoc service
 * @name FormService
 * @description # Form Service 
 */
angular.module( 'expenseApp.Services' )
  .service( 'DateService', function DateService() {

      var self = this;

      /**
       * This function will take in a Date String and return a json consisting of the seven days of the week that the inputted date is a part of.
       * The week begins with sunday.
       *
       */
      self.getDaysOfThisWeekGivenDate = function ( currentdate ) {

          var sunday = new Date( currentdate );
          sunday.setDate(sunday.getDate() - sunday.getDay());

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

  } );