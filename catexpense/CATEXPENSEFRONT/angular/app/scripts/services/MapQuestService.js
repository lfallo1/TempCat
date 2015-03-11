'use strict';

/**
 * @ngdoc service
 * @name MapQuestService
 * @description # MapQuest Service 
 */
angular.module( 'expenseApp.Services' )
  .service(
  'MapQuestService',
  [
      "$http",
      function MapQuestService(
          $http
          ) {

          var self = this;

          /**
           * NOTE: The mapquest 'key' contains non-alphanumeric characters and thus the http call will not work
           * when the 'key' is included as part of the 'params' object.
           * A workaround is to construct the url before making the call, thus removing the need for a 'params' object.
           */

          /**
           * Call to the MapQuest api to get the distance between two locations given as parameters
           * data passed in must be ~ { from : locationA, to: locationB }
           *
           */
          self.getDistance = function ( data ) {
              var myKey = "Fmjtd%7Cluurnu6tn1%2Ca2%3Do5-9wbw0y";
              var url = "https://open.mapquestapi.com/directions/v2/route?key="
              var submissionApi = url + myKey + "&from=" + data.from
                  + "&to=" + data.to;

              return $http( {
                  url: submissionApi,
                  method: 'GET'
              } );
          };

          /**
           * Call to the Mapquest api to get a list of results matching the location given as a parameter by the user.
           * data pass in must be ~ { location : locationA }
           */
          self.getLocation = function ( data ) {
              var myKey = "Fmjtd%7Cluurnu6tn1%2Ca2%3Do5-9wbw0y";
              var url = "https://open.mapquestapi.com/geocoding/v1/address?key="
              var submissionApi = url + myKey + "&location=" + data.location;

              return $http( {
                  url: submissionApi,
                  method: 'GET'
              } );
          };
      }
  ] );