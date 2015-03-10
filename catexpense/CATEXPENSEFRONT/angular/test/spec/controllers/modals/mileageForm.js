'use strict';

describe( 'Controller: MileageCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp.Controllers' ) );

    var MileageCtrl;
    var scope;
    var LineItemService, MapQuestService, ValidationService, Authentication, LogError;
    var LineItem, extraData, LIedit;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {

        LineItem = {
            date: 'test date',
            description: 'test description',
            amount: 0,
            billable: false
        };

        extraData = {
            origin: 'ABC',
            destination: 'XYZ',
            miles: 123,
            daysString: {
                sunday: 'test sunday',
                saturday: 'test saturday'
            }
        };

        LIedit = false;

        LineItemService = {
            getUnderEdit: function () { },
            getLineItemDate: function () { },
            getOrigin: function () { },
            getDestination: function () { },
            getMiles: function () { },
            getLineItemDesc: function () { },
            getLineItemAmount: function () { },
            getBillable: function () { },
            getDaysString: function () { }
        };

        spyOn( LineItemService, 'getUnderEdit' ).and.returnValue( LIedit );
        spyOn( LineItemService, 'getLineItemDate' ).and.returnValue( LineItem.date );
        spyOn( LineItemService, 'getOrigin' ).and.returnValue( extraData.origin );
        spyOn( LineItemService, 'getDestination' ).and.returnValue( extraData.destination );
        spyOn( LineItemService, 'getMiles' ).and.returnValue( extraData.miles );
        spyOn( LineItemService, 'getLineItemDesc' ).and.returnValue( LineItem.description );
        spyOn( LineItemService, 'getLineItemAmount' ).and.returnValue( LineItem.amount );
        spyOn( LineItemService, 'getBillable' ).and.returnValue( LineItem.billable );
        spyOn( LineItemService, 'getDaysString' ).and.returnValue( extraData.daysString );

        scope = $rootScope.$new();

        MileageCtrl = $controller( 'MileageCtrl', {
            $scope: scope,
            LineItemService: LineItemService,
            MapQuestService: MapQuestService,
            ValidationService: ValidationService,
            Authentication: Authentication,
            LogError: LogError
        } );
    } ) );

    it( 'should get the default value for $scope.calculatingDistance.', function () {
        expect( scope.calculatingDistance ).toBe( false );
    } );

    it( 'should get the default value for $scope.createMileage.', function () {
        expect( scope.createMileage ).toBe( false );
    } );

    it( 'should get the default value for $scope.editingExistingMileage.', function () {
        expect( scope.editingExistingMileage ).toBe( false );
    } );

    it( 'should get the default value for $scope.editingNewMileage.', function () {
        expect( scope.editingNewMileage ).toBe( false );
    } );

    it( 'should get the default validation values for mileage.', function () {
        var expected = {
            date: {
                valid: true,
                message: 'This field is valid.'
            },
            origin: {
                valid: true,
                message: 'This field is valid.'
            },
            destination: {
                valid: true,
                message: 'This field is valid.'
            },
            miles: {
                valid: true,
                message: 'This field is valid.'
            },
            description: {
                valid: true,
                message: 'This field is valid.'
            },
            validInput: true
        };
        expect( scope.mileageValidation ).toEqual( expected );
    } );

    it( 'should get the default values for $scope.mileageValues.', function () {
        var expected = {
            date: 'test date',
            origin: 'ABC',
            destination: 'XYZ',
            miles: 123,
            description: 'test description',
            amount: 0,
            billable: false
        };
        expect( scope.mileageValues ).toEqual( expected );
    } );


} );
