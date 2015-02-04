'use strict';

describe( 'Service: MapQuestService', function () {

    beforeEach( module( 'expenseApp' ) );

    var MapQuestService;
    var $httpBackend;

    beforeEach( inject( function ( _MapQuestService_, _$httpBackend_ ) {
        MapQuestService = _MapQuestService_;
        $httpBackend = _$httpBackend_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );