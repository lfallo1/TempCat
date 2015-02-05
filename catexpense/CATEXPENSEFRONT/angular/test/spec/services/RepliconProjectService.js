'use strict';

describe( 'Service: RepliconProjectService', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var RepliconProjectService;
    var $httpBackend;

    beforeEach( inject( function ( _RepliconProjectService_, _$httpBackend_ ) {
        RepliconProjectService = _RepliconProjectService_;
        $httpBackend = _$httpBackend_;

    } ) );

    afterEach( function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    //=====================================================================//
    //
    //  testing GET methods
    //
    //=====================================================================//

    // GET /api/RepliconProject
    it( 'should call the GET /api/RepliconProject endpoint. (success)', function () {
        var url = '/api/RepliconProject';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock replicon projects' );
        RepliconProjectService.getAllRepliconProjects().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock replicon projects' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/RepliconProject endpoint. (error)', function () {
        var url = '/api/RepliconProject';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        RepliconProjectService.getAllRepliconProjects().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    //=====================================================================//
    //
    //  testing POST methods
    //
    //=====================================================================//

    // POST /api/RepliconProject/UpdateRepliconProjectTable
    it( 'should call the POST /api/RepliconProject/UpdateRepliconProjectTable endpoint. (success)', function () {
        var url = '/api/RepliconProject/UpdateRepliconProjectTable';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'POST', url ).respond( 200, 'mock replicon projects' );
        RepliconProjectService.updateRepliconProjects().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock replicon projects' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the POST /api/RepliconProject/UpdateRepliconProjectTable endpoint. (error)', function () {
        var url = '/api/RepliconProject/UpdateRepliconProjectTable';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'POST', url ).respond( 500, 'mock error message' );
        RepliconProjectService.updateRepliconProjects().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

} );