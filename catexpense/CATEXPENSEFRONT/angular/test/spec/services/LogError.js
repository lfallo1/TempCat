'use strict';

describe('Service: LogError', function () {

    beforeEach(module('expenseApp.Services'));

    var LogError;
    var $httpBackend;
    var $timeout;

    beforeEach(inject(function (_LogError_, _$httpBackend_, _$timeout_) {
        LogError = _LogError_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // POST /api/Error
    it('should call the POST /api/Error endpoint. (success)', function () {
        var url = '/api/Error';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect('POST', url).respond(201, 'mock error logged successfully');
        LogError.logError().then(successCallback, errorCallback);

        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        
        $httpBackend.flush();

        expect(successCallback).toHaveBeenCalled();
        expect(successCallback.calls.mostRecent().args[0].data).toBe('mock error logged successfully');
        expect(successCallback.calls.mostRecent().args[0].status).toBe(201);

        expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should call the POST /api/Error endpoint. (error)', function () {
        var url = '/api/Error';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect('POST', url).respond(500, 'bad request');
        LogError.logError().then(successCallback, errorCallback);

        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect(errorCallback).toHaveBeenCalled();
        expect(errorCallback.calls.mostRecent().args[0].data).toBe('bad request');
        expect(errorCallback.calls.mostRecent().args[0].status).toBe(500);

        expect(successCallback).not.toHaveBeenCalled();
    });

});