'use strict';

describe( 'Service: RepliconUserService', function () {

    beforeEach( module( 'expenseApp' ) );

    var RepliconUserService;
    var $httpBackend;

    beforeEach( inject( function ( _RepliconUserService_, _$httpBackend_ ) {
        RepliconUserService = _RepliconUserService_;
        $httpBackend = _$httpBackend_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );