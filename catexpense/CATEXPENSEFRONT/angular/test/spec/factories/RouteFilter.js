'use strict';

describe( 'Factory: RouteFilter', function () {

    beforeEach( module( 'expenseApp' ) );

    var RouteFilter;
    var $location;

    beforeEach( inject( function ( _RouteFilter_, _$location_ ) {
        RouteFilter = _RouteFilter_;
        $location = _$location_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );