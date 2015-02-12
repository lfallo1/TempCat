'use strict';

describe( 'Controller: OtherCtrl', function () {

    var OtherCtrl;
    var scope;
    var LineItemService;
    var LineItem;
    var underEdit;
    var ValidationService;
    var validationObj;

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope, $httpBackend ) {

        LineItem = {
            LineItemDate: '',
            LineItemDesc: '',
            LineItemAmount: 0,
            Billable: false
        };

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
                sunday: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                saturday: ''
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

        spyOn( scope, 'toggleMin' );
        spyOn( scope, 'toggleMax' );

        $httpBackend.when( 'GET', '/api/login/isLoggedIn' ).respond( {
            Username: 'testUser',
            isApprover: false,
            isLoggedIn: true,
            isFinanceApprover: false,
            isManager: false,
        } );

    } ) );

    it( 'should get the default values for scope.otherValues. ', function () {

        var expectedResult = {
            date: LineItemService.getLineItemDate(),
            description: LineItemService.getLineItemDesc(),
            amount: LineItemService.getLineItemAmount(),
            billable: LineItemService.getBillable()
        };

        expect( scope.otherValues ).toEqual( expectedResult );
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

    it( 'should trigger the watch event while creating a new line item.', function () {
        /*spyOn( ValidationService, 'validateOther' ).and.returnValue( {
            date: {
                valid: false,
                message: 'something'
            },
            description: {
                valid: false,
                message: 'happened'
            },
            amount: {
                valid: false,
                message: 'here'
            },
            validInput: false
        } );
        spyOn( scope, 'otherIsValid' ).and.returnValue( false );



        scope.$digest();
        scope.otherValues.amount = 90;
        //scope.$digest();


         expect( scope.isDateValid() ).toBe( false );
         expect( scope.dateValidationMessage() ).toBe( 'something' );
 
         expect( scope.isDescValid() ).toBe( false );
         expect( scope.descValidationMessage() ).toBe( 'happened' );
 
         expect( scope.isAmountValid() ).toBe( false );
         expect( scope.amountValidationMessage() ).toBe( 'here' );
 
         expect( scope.otherIsValid() ).toBe( false );

        expect( true ).toBe( true );*/

    } );

    it( 'should trigger the watch event when editing an existing line item.', function () {

    } );

    it( 'should set the date object to today when clicking the \'today\' button.', function () {

    } );

    it( 'should clear the date object when clicking the \'clear\' button.', function () {

    } );

    it( 'should set the minumum date that is selectable.', function () {

    } );

    it( 'should set the maximum date selectable.', function () {

    } );

    it( 'should open the datepicker modal.', function () {

    } );

    it( 'should set the default value for dateOptions.', function () {

    } );

    it( 'should set the default values for formats[].', function () {

    } );

    it( 'should set the default value for format.', function () {

    } );

} );
