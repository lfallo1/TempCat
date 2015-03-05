'use strict';

describe( 'Service: ReceiptService', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var ReceiptService;
    var $httpBackend;

    beforeEach( inject( function ( _ReceiptService_, _$httpBackend_ ) {
        ReceiptService = _ReceiptService_;
        $httpBackend = _$httpBackend_;

    } ) );

    afterEach( function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    it( 'should get the value of \'receipts\'.', function () {
        expect( ReceiptService.getReceipts() ).toBe( undefined );
    } );

    it( 'should set the value of \'receipts\'.', function () {
        var obj = 'thing';
        ReceiptService.setReceipts( obj );
        expect( ReceiptService.getReceipts() ).toBe( obj );
    } );

    it( 'should get the value of \'showAllReceipts\'.', function () {
        expect( ReceiptService.getShowAllReceipts() ).toBe( undefined );
    } );

    it( 'should set the value of \'showAllReceipts\'.', function () {
        var obj = 'thing';
        ReceiptService.setShowAllReceipts( obj );
        expect( ReceiptService.getShowAllReceipts() ).toBe( obj );
    } );

    it( 'should get the value of \'allReceipts\'.', function () {
        expect( ReceiptService.getAllReceipts() ).toBe( undefined );
    } );

    it( 'should set the value of \'allReceipts\'.', function () {
        var obj = 'thing';
        ReceiptService.setAllReceipts( obj );
        expect( ReceiptService.getAllReceipts() ).toBe( obj );
    } );

    it( 'should get the value of \'addReceipt\'.', function () {
        expect( ReceiptService.getAddReceipt() ).toBe( undefined );
    } );

    it( 'should set the value of \'addReceipt\'.', function () {
        var obj = 'thing';
        ReceiptService.setAddReceipt( obj );
        expect( ReceiptService.getAddReceipt() ).toBe( obj );
    } );


    //=====================================================================//
    //
    //  testing GET methods
    //
    //=====================================================================//

    // GET /api/Receipts
    it( 'should call the GET /api/Receipts endpoint. (success)', function () {
        var url = '/api/Receipts';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock receipts' );
        ReceiptService.getReceiptById().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock receipts' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/Receipts endpoint. (error)', function () {
        var url = '/api/Receipts';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        ReceiptService.getReceiptById().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    // GET /api/Receipt/GetReceiptsBySubmissionId
    it( 'should call the GET /api/Receipt/GetReceiptsBySubmissionId endpoint. (success)', function () {
        var url = '/api/Receipt/GetReceiptsBySubmissionId';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock receipts' );
        ReceiptService.GetReceiptsBySubmissionId().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock receipts' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/Receipt/GetReceiptsBySubmissionId endpoint. (error)', function () {
        var url = '/api/Receipt/GetReceiptsBySubmissionId';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        ReceiptService.GetReceiptsBySubmissionId().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    // GET /api/Receipt/GetReceiptsWithImageBySubmissionId
    it( 'should call the GET /api/Receipt/GetReceiptsWithImageBySubmissionId endpoint. (success)', function () {
        var url = '/api/Receipt/GetReceiptsWithImageBySubmissionId';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock receipts' );
        ReceiptService.GetReceiptsWithImageBySubmissionId().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock receipts' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/Receipt/GetReceiptsWithImageBySubmissionId endpoint. (error)', function () {
        var url = '/api/Receipt/GetReceiptsWithImageBySubmissionId';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        ReceiptService.GetReceiptsWithImageBySubmissionId().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    //=====================================================================//
    //
    //  testing POST methods
    //
    //=====================================================================//

    // POST /api/Receipts
    it( 'should call the POST /api/Receipts endpoint. (success)', function () {
        var url = '/api/Receipts';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'POST', url ).respond( 200, 'mock receipts' );
        ReceiptService.submitReceipt().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock receipts' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the POST /api/Receipts endpoint. (error)', function () {
        var url = '/api/Receipts';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'POST', url ).respond( 500, 'mock error message' );
        ReceiptService.submitReceipt().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    //=====================================================================//
    //
    //  testing DELETE methods
    //
    //=====================================================================//

    // DELETE /api/Receipts
    it( 'should call the DELETE /api/Receipts endpoint. (success)', function () {
        var url = '/api/Receipts';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'DELETE', url ).respond( 200, 'mock receipts' );
        ReceiptService.deleteReceipt().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock receipts' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the DELETE /api/Receipts endpoint. (error)', function () {
        var url = '/api/Receipts';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'DELETE', url ).respond( 500, 'mock error message' );
        ReceiptService.deleteReceipt().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

} );