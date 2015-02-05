'use strict';

angular.module( 'expenseApp.Services' )
  .service( 'ReceiptService', function ReceiptService( $http ) {
      var self = this;

      var receipts;
      var addReceipt;
      var allReceipts;
      var showAllReceipts;

      return {
          getReceipts: function () {
              return receipts;
          },

          setReceipts: function ( data ) {
              receipts = data;
          },

          getShowAllReceipts: function () {
              return showAllReceipts;
          },

          setShowAllReceipts: function ( data ) {
              showAllReceipts = data;
          },

          getAllReceipts: function () {
              return allReceipts;
          },

          setAllReceipts: function ( data ) {
              allReceipts = data;
          },

          getAddReceipt: function () {
              return addReceipt;
          },

          setAddReceipt: function ( data ) {
              addReceipt = data;
          }
      }
  } );
