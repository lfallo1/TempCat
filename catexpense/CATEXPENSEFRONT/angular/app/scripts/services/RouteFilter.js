﻿'use strict';

angular.module( 'expenseApp.Services' )
  .factory(
  'RouteFilter',
  [
      "$location",
      function Routefilter(
          $location
          ) {

          var filters = [];

          /**
          * match passed in route with those stored in filters array
          */
          var getFilter = function ( route ) {
              for ( var i = filters.length - 1; i >= 0; i-- )
              {
                  for ( var j = filters[i].routes.length - 1; j >= 0; j-- )
                  {

                      if ( matchRoute( filters[i].routes[j], route ) )
                      {
                          return filters[i];
                      }
                  };
              };
          }

          /**
          * variable used by getFilter function above
          */
          var matchRoute = function ( filterRoute, route ) {
              if ( route instanceof RegExp )
              {
                  return route.test( filterRoute );
              }

              else
              {
                  return route === filterRoute;
              }
          }

          /**
          * methods made accessable outside of factory
          */
          return {
              canAccess: function ( route ) {
                  var filter = getFilter( route );

                  return filter.callback();
              },

              register: function ( name, routes, callback, redirectUrl ) {
                  redirectUrl = typeof redirectUrl !== "undefined" ? redirectUrl : null;

                  filters.push( {
                      name: name,
                      routes: routes,
                      callback: callback,
                      redirectUrl: redirectUrl
                  } );
              },

              run: function ( route ) {
                  var filter = getFilter( route );

                  if ( filter != null && filter.redirectUrl != null )
                  {
                      // User can access this page
                      if ( !filter.callback() )
                      {
                          $location.path( filter.redirectUrl );
                      }
                  }
              }
          }
      }
  ] );
