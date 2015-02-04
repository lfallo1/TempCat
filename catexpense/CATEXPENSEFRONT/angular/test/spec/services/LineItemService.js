'use strict';

describe( 'Service: LineItemService', function () {

    beforeEach( module( 'expenseApp' ) );

    var LineItemService;
    var $httpBackend;

    beforeEach( inject( function ( _LineItemService_, _$httpBackend_ ) {
        LineItemService = _LineItemService_;
        $httpBackend = _$httpBackend_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );