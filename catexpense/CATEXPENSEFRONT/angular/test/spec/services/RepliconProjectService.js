'use strict';

describe( 'Service: RepliconProjectService', function () {

    beforeEach( module( 'expenseApp' ) );

    var RepliconProjectService;
    var $httpBackend;

    beforeEach( inject( function ( _RepliconProjectService_, _$httpBackend_ ) {
        RepliconProjectService = _RepliconProjectService_;
        $httpBackend = _$httpBackend_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );