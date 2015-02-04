describe( 'Service: SubmissionService', function () {

    beforeEach( module( 'expenseApp' ) );

    var SubmissionService;
    var $httpBackend;
    var loginPath = '/api/login/isLoggedIn';
    var loginObj = {
        userName: 'testUser',
        isApprover: false,
        isLoggedIn: true,
        isFinanceApprover: false,
        isManager: false,
    };
    var loginResult;

    beforeEach( inject( function ( _SubmissionService_, _$httpBackend_ ) {
        SubmissionService = _SubmissionService_;
        $httpBackend = _$httpBackend_;

        

        //$httpBackend.when( 'GET', loginPath ).respond( loginObj );
    } ) );

   /* it( ' should call the GET /api/Submission endpoint.', function () {
        var submissions = [{ name: 'this is sub 1' }, { name: 'this is sub 2' }, { name: 'this is sub 3' }];
        var result = [];
        var urlPath = '/api/Submission';
        spyOn( SubmissionService, 'isLoggedIn' );
        $httpBackend.expect( 'GET', urlPath ).respond( submissions );
        SubmissionService.getSubmissions().then(
            function ( success ) {
                result = success;
            }
        );
        $httpBackend.flush();
        expect( result.status ).toBe( 200 );
        expect( result.data ).toEqual( submissions );
    } );*/


} );