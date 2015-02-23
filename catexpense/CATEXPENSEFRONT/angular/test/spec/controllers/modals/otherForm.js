'use strict';

describe( 'Controller: OtherCtrl', function () {

    var OtherCtrl;
    var scope;
    var LineItemService;
    var LineItem;
    var LineItemValidity;
    var underEdit;
    var ValidationService;
    var validationObj;

    // load the controller's module
    beforeEach( module( 'expenseApp.Controllers' ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {

        validationObj = {
            validInput: true,
            date: {
                valid: true,
                message: 'This field is valid.'
            },
            description: {
                valid: true,
                message: 'This field is valid.'
            },
            amount: {
                valid: true,
                message: 'This field is valid.'
            }
        };

        LineItem = {
            LineItemDate: '',
            LineItemDesc: '',
            LineItemAmount: 0,
            Billable: false
        };

        LineItemValidity = false;

        underEdit = false;

        LineItemService = {
            getLineItem: function () { },
            getLineItemDate: function () { },
            setLineItemDate: function ( value ) { },
            getLineItemDesc: function () { },
            setLineItemDesc: function ( value ) { },
            getLineItemAmount: function () { },
            setLineItemAmount: function ( value ) { },
            getBillable: function () { },
            setBillable: function ( value ) { },
            getDaysString: function () { },
            setValidity: function () { },
            resetLineItem: function () { }
        };

        spyOn( LineItemService, 'getLineItem' ).and.returnValue( LineItem );
        spyOn( LineItemService, 'getLineItemDate' ).and.returnValue( LineItem.LineItemDate );
        spyOn( LineItemService, 'setLineItemDate' ).and.callFake(
            function ( value ) {
                LineItem.LineItemDate = value;
            } );
        spyOn( LineItemService, 'getLineItemDesc' ).and.returnValue( LineItem.LineItemDesc );
        spyOn( LineItemService, 'setLineItemDesc' ).and.callFake(
            function ( value ) {
                LineItem.LineItemDesc = value;
            } );
        spyOn( LineItemService, 'getLineItemAmount' ).and.returnValue( LineItem.LineItemAmount );
        spyOn( LineItemService, 'setLineItemAmount' ).and.callFake(
            function ( value ) {
                LineItem.LineItemAmount = value;
            } );
        spyOn( LineItemService, 'getBillable' ).and.returnValue( LineItem.Billable );
        spyOn( LineItemService, 'setBillable' ).and.callFake(
            function ( value ) {
                LineItem.Billable = value;
            } );
        spyOn( LineItemService, 'getDaysString' ).and.returnValue(
            {
                sunday: 'test sunday',
                monday: 'test monday',
                tuesday: 'test tuesday',
                wednesday: 'test wednesday',
                thursday: 'test thursday',
                friday: 'test friday',
                saturday: 'test saturday'
            } );
        spyOn( LineItemService, 'setValidity' ).and.callFake(
            function ( value ) {
                LineItemValidity = value;
            } );
        spyOn( LineItemService, 'resetLineItem' ).and.callFake(
            function () {
                LineItem = {
                    LineItemDate: '',
                    LineItemDesc: '',
                    LineItemAmount: 0,
                    Billable: false
                };
            } );

        ValidationService = {
            validateOther: function ( obj ) { }
        };

        scope = $rootScope.$new();

        OtherCtrl = $controller( 'OtherCtrl', {
            $scope: scope,
            LineItemService: LineItemService,
            ValidationService: ValidationService
        } );

    } ) );

    it( 'should get the default values for scope.otherValues. ', function () {

        var expectedResult = {
            date: '',
            description: '',
            amount: 0,
            billable: false
        };

        expect( scope.otherValues ).toEqual( expectedResult );
        expect( LineItemService.getLineItemDate.calls.count() ).toBe( 1 );
        expect( LineItemService.getLineItemDesc.calls.count() ).toBe( 1 );
        expect( LineItemService.getLineItemAmount.calls.count() ).toBe( 1 );
        expect( LineItemService.getBillable.calls.count() ).toBe( 1 );
    } );

    it( 'should get the default validation values.', function () {
        expect( scope.isDateValid() ).toBe( true );
        expect( scope.dateValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.isDescValid() ).toBe( true );
        expect( scope.descValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.isAmountValid() ).toBe( true );
        expect( scope.amountValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.otherIsValid() ).toBe( true );
    } );

    it( 'should update the date to the LineItemService and well as perform validation (valid date).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            validationObj.date.valid = testItem.LineItemDate instanceof Date && !isNaN( testItem.LineItemDate.valueOf() );
            if ( !validationObj.date.valid ) {
                if ( testItem.LineItemDate === '' ) {
                    validationObj.date.message = 'Please provide a date.';
                } else {
                    validationObj.date.message = 'Invalid date.';
                }
            };
            validationObj.validInput = validationObj.date.valid;
            return validationObj;
        } );

        spyOn( scope, 'isDateValid' ).and.callThrough();
        spyOn( scope, 'dateValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testDate = new Date();
        scope.otherValues.date = testDate;

        scope.updateDate();

        expect( LineItemService.setLineItemDate.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemDate.calls.mostRecent().args[0] ).toEqual( testDate );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isDateValid() ).toBe( true );
        expect( scope.dateValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( true );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( true );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the date to the LineItemService and well as perform validation (empty date).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            validationObj.date.valid = testItem.LineItemDate instanceof Date && !isNaN( testItem.LineItemDate.valueOf() );
            if ( !validationObj.date.valid ) {
                if ( testItem.LineItemDate === '' ) {
                    validationObj.date.message = 'Please provide a date.';
                } else {
                    validationObj.date.message = 'Invalid date.';
                }
            };
            validationObj.validInput = validationObj.date.valid;
            return validationObj;
        } );

        spyOn( scope, 'isDateValid' ).and.callThrough();
        spyOn( scope, 'dateValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testDate = '';
        scope.otherValues.date = testDate;

        scope.updateDate();

        expect( LineItemService.setLineItemDate.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemDate.calls.mostRecent().args[0] ).toEqual( testDate );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isDateValid() ).toBe( false );
        expect( scope.dateValidationMessage() ).toBe( 'Please provide a date.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( false );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( false );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the date to the LineItemService and well as perform validation (invalid date).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            validationObj.date.valid = testItem.LineItemDate instanceof Date && !isNaN( testItem.LineItemDate.valueOf() );
            if ( !validationObj.date.valid ) {
                if ( testItem.LineItemDate === '' ) {
                    validationObj.date.message = 'Please provide a date.';
                } else {
                    validationObj.date.message = 'Invalid date.';
                }
            };
            validationObj.validInput = validationObj.date.valid;
            return validationObj;
        } );

        spyOn( scope, 'isDateValid' ).and.callThrough();
        spyOn( scope, 'dateValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testDate = 'this is an invalid date';
        scope.otherValues.date = testDate;

        scope.updateDate();

        expect( LineItemService.setLineItemDate.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemDate.calls.mostRecent().args[0] ).toEqual( testDate );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isDateValid() ).toBe( false );
        expect( scope.dateValidationMessage() ).toBe( 'Invalid date.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( false );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( false );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the description to the LineItemService and well as perform validation (valid description).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            validationObj.description.valid = testItem.LineItemDesc.length > 0;
            if ( !validationObj.description.valid ) {
                validationObj.description.message = 'Please input a description.';
            };
            validationObj.validInput = validationObj.description.valid;
            return validationObj;
        } );

        spyOn( scope, 'isDescValid' ).and.callThrough();
        spyOn( scope, 'descValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testDesc = 'this is a test description';
        scope.otherValues.description = testDesc;

        scope.updateDescription();

        expect( LineItemService.setLineItemDesc.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemDesc.calls.mostRecent().args[0] ).toEqual( testDesc );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isDescValid() ).toBe( true );
        expect( scope.descValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( true );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( true );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the description to the LineItemService and well as perform validation (empty description).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            validationObj.description.valid = testItem.LineItemDesc.length > 0;
            if ( !validationObj.description.valid ) {
                validationObj.description.message = 'Please input a description.';
            };
            validationObj.validInput = validationObj.description.valid;
            return validationObj;
        } );

        spyOn( scope, 'isDescValid' ).and.callThrough();
        spyOn( scope, 'descValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testDesc = '';
        scope.otherValues.description = testDesc;

        scope.updateDescription();

        expect( LineItemService.setLineItemDesc.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemDesc.calls.mostRecent().args[0] ).toEqual( testDesc );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isDescValid() ).toBe( false );
        expect( scope.descValidationMessage() ).toBe( 'Please input a description.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( false );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( false );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the amount to the LineItemService and well as perform validation (valid amount).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            var regExp = /^(\d*.?\d+)$/;
            validationObj.amount.valid = regExp.test( testItem.LineItemAmount ) && testItem.LineItemAmount >= 0;
            if ( !validationObj.amount.valid ) {
                validationObj.amount.message = 'Please input a valid amount.';
            };
            validationObj.validInput = validationObj.amount.valid;
            return validationObj;
        } );

        spyOn( scope, 'isAmountValid' ).and.callThrough();
        spyOn( scope, 'amountValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testAmount = 10;
        scope.otherValues.amount = testAmount;

        scope.updateAmount();

        expect( LineItemService.setLineItemAmount.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemAmount.calls.mostRecent().args[0] ).toEqual( testAmount );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isAmountValid() ).toBe( true );
        expect( scope.amountValidationMessage() ).toBe( 'This field is valid.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( true );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( true );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the amount to the LineItemService and well as perform validation (invalid amount).', function () {
        spyOn( ValidationService, 'validateOther' ).and.callFake( function ( testItem ) {
            var regExp = /^(\d*.?\d+)$/;
            validationObj.amount.valid = regExp.test( testItem.LineItemAmount ) && testItem.LineItemAmount >= 0;
            if ( !validationObj.amount.valid ) {
                validationObj.amount.message = 'Please input a valid amount.';
            };
            validationObj.validInput = validationObj.amount.valid;
            return validationObj;
        } );

        spyOn( scope, 'isAmountValid' ).and.callThrough();
        spyOn( scope, 'amountValidationMessage' ).and.callThrough();
        spyOn( scope, 'otherIsValid' ).and.callThrough();

        var testAmount = 'a string';
        scope.otherValues.amount = testAmount;

        scope.updateAmount();

        expect( LineItemService.setLineItemAmount.calls.count() ).toBe( 1 );
        expect( LineItemService.setLineItemAmount.calls.mostRecent().args[0] ).toEqual( testAmount );

        expect( ValidationService.validateOther.calls.count() ).toBe( 1 );
        expect( ValidationService.validateOther.calls.mostRecent().args[0] ).toEqual( LineItem );

        expect( LineItemService.getLineItem.calls.count() ).toBe( 1 );
        expect( scope.isAmountValid() ).toBe( false );
        expect( scope.amountValidationMessage() ).toBe( 'Please input a valid amount.' );

        expect( scope.otherIsValid.calls.count() ).toBe( 1 );
        expect( scope.otherIsValid() ).toBe( false );
        expect( LineItemService.setValidity.calls.count() ).toBe( 1 );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( false );
        expect( LineItemService.setValidity.calls.mostRecent().args[0] ).toBe( scope.otherIsValid() );

    } );

    it( 'should update the billable field in LineItemService.', function () {
        scope.otherValues.billable = true;
        scope.updateBillable();
        expect( LineItemService.setBillable.calls.count() ).toBe( 1 );
        expect( LineItemService.setBillable.calls.mostRecent().args[0] ).toBe( true );
        expect( LineItemService.setBillable.calls.mostRecent().args[0] ).toBe( scope.otherValues.billable );
    } );

    it( 'should set the date object to today when clicking the \'today\' button.', function () {
        expect( scope.otherValues.date ).toBe( '' );
        scope.today();
        var date = new Date();
        expect( scope.otherValues.date.toUTCString() ).toEqual( date.toUTCString() );
    } );

    it( 'should clear the date object when clicking the \'clear\' button.', function () {
        expect( scope.otherValues.date ).toBe( '' );
        scope.clear();
        expect( scope.otherValues.date ).toBe( null );
    } );

    it( 'should set the default minimum date.', function () {
        expect( scope.minDate ).toBe( 'test sunday' );
        //expect the count to be 2 because it is being called on load for both minDate and maxDate
        expect( LineItemService.getDaysString.calls.count() ).toBe( 2 );
    } );

    it( 'should set the default maximum date.', function () {
        expect( scope.maxDate ).toBe( 'test saturday' );
        //expect the count to be 2 because it is being called on load for both minDate and maxDate
        expect( LineItemService.getDaysString.calls.count() ).toBe( 2 );
    } );

    it( 'should open the datepicker modal.', function () {
        var event = {
            preventDefault: jasmine.createSpy(),
            stopPropagation: jasmine.createSpy()
        };
        scope.open( event );
        expect( event.preventDefault.calls.count() ).toBe( 1 );
        expect( event.stopPropagation.calls.count() ).toBe( 1 );
        expect( scope.opened ).toBe( true );
    } );

    it( 'should set the default value for dateOptions.', function () {
        expect( scope.dateOptions.formatYear ).toBe( 'yy' );
        expect( scope.dateOptions.startingDay ).toBe( 1 );
    } );

    it( 'should set the default values for formats[].', function () {
        expect( scope.formats.length ).toBe( 4 );
        expect( scope.formats[0] ).toBe( 'yyyy/MM/dd' );
        expect( scope.formats[1] ).toBe( 'EEEE - MMM. dd/yyyy' );
        expect( scope.formats[2] ).toBe( 'dd.MM.yyyy' );
        expect( scope.formats[3] ).toBe( 'shortDate' );
    } );

    it( 'should set the default value for format.', function () {
        expect( scope.format ).toBe( 'EEEE - MMM. dd/yyyy' );
        expect( scope.format ).toBe( scope.formats[1] );
    } );

} );
