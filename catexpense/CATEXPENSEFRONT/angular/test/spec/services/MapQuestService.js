'use strict';

describe( 'Service: MapQuestService', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var MapQuestService;
    var $httpBackend;
    var key = "Fmjtd%7Cluurnu6tn1%2Ca2%3Do5-9wbw0y";
    var mqObj;
    var url;
    var completeUrl;

    beforeEach( inject( function ( _MapQuestService_, _$httpBackend_ ) {
        MapQuestService = _MapQuestService_;
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

    // GET https://open.mapquestapi.com/directions/v2/route
    it( 'should call the GET https://open.mapquestapi.com/directions/v2/route endpoint. (success)', function () {
        mqObj = {
            from: 'abc',
            to: 'xyz'
        };
        url = "https://open.mapquestapi.com/directions/v2/route?key="
        completeUrl = url + key + "&from=" + mqObj.from
            + "&to=" + mqObj.to;

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', completeUrl ).respond( 200, 'mock mapquest location obj' );
        MapQuestService.getDistance( mqObj ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock mapquest location obj' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET https://open.mapquestapi.com/directions/v2/route endpoint. (error)', function () {
        mqObj = {
            from: 'abc',
            to: 'xyz'
        };
        url = "https://open.mapquestapi.com/directions/v2/route?key="
        completeUrl = url + key + "&from=" + mqObj.from
            + "&to=" + mqObj.to;

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', completeUrl ).respond( 500, 'mock error message' );
        MapQuestService.getDistance( mqObj ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    //GET https://open.mapquestapi.com/geocoding/v1/address
    it( 'should call the GET https://open.mapquestapi.com/geocoding/v1/address endpoint. (success)', function () {
        mqObj = {
            location: 'abc'
        };

        url = "https://open.mapquestapi.com/geocoding/v1/address?key="
        completeUrl = url + key + "&location=" + mqObj.location;

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', completeUrl ).respond( 200, 'mock mapquest location' );
        MapQuestService.getLocation( mqObj ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock mapquest location' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET https://open.mapquestapi.com/geocoding/v1/address endpoint. (error)', function () {
        mqObj = {
            location: 'abc'
        };

        url = "https://open.mapquestapi.com/geocoding/v1/address?key="
        completeUrl = url + key + "&location=" + mqObj.location;

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', completeUrl ).respond( 500, 'mock error message' );
        MapQuestService.getLocation( mqObj ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

} );