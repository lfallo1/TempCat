describe('Service: ExpenseCategory', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var ExpenseCategory;
    var $httpBackend;

    beforeEach( inject( function ( _ExpenseCategory_, _$httpBackend_ ) {
        ExpenseCategory = _ExpenseCategory_;
        $httpBackend = _$httpBackend_;

    } ) );

    afterEach( function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    // GET /api/ExpenseCategory/GetAllExpenseCategories
    it('should call the GET /api/ExpenseCategory/GetAllExpenseCategories endpoint. (success)', function () {
        var url = '/api/ExpenseCategory/GetAllExpenseCategories';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect( 'GET', url ).respond( 200, 'mock expense categories' );
        ExpenseCategory.getAllExpenseCategories().then(successCallback, errorCallback);

        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect( successCallback ).toHaveBeenCalled();
        expect( successCallback.calls.mostRecent().args[0].data ).toBe( 'mock expense categories' );
        expect( successCallback.calls.mostRecent().args[0].status ).toBe( 200 );

        expect( errorCallback ).not.toHaveBeenCalled();

    });

    it('should call the GET /api/ExpenseCategory/GetAllExpenseCategories endpoint. (error)', function () {
        var url = '/api/ExpenseCategory/GetAllExpenseCategories';
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $httpBackend.expect('GET', url).respond(500, 'mock error message');
        ExpenseCategory.getAllExpenseCategories().then(successCallback, errorCallback);

        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        $httpBackend.flush();

        expect(errorCallback).toHaveBeenCalled();
        expect(errorCallback.calls.mostRecent().args[0].data).toBe('mock error message');
        expect(errorCallback.calls.mostRecent().args[0].status).toBe(500);

        expect(successCallback).not.toHaveBeenCalled();

    });

} );