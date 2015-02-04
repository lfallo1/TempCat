'use strict';

describe( 'Service: DateService', function () {

    beforeEach( module( 'expenseApp' ) );

    var DateService;

    beforeEach( inject( function ( _DateService_ ) {
        DateService = _DateService_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );