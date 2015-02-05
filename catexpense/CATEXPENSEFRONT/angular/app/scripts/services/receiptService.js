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

  } );
