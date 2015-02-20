'use strict';

//testing all the functionality except scope.policyIs
describe( 'Controller: PolicyCtrl', function () {

    var PolicyCtrl;
    var scope;
    var httpBackend;

    //Mock $modalInstance
    var mockModalInstance = {
        close: function ( successMessage ) {
            this.result = successMessage;
        },
        dismiss: function ( failureMessage ) {
            this.result = failureMessage;
        },
        result: null
    };

    var mockSelectedType = 'something';


    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    //mock a logged in user
    beforeEach( inject( function ( $httpBackend ) {
        httpBackend = $httpBackend;
        $httpBackend.expectGET( '/api/login/isLoggedIn' ).respond(
            {
                Username: "testuser",
                isLoggedIn: true,
                isFinanceApprover: false,
                isManager: false
            }
        );
    } ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        PolicyCtrl = $controller( 'PolicyCtrl', {
            $scope: scope,
            $modalInstance: mockModalInstance,
            selectedType: mockSelectedType
        } );

    } ) );

    it( 'should set policyType equal to selectedType as the default.', function () {
        expect( scope.policyType ).toBe( mockSelectedType );
    } );


    it( 'should dismiss the modal.', function () {
        spyOn( mockModalInstance, 'dismiss' );
        scope.ok();
        expect( mockModalInstance.dismiss ).toHaveBeenCalledWith( 'Form was cancelled.' );
    } );

} );

//test the contents of scope.policyIs
describe( 'Controller: PolicyCtrl', function () {

    var PolicyCtrl;
    var scope;
    var httpBackend;

    var typesArray = [
        'Mileage',
        'Per Diem',
        'Transportation',
        'Lodging',
        'Parking',
        'Entertainment',
        'Meals',
        'Airfare',
        'Other',
        null,
        undefined
    ];

    var counter = 0;

    var actualResult;

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    //mock a logged in user
    beforeEach( inject( function ( $httpBackend ) {
        httpBackend = $httpBackend;
        $httpBackend.expectGET( '/api/login/isLoggedIn' ).respond(
            {
                Username: "testuser",
                isLoggedIn: true,
                isFinanceApprover: false,
                isManager: false
            }
        );
    } ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        PolicyCtrl = $controller( 'PolicyCtrl', {
            $scope: scope,
            $modalInstance: null,
            selectedType: typesArray[counter]
        } );

        actualResult = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false
        }
    } ) );

    afterEach( function () {
        counter++;
    } );

   /* it( 'should say that scope.policyIs.mileage = true.', function () {
        actualResult.mileage = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.perdiem = true.', function () {
        actualResult.perdiem = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.transportation = true.', function () {
        actualResult.transportation = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.lodging = true.', function () {
        actualResult.lodging = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.parking = true.', function () {
        actualResult.parking = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.entertainment = true.', function () {
        actualResult.entertainment = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.meals = true.', function () {
        actualResult.meals = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.airfare = true.', function () {
        actualResult.airfare = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that scope.policyIs.other = true.', function () {
        actualResult.other = true;
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that all of scope.policy\'s fields are false if selectedType = null.', function () {
        expect( scope.policyIs ).toEqual( actualResult );
    } );

    it( 'should say that all of scope.policy\'s fields are false if selectedType = undefined.', function () {
        expect( scope.policyIs ).toEqual( actualResult );
    } );*/

} );

