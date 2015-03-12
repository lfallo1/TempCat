'use strict';

describe( 'Controller: MileageCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp.Controllers' ) );

    var MileageCtrl;
    var scope;
    var LineItemService;
    var MapQuestService, getDistanceDeferred;
    var ValidationService;
    var Authentication;
    var LogError;
    var LineItem, extraData, LIedit;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope, $q ) {

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

        MapQuestService = {
            getDistance: function () {
                getDistanceDeferred = $q.defer();
                return getDistanceDeferred.promise;
            },
        };

        scope = $rootScope.$new();

        //mocking parent methods
        scope.hideSaveAndCancel = function () { };
        scope.creatingMileage = function ( value ) { };

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

    it( 'should call scope.startMileage and display the mileage fields while hiding the save and cancel buttons.', function () {
        spyOn( scope, 'hideSaveAndCancel' );
        spyOn( scope, 'creatingMileage' );

        scope.startMileage();

        expect( scope.createMileage ).toBe( true );
        expect( scope.hideSaveAndCancel ).toHaveBeenCalled();
        expect( scope.creatingMileage ).toHaveBeenCalledWith( true );
    } );

    it( 'should call scope.editMileage after clicking the edit icon and fill in the mileage fields to edit.', function () {
        scope.mileageArray = [
            {
                date: 'date 1',
                origin: 'origin 1',
                destination: 'destination 1',
                miles: 100,
                description: 'description 1',
                amount: 10,
                billable: true
            },
            {
                date: 'date 2',
                origin: 'origin 2',
                destination: 'destination 2',
                miles: 200,
                description: 'description 2',
                amount: 20,
                billable: true
            }
        ];
        scope.mileageValues = {
            date: 'old date',
            origin: 'old origin',
            destination: 'old destination',
            miles: 0,
            description: 'old description',
            amount: 0,
            billable: false
        };
        scope.editingNewMileage = false;

        var index = 1;
        scope.editMileage( index );

        expect( scope.mileageValues ).toEqual( scope.mileageArray[index] );
        expect( scope.editingNewMileage ).toBe( true );

    } );

    it( 'should call scope.copyMileage after clicking the copy icon and autofill the mileage fields with the existing data.', function () {
        scope.mileageArray = [
            {
                date: 'date 1',
                origin: 'origin 1',
                destination: 'destination 1',
                miles: 100,
                description: 'description 1',
                amount: 10,
                billable: true
            },
            {
                date: 'date 2',
                origin: 'origin 2',
                destination: 'destination 2',
                miles: 200,
                description: 'description 2',
                amount: 20,
                billable: true
            }
        ];
        scope.mileageValues = {
            date: 'old date',
            origin: 'old origin',
            destination: 'old destination',
            miles: 0,
            description: 'old description',
            amount: 0,
            billable: false
        };

        spyOn( scope, 'startMileage' );

        var index = 1;
        scope.copyMileage( index );

        expect( scope.mileageValues ).toEqual( scope.mileageArray[index] );
        expect( scope.startMileage ).toHaveBeenCalled();
    } );

    it( 'should successfully calculate the distance between the origin and destination when clicking the \'Get Distance\' button.', function () {
        /*scope.mileageValues = {
            origin: 'here',
            destination: 'there'
        };

        var successObj = {
            data: {
                info: {
                    statuscode: 0
                },
                route: {
                    distance: 42
                }
            }
        };

        getDistanceDeferred.resolve( successObj );
        scope.$digest();
        scope.getDistance();

        expect( scope.mileageValues.miles ).toBe( successObj.data.route.distance );
        expect( scope.mileageValidation.miles.valid ).toBe( true );
        expect( scope.mileageValidation.miles.message ).toBe( 'This field is valid.' );*/

    } );


} );
