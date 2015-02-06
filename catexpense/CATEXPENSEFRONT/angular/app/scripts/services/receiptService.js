'use strict';

angular.module( 'expenseApp.Services' )
  .service( 'ReceiptService', function ReceiptService( $http ) {
      var self = this;

      var receipts;
      var addReceipt;
      var allReceipts;
      var showAllReceipts;

      self.getReceipts = function () {
          return receipts;
      };

      self.setReceipts = function ( data ) {
          receipts = data;
      };

      self.getShowAllReceipts = function () {
          return showAllReceipts;
      };

      self.setShowAllReceipts = function ( data ) {
          showAllReceipts = data;
      };

      self.getAllReceipts = function () {
          return allReceipts;
      };

      self.setAllReceipts = function ( data ) {
          allReceipts = data;
      };

      self.getAddReceipt = function () {
          return addReceipt;
      };

      self.setAddReceipt = function ( data ) {
          addReceipt = data;
      };


      //=====================================================================//
      //
      //  list of GET methods
      //
      //=====================================================================//

      self.getReceiptById = function ( id ) {
          return $http( {
              method: "GET",
              url: '/api/Receipts',
              params: { id: id }
          } )
      };

      /**
      * Gets receipt of the submission that the submission id belongs to
      */
      self.GetReceiptsBySubmissionId = function ( SubmissionId ) {
          return $http( {
              method: "GET",
              url: '/api/Receipt/GetReceiptsBySubmissionId',
              params: { id: SubmissionId }
          } )
      };

      /**
      * Gets receipt of the submission that the submission id belongs to with the image
      */
      self.GetReceiptsWithImageBySubmissionId = function ( SubmissionId ) {
          return $http( {
              method: "GET",
              url: '/api/Receipt/GetReceiptsWithImageBySubmissionId',
              params: { id: SubmissionId }
          } )
      };


      //=====================================================================//
      //
      //  list of POST methods
      //
      //=====================================================================//

      self.submitReceipt = function ( data ) {
          return $http( {
              method: "POST",
              url: '/api/Receipts',
              data: data
          } )
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

      self.deleteReceipt = function ( receiptID, lineitemID ) {
          return $http( {
              method: "DELETE",
              url: "/api/Receipts",
              params: { id: receiptID, lineItemId: lineitemID }
          } )
      };

  } );
