'use strict';

describe( 'Controller: PerDiemCtrl', function () {

    var PerDiemCtrl;
    var scope;
    var LineItemService;
    var lineItem;
    var lineItemValidity;
    var extraData;
    var ValidationService;
    var validationObj;

    // load the controller's module
    beforeEach( module( 'expenseApp.Controllers' ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {

        ValidationService = {
            validatePerDiem: function () { }
        };

        validationObj = {
            days: {
                valid: true,
                message: 'This field is valid.'
            },
            validInput: true
        };


        lineItem = {
            billable: false,
            amount: 0
        };

        lineItemValidity = false;

        extraData = {
            daysString: {
                sunday: 'sunday',
                monday: 'monday',
                tuesday: 'tuesday',
                wednesday: 'wednesday',
                thursday: 'thursday',
                friday: 'friday',
                saturday: 'saturday'
            },
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            }
        };

        LineItemService = {
            getDaysString: function () { },
            getDays: function () { },
            setDays: function () { },
            getBillable: function () { },
            setBillable: function () { },
            getLineItemAmount: function () { },
            setLineItemAmount: function () { },
            getLineItem: function () { },
            setValidity: function () { }
        };

        spyOn( LineItemService, 'getDaysString' ).and.returnValue( extraData.daysString );
        spyOn( LineItemService, 'getDays' ).and.returnValue( extraData.days );
        spyOn( LineItemService, 'setDays' ).and.callFake(
            function ( value ) {
                extraData.days = value;
            } );
        spyOn( LineItemService, 'getBillable' ).and.returnValue( lineItem.billable );
        spyOn( LineItemService, 'setBillable' ).and.callFake(
            function ( value ) {
                lineItem.billable = value;
            } );
        spyOn( LineItemService, 'getLineItemAmount' ).and.returnValue( lineItem.amount );
        spyOn( LineItemService, 'setLineItemAmount' ).and.callFake(
            function ( value ) {
                lineItem.amount = value;
            } );
        spyOn( LineItemService, 'getLineItem' ).and.returnValue( lineItem );
        spyOn( LineItemService, 'setValidity' ).and.callFake(
            function ( value ) {
                lineItemValidity = value;
            } );



        scope = $rootScope.$new();

        PerDiemCtrl = $controller( 'PerDiemCtrl', {
            $scope: scope,
            LineItemService: LineItemService,
            ValidationService: ValidationService
        } );
    } ) );

    it( 'should get the default values for scope.perDiemValues. ', function () {

        var expectedResult = {
            daysString: {
                sunday: 'sunday',
                monday: 'monday',
                tuesday: 'tuesday',
                wednesday: 'wednesday',
                thursday: 'thursday',
                friday: 'friday',
                saturday: 'saturday'
            },
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            billable: false,
            amount: 0
        };

        expect( scope.perDiemValues ).toEqual( expectedResult );
        expect( LineItemService.getDaysString.calls.count() ).toBe( 7 );
        expect( LineItemService.getDays.calls.count() ).toBe( 1 );
        expect( LineItemService.getLineItemAmount.calls.count() ).toBe( 1 );
        expect( LineItemService.getBillable.calls.count() ).toBe( 1 );
    } );

    it( 'should get the default perdiem validation values.', function () {
        expect( scope.areDaysValid() ).toBe( true );
        expect( scope.daysValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.perDiemIsValid() ).toBe( true );
    } );

    it( 'should calculate the amount based on the number of days chosen when no days are checked.', function () {
        var expectedValue = '0.00';
        scope.calculateTotal();
        expect( scope.perDiemValues.amount ).toBe( expectedValue );
        expect( LineItemService.setLineItemAmount.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemAmount.calls.mostRecent().args[0] ).toBe( scope.perDiemValues.amount );
    } );

    it( 'should calculate the amount based on the number of days chosen when some days are checked.', function () {
        var expectedValue = '120.00';
        scope.perDiemValues.days = {
            sunday: true,
            monday: false,
            tuesday: true,
            wednesday: false,
            thursday: true,
            friday: false,
            saturday: true
        };
        scope.calculateTotal();
        expect( scope.perDiemValues.amount ).toBe( expectedValue );
        expect( LineItemService.setLineItemAmount.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemAmount.calls.mostRecent().args[0] ).toBe( scope.perDiemValues.amount );
    } );

    it( 'should update the days to the LineItemService as well as perform validation. ( no days selected )', function () {
        var testDays = {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        };

        scope.perDiemValues.days = testDays;

        spyOn( ValidationService, 'validatePerDiem' ).and.callFake( function ( testItem ) {

            validationObj.days.valid = testDays.sunday || testDays.monday || testDays.tuesday || testDays.wednesday
                || testDays.thursday || testDays.friday || testDays.saturday;
            if ( !validationObj.days.valid ) {
                validationObj.days.message = 'Please select at least one day.';
            };

            validationObj.validInput = validationObj.days.valid;
            return validationObj;

        } );

        spyOn( scope, 'areDaysValid' ).and.callThrough();
        spyOn( scope, 'daysValidationMessage' ).and.callThrough();
        spyOn( scope, 'perDiemIsValid' ).and.callThrough();

        scope.updateDays();

        expect( LineItemService.setDays.calls.count() ).toBe( 1 );
        expect( LineItemService.setDays.calls.mostRecent().args[0] ).toEqual( testDays );

        expect( ValidationService.validatePerDiem.calls.count() ).toBe( 1 );
        expect( ValidationService.validatePerDiem.calls.mostRecent().args[0] ).toEqual( lineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.areDaysValid() ).toBe( false );
        expect( scope.daysValidationMessage() ).toBe( 'Please select at least one day.' );

        expect( scope.perDiemIsValid.calls.count() ).toBe( 1 );
        expect( scope.perDiemIsValid() ).toBe( false );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( false );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.perDiemIsValid() );
    } );

    it( 'should update the days to the LineItemService as well as perform validation. ( at least one day selected )', function () {
        var testDays = {
            sunday: false,
            monday: true,
            tuesday: false,
            wednesday: false,
            thursday: true,
            friday: false,
            saturday: false
        };

        scope.perDiemValues.days = testDays;

        spyOn( ValidationService, 'validatePerDiem' ).and.callFake( function ( testItem ) {

            validationObj.days.valid = testDays.sunday || testDays.monday || testDays.tuesday || testDays.wednesday
                || testDays.thursday || testDays.friday || testDays.saturday;
            if ( !validationObj.days.valid ) {
                validationObj.days.message = 'Please select at least one day.';
            };

            validationObj.validInput = validationObj.days.valid;
            return validationObj;

        } );

        spyOn( scope, 'areDaysValid' ).and.callThrough();
        spyOn( scope, 'daysValidationMessage' ).and.callThrough();
        spyOn( scope, 'perDiemIsValid' ).and.callThrough();

        scope.updateDays();

        expect( LineItemService.setDays.calls.count() ).toBe( 1 );
        expect( LineItemService.setDays.calls.mostRecent().args[0] ).toEqual( testDays );

        expect( ValidationService.validatePerDiem.calls.count() ).toBe( 1 );
        expect( ValidationService.validatePerDiem.calls.mostRecent().args[0] ).toEqual( lineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.areDaysValid() ).toBe( true );
        expect( scope.daysValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.perDiemIsValid.calls.count() ).toBe( 1 );
        expect( scope.perDiemIsValid() ).toBe( true );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( true );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.perDiemIsValid() );
    } );

    it( 'should update the billable field in LineItemService.', function () {
        scope.perDiemValues.billable = true;
        scope.updateBillable();
        expect( LineItemService.setBillable.calls.count() ).toBe( 1 );
        expect( LineItemService.setBillable.calls.mostRecent().args[0] ).toBe( true );
        expect( LineItemService.setBillable.calls.mostRecent().args[0] ).toBe( scope.perDiemValues.billable );
    } );

} );
