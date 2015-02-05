describe( 'Service: SubmissionService', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var SubmissionService;
    var $httpBackend;

    beforeEach( inject( function ( _SubmissionService_, _$httpBackend_ ) {
        SubmissionService = _SubmissionService_;
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

    // GET /api/Submissions
    it( 'should call the GET /api/Submissions endpoint. (success)', function () {
        var url = '/api/Submissions/';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock submissions' );
        SubmissionService.getSubmissionsByUsername().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock submissions' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/Submissions endpoint. (error)', function () {
        var url = '/api/Submissions/';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        SubmissionService.getSubmissionsByUsername().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    //GET /api/Submission/GetPendingSubmissionsByManagerName
    it( 'should call the GET /api/Submission/GetPendingSubmissionsByManagerName endpoint. (success)', function () {
        var url = '/api/Submission/GetPendingSubmissionsByManagerName';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock submissions' );
        SubmissionService.getPendingSubmissionsByManagerName().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock submissions' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/Submission/GetPendingSubmissionsByManagerName endpoint. (error)', function () {
        var url = '/api/Submission/GetPendingSubmissionsByManagerName';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        SubmissionService.getPendingSubmissionsByManagerName().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

    //GET /api/Submission/GetPendingSubmissionsByFinanceApprover
    it( 'should call the GET /api/Submission/GetPendingSubmissionsByFinanceApprover endpoint. (success)', function () {
        var url = '/api/Submission/GetPendingSubmissionsByFinanceApprover';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock submissions' );
        SubmissionService.getPendingSubmissionsByFinanceApprover().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock submissions' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the GET /api/Submission/GetPendingSubmissionsByFinanceApprover endpoint. (error)', function () {
        var url = '/api/Submission/GetPendingSubmissionsByFinanceApprover';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 500, 'mock error message' );
        SubmissionService.getPendingSubmissionsByFinanceApprover().then( successCallback, errorCallback );

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

    //POST /api/Submission
    it( 'should call the POST /api/Submission endpoint. (success)', function () {
        var url = '/api/Submission';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'POST', url ).respond( 201, 'mock submissions' );
        SubmissionService.submitExpenseReport().then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock submissions' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 201 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the POST /api/Submission endpoint. (error)', function () {
        var url = '/api/Submission';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'POST', url ).respond( 500, 'mock error message' );
        SubmissionService.submitExpenseReport().then( successCallback, errorCallback );

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
    //  testing PUT methods
    //
    //=====================================================================//

    //PUT /api/Submissions/
    it( 'should call the PUT /api/Submissions/ endpoint. (success)', function () {
        var url = '/api/Submissions/';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'PUT', url + '?id=1' ).respond( 200, 'mock submissions' );
        SubmissionService.updateSubmission( 1, {} ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock submissions' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the PUT /api/Submissions/n endpoint. (error)', function () {
        var url = '/api/Submissions/';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.when( 'PUT', url + '?id=1' ).respond( 500, 'mock error message' );
        SubmissionService.updateSubmission( 1, {} ).then( successCallback, errorCallback );

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
    //  testing DELETE methods
    //
    //=====================================================================//

    //DELETE /api/Submissions/
    it( 'should call the DELETE /api/Submissions/ endpoint. (success)', function () {
        var url = '/api/Submissions';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'DELETE', url + '?id=1' ).respond( 200, 'mock submissions' );
        SubmissionService.deleteExpenseReport( 1 ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock submissions' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    } );

    it( 'should call the DELETE /api/Submissions/n endpoint. (error)', function () {
        var url = '/api/Submissions';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.when( 'DELETE', url + '?id=1' ).respond( 500, 'mock error message' );
        SubmissionService.deleteExpenseReport( 1 ).then( successCallback, errorCallback );

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( errorCallback ).toHaveBeenCalled();
        expect( errorCallback.calls.mostRecent().args[0].data ).toBe( 'mock error message' );
        expect( errorCallback.calls.mostRecent().args[0].status ).toBe( 500 );

        expect( successCallback ).not.toHaveBeenCalled();

    } );

} );