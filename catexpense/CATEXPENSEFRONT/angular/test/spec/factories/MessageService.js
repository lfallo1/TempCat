'use strict';

describe( 'Factory: MessageService', function () {

    beforeEach( module( 'expenseApp' ) );

    var MessageService;

    beforeEach( inject( function ( _MessageService_ ) {
        MessageService = _MessageService_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );