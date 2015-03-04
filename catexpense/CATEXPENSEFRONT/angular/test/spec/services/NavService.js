'use strict';

describe( 'Service: NavService', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var NavService;

    beforeEach( inject( function ( _NavService_ ) {
        NavService = _NavService_;

    } ) );

    it( 'should get the value of \'title\'.', function () {
        expect( NavService.getTitle() ).toBe( undefined );
    } );

    it( 'should set the value of \'title\'.', function () {
        var obj = 'something';
        NavService.setTitle( obj );
        expect( NavService.getTitle() ).toBe( obj );
    } );

} );