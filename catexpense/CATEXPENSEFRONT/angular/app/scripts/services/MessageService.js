'use strict';

angular.module( 'expenseApp.Services' )
  .factory( 'MessageService', function MessageService() {

      var message = "";
      var broadCastMessage = "";
      var id = "";
      var index = 0;
      var addCommit = false;

      return {
          setMessage: function ( messageValue ) {
              message = messageValue;
          },

          getMessage: function () {
              return message;
          },

          setBroadCastMessage: function ( message ) {
              broadCastMessage = message;
          },

          getBroadCastMessage: function () {
              return broadCastMessage;
          },

          getId: function () {
              return id;
          },

          setId: function ( newId ) {
              id = newId;
          },

          setIndex: function ( newIndex ) {
              index = newIndex;
          },

          getIndex: function () {
              return index;
          },

          setAddComment: function ( result ) {
              addCommit = result;
          },

          getAddComment: function () {
              return addCommit;
          }
      }
  } );
