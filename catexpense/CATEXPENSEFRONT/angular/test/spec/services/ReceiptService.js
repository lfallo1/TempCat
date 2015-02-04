'use strict';

describe( 'Service: receiptService', function () {

    beforeEach( module( 'expenseApp' ) );

    var receiptService;

    beforeEach( inject( function ( _receiptService_ ) {
        receiptService = _receiptService_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );