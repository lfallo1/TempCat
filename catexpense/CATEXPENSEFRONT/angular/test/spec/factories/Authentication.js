'use strict';

describe( 'Factory: Authentication', function () {

    beforeEach( module( 'expenseApp' ) );

    var Authentication;
    var $q;
    var $httpBackend;
    var $timeout;

    beforeEach( inject( function ( _Authentication_, _$q_, _$httpBackend_, _$timeout_ ) {
        Authentication = _Authentication_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );