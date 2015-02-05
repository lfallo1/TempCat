'use strict';

describe( 'Service: LineItemService Getters & Setters', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var LineItemService;
    var validArray = [];
    var invalidArray = [];

    beforeEach( inject( function ( _LineItemService_ ) {
        LineItemService = _LineItemService_;

    } ) );

    //getUnderEdit
    it( 'should get the default value for \'underEdit\'.', function () {
        expect( LineItemService.getUnderEdit() ).toBe( false );
    } );

    //setUnderEdit validation
    it( 'should evaluate the input values to either true or false when using setUnderEdit().', function () {
        validArray = [true, -2, 10, 'something', 'a', 3.14, {}, []];
        invalidArray = [false, 0, '', null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setUnderEdit( validArray[i] );
            expect( LineItemService.getUnderEdit() ).toBe( true );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setUnderEdit( invalidArray[j] );
            expect( LineItemService.getUnderEdit() ).toBe( false );
        };
    } );

    //getLineItemId
    it( 'should get the default value for \'LineItemId\'.', function () {
        expect( LineItemService.getLineItemId() ).toBe( '' );
    } );

    //setLineItemId validation
    it( 'should store the correct input as the id and ignore invalid input when using setLineItemId().', function () {
        validArray = [-20, 0, 10];
        invalidArray = [true, false, '', , 'something', {}, [], null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setLineItemId( validArray[i] );
            expect( LineItemService.getLineItemId() ).toBe( validArray[i] );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setLineItemId( invalidArray[j] );
            expect( LineItemService.getLineItemId() ).toBe( '' );
        };

    } );

    //getSubmissionId 
    it( 'should get the default value for \'SubmissionId\'.', function () {
        expect( LineItemService.getSubmissionId() ).toBe( '' );
    } );

    //setSubmissionId  validation
    it( 'should store the correct input as the id and ignore invalid input when using setSubmissionId().', function () {
        validArray = [-20, 0, 10];
        invalidArray = [true, false, '', , 'something', {}, [], null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setSubmissionId( validArray[i] );
            expect( LineItemService.getSubmissionId() ).toBe( validArray[i] );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setSubmissionId( invalidArray[j] );
            expect( LineItemService.getSubmissionId() ).toBe( '' );
        };

    } );

    //getBillable 
    it( 'should get the default value for \'billable\'.', function () {
        expect( LineItemService.getBillable() ).toBe( false );
    } );

    //setBillable validation
    it( 'should evaluate the input values to either true or false when using setBillable().', function () {
        validArray = [true, -2, 10, 'something', 'a', 3.14, {}, []];
        invalidArray = [false, 0, '', null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setBillable( validArray[i] );
            expect( LineItemService.getBillable() ).toBe( true );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setBillable( invalidArray[j] );
            expect( LineItemService.getBillable() ).toBe( false );
        };
    } );

    //getExpenseCategoryId  
    it( 'should get the default value for \'ExpenseCategoryId\'.', function () {
        expect( LineItemService.getExpenseCategoryId() ).toBe( 1 );
    } );

    //setExpenseCategoryId validation
    it( 'should store the correct input as the id and ignore invalid input when using setExpenseCategoryId().', function () {
        validArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        invalidArray = [-1, 0, 10, true, false, '', {}, [], null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setExpenseCategoryId( validArray[i] );
            expect( LineItemService.getExpenseCategoryId() ).toBe( validArray[i] );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setExpenseCategoryId( invalidArray[j] );
            expect( LineItemService.getExpenseCategoryId() ).toBe( 0 );
        };

    } );

    //getLineItemDate
    it( 'should get the default value for \'LineItemDate\'.', function () {
        expect( LineItemService.getLineItemDate() ).toBe( '' );
    } );

    //setLineItemDate validation
    it( 'should store the correct input as the id and ignore invalid input when using setLineItemDate ().', function () {
        validArray = [new Date(), 0, -20000, 200000000, true, false, null];
        invalidArray = [new Date( 'thing' ), '', 'something', {}, [], undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setLineItemDate( validArray[i] );
            expect( LineItemService.getLineItemDate() ).toEqual( new Date( validArray[i] ) );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setLineItemDate( invalidArray[j] );
            expect( LineItemService.getLineItemDate() ).toBe( '' );
        };
    } );

    //getLineItemDesc
    it( 'should get the default value for \'LineItemDesc\'.', function () {
        expect( LineItemService.getLineItemDesc() ).toBe( '' );
    } );

    //setLineItemDesc validation
    it( 'should store the correct input as the id and ignore invalid input when using setLineItemDesc().', function () {
        validArray = [new Date(), 0, -20000, 200000000, 3.14, '', 'something', {}, [], true, false, null, undefined];
        invalidArray = [];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setLineItemDesc( validArray[i] );
            expect( LineItemService.getLineItemDesc() ).toEqual( validArray[i] );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setLineItemDesc( invalidArray[j] );
            expect( LineItemService.getLineItemDesc() ).toBe( '' );
        };
    } );

    //getLineItemAmount
    it( 'should get the default value for \'LineItemAmount\'.', function () {
        expect( LineItemService.getLineItemAmount() ).toBe( 0 );
    } );

    //setLineItemAmount validation
    it( 'should store the correct input as the id and ignore invalid input when using setLineItemAmount().', function () {
        validArray = [0, 200000000, 3.14];
        invalidArray = [new Date(), -20000, '', 'something', {}, [], true, false, null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setLineItemAmount( validArray[i] );
            expect( LineItemService.getLineItemAmount() ).toEqual( validArray[i] );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setLineItemAmount( invalidArray[j] );
            expect( LineItemService.getLineItemAmount() ).toBe( 0 );
        };
    } );

    //getLineItemMetadata 
    it( 'should get the default value for \'LineItemMetadata \'.', function () {
        var meta = 'Miles:0,Origin:,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        expect( LineItemService.getLineItemMetadata() ).toBe( meta );
    } );

    //getReceiptPresent 
    it( 'should get the default value for \'LineItemAmount\'.', function () {
        expect( LineItemService.getReceiptPresent() ).toBe( 0 );
    } );

    //setReceiptPresent validation
    it( 'should store the correct input as the id and ignore invalid input when using setReceiptPresent ().', function () {
        validArray = [true, -2, 10, 'something', 'a', 3.14, {}, []];
        invalidArray = [false, 0, '', null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setReceiptPresent( validArray[i] );
            expect( LineItemService.getReceiptPresent() ).toBe( true );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setReceiptPresent( invalidArray[j] );
            expect( LineItemService.getReceiptPresent() ).toBe( false );
        };
    } );

    //getStatusId 
    it( 'should get the default value for \'StatusId\'.', function () {
        expect( LineItemService.getStatusId() ).toBe( 1 );
    } );

    //setStatusId validation
    it( 'should store the correct input as the id and ignore invalid input when using setStatusId ().', function () {
        validArray = [0, 1, 2, 3, 4, 5, 6];
        invalidArray = [new Date(), -20000, 500, 3.14, '', 'something', {}, [], true, false, null, undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setStatusId( validArray[i] );
            expect( LineItemService.getStatusId() ).toEqual( validArray[i] );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setStatusId( invalidArray[j] );
            expect( LineItemService.getStatusId() ).toBe( 0 );
        };
    } );

    //getManagerApproverDate 
    it( 'should get the default value for \'ManagerApproverDate \'.', function () {
        expect( LineItemService.getManagerApproverDate() ).toBe( null );
    } );

    //setManagerApproverDate validation
    it( 'should store the correct input as the id and ignore invalid input when using setManagerApproverDate().', function () {
        validArray = [new Date(), 0, -20000, 200000000, true, false, null];
        invalidArray = [new Date( 'thing' ), '', 'something', {}, [], undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setManagerApproverDate( validArray[i] );
            expect( LineItemService.getManagerApproverDate() ).toEqual( new Date( validArray[i] ) );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setManagerApproverDate( invalidArray[j] );
            expect( LineItemService.getManagerApproverDate() ).toBe( null );
        };
    } );

    //getFinanceApproverDate  
    it( 'should get the default value for \'FinanceApproverDate  \'.', function () {
        expect( LineItemService.getFinanceApproverDate() ).toBe( null );
    } );

    //setFinanceApproverDate  validation
    it( 'should store the correct input as the id and ignore invalid input when using setFinanceApproverDate().', function () {
        validArray = [new Date(), 0, -20000, 200000000, true, false, null];
        invalidArray = [new Date( 'thing' ), '', 'something', {}, [], undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setFinanceApproverDate( validArray[i] );
            expect( LineItemService.getFinanceApproverDate() ).toEqual( new Date( validArray[i] ) );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setFinanceApproverDate( invalidArray[j] );
            expect( LineItemService.getFinanceApproverDate() ).toBe( null );
        };
    } );

    //getExpenseCategoryName   
    it( 'should get the default value for \'expenseCategoryName  \'.', function () {
        expect( LineItemService.getExpenseCategoryName() ).toBe( 'Mileage' );
    } );

    //setFinanceApproverDate validation
    it( 'should store the correct input as the id and ignore invalid input when using setExpenseCategoryName().', function () {
        validArray = ['Mileage', 'Per Diem', 'Transportation', 'Lodging', 'Parking', 'Entertainment', 'Meals', 'Airfare', 'Other'];
        invalidArray = [new Date(), 0, -20000, 200000000, true, false, null, new Date( 'thing' ), '', 'something', {}, [], undefined];

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setExpenseCategoryName( validArray[i] );
            expect( LineItemService.getExpenseCategoryName() ).toBe( validArray[i] );
            expect( LineItemService.getExpenseCategoryId() ).toBe( i + 1 );
        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setExpenseCategoryName( invalidArray[j] );
            expect( LineItemService.getExpenseCategoryName() ).toBe( '' );
            expect( LineItemService.getExpenseCategoryId() ).toBe( 0 );
        };
    } );

    //getEndingWeek 
    it( 'should get the default value for \'endingWeek \'.', function () {
        expect( LineItemService.getEndingWeek() ).toBe( '' );
    } );

    //setEndingWeek validation
    it( 'should store the correct input as the id and ignore invalid input when using setEndingWeek().', function () {
        validArray = [new Date(), 0, -20000, 200000000, true, false, null];
        invalidArray = [new Date( 'thing' ), '', 'something', {}, [], undefined];

        var daysObj = {};
        var result = {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        };

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setEndingWeek( validArray[i] );
            daysObj = LineItemService.getDaysString();

            //check to see if daysString contains valid date objects
            result.sunday = daysObj.sunday instanceof Date && !isNaN( daysObj.sunday.valueOf() );
            result.monday = daysObj.monday instanceof Date && !isNaN( daysObj.monday.valueOf() );
            result.tuesday = daysObj.tuesday instanceof Date && !isNaN( daysObj.tuesday.valueOf() );
            result.wednesday = daysObj.wednesday instanceof Date && !isNaN( daysObj.wednesday.valueOf() );
            result.thursday = daysObj.thursday instanceof Date && !isNaN( daysObj.thursday.valueOf() );
            result.friday = daysObj.friday instanceof Date && !isNaN( daysObj.friday.valueOf() );
            result.saturday = daysObj.saturday instanceof Date && !isNaN( daysObj.saturday.valueOf() );

            //actual tests
            expect( LineItemService.getEndingWeek() ).toEqual( new Date( validArray[i] ) );
            expect( result.sunday ).toBe( true );
            expect( result.monday ).toBe( true );
            expect( result.tuesday ).toBe( true );
            expect( result.wednesday ).toBe( true );
            expect( result.thursday ).toBe( true );
            expect( result.friday ).toBe( true );
            expect( result.saturday ).toBe( true );
            expect( LineItemService.getLineItemDate() ).toEqual( LineItemService.getEndingWeek() );

        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setEndingWeek( invalidArray[j] );
            daysObj = LineItemService.getDaysString();

            expect( LineItemService.getEndingWeek() ).toEqual( '' );
            expect( daysObj.sunday ).toBe( '' );
            expect( daysObj.monday ).toBe( '' );
            expect( daysObj.tuesday ).toBe( '' );
            expect( daysObj.wednesday ).toBe( '' );
            expect( daysObj.thursday ).toBe( '' );
            expect( daysObj.friday ).toBe( '' );
            expect( daysObj.saturday ).toBe( '' );
            expect( LineItemService.getLineItemDate() ).toEqual( '' );
        };
    } );

    //getOrigin 
    it( 'should get the default value for \'origin \'.', function () {
        expect( LineItemService.getOrigin() ).toBe( '' );
    } );

    //setOrigin validation
    it( 'should store the correct input as the id and ignore invalid input when using setOrigin ().', function () {
        validArray = [0, -20000, 200000000, 3.14, '', 'something', {}, [], true, false, null, undefined];
        invalidArray = [];

        var metadataResult = '';

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setOrigin( validArray[i] );

            metadataResult = 'Miles:0,Origin:' + validArray[i] + ',Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
            expect( LineItemService.getOrigin() ).toEqual( '' + validArray[i] );

            expect( LineItemService.getLineItemMetadata() ).toBe( metadataResult );

        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setOrigin( invalidArray[j] );
            expect( LineItemService.getOrigin() ).toBe( '' );
        };
    } );

    //getDestination  
    it( 'should get the default value for \'destination  \'.', function () {
        expect( LineItemService.getDestination() ).toBe( '' );
    } );

    //setDestination  validation
    it( 'should store the correct input as the id and ignore invalid input when using setDestination  ().', function () {
        validArray = [0, -20000, 200000000, 3.14, '', 'something', {}, [], true, false, null, undefined];
        invalidArray = [];

        var metadataResult = '';

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setDestination( validArray[i] );

            metadataResult = 'Miles:0,Origin:,Destination:' + validArray[i] + ',Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
            expect( LineItemService.getDestination() ).toEqual( '' + validArray[i] );

            expect( LineItemService.getLineItemMetadata() ).toBe( metadataResult );

        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setDestination( invalidArray[j] );
            expect( LineItemService.getDestination() ).toBe( '' );
        };
    } );

    //getMiles   
    it( 'should get the default value for \'miles\'.', function () {
        expect( LineItemService.getMiles() ).toBe( 0 );
    } );

    //setMiles validation
    it( 'should store the correct input as the id and ignore invalid input when using setMiles().', function () {
        validArray = [0, 200000000, 3.14];
        invalidArray = [-20000, '', 'something', {}, [], true, false, null, undefined];

        var metadataResult = '';

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setMiles( validArray[i] );
            metadataResult = 'Miles:' + validArray[i] + ',Origin:,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
            expect( LineItemService.getMiles() ).toEqual( validArray[i] );
            expect( LineItemService.getLineItemMetadata() ).toBe( metadataResult );

        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setMiles( invalidArray[j] );
            metadataResult = 'Miles:0,Origin:,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
            expect( LineItemService.getMiles() ).toBe( 0 );
            expect( LineItemService.getLineItemMetadata() ).toBe( metadataResult );
        };
    } );

    //getDays    
    it( 'should get the default value for \'days \'.', function () {
        var days = {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        };
        expect( LineItemService.getDays() ).toEqual( days );
    } );

    //setDays validation
    it( 'should store the correct input as the id and ignore invalid input when using setDays ().', function () {
        validArray = [{
            sunday: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true
        }, {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        }
        ];
        invalidArray = [-20000, '', 'something', {}, [], true, false, null, undefined, {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        }];

        var metadataResult = '';
        var days = {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false
        };

        for ( var i = 0; i < validArray.length; i++ ) {
            LineItemService.setDays( validArray[i] );
            metadataResult = 'Miles:0,Origin:,Destination:,Sunday:' + validArray[i].sunday +
                ',Monday:' + validArray[i].monday + ',Tuesday:' + validArray[i].tuesday +
                ',Wednesday:' + validArray[i].wednesday + ',Thursday:' + validArray[i].thursday +
                ',Friday:' + validArray[i].friday + ',Saturday:' + validArray[i].saturday;

            expect( LineItemService.getDays() ).toEqual( validArray[i] );
            expect( LineItemService.getLineItemMetadata() ).toBe( metadataResult );

        };

        for ( var j = 0; j < invalidArray.length; j++ ) {
            LineItemService.setDays( invalidArray[j] );
            metadataResult = 'Miles:0,Origin:,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
            expect( LineItemService.getDays() ).toEqual( days );
            expect( LineItemService.getLineItemMetadata() ).toBe( metadataResult );
        };
    } );

    //getDaysString    
    it( 'should get the default value for \'daysString \'.', function () {
        var daysStr = {
            sunday: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: ''
        }
        expect( LineItemService.getDaysString() ).toEqual( daysStr );
    } );


    //getLineItem
    it( 'should get the default value for \'lineItem \'.', function () {
        var lineItem = {
            LineItemId: '',
            SubmissionId: '',
            Billable: false,
            ExpenseCategoryId: 1,
            LineItemDate: '',
            LineItemDesc: '',
            LineItemAmount: 0,
            LineItemMetadata: 'Miles:0,Origin:,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false',
            ReceiptPresent: 0,
            StatusId: 1,
            ManagerApproverDate: null,
            FinanceApproverDate: null
        };
        expect( LineItemService.getLineItem() ).toEqual( lineItem );
    } );

    //setLineItem validation
    it( 'should store the correct input as the id and ignore invalid input when using setlineItem().', function () {
        //add in validation for setLineItem()
    } );

    //getExtraData 
    it( 'should get the default value for \'lineItem \'.', function () {
        var extraData = {
            expenseCategoryName: 'Mileage',
            endingWeek: '',
            origin: '',
            destination: '',
            miles: 0,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            daysString: {
                sunday: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                saturday: ''
            }
        };
        expect( LineItemService.getExtraData() ).toEqual( extraData );
    } );

} );

describe( 'Service: LineItemService Specialized Methods', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var LineItemService;

    beforeEach( inject( function ( _LineItemService_ ) {
        LineItemService = _LineItemService_;

    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );

describe( 'Service: LineItemService Http calls', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var LineItemService;
    var $httpBackend;

    beforeEach( inject( function ( _LineItemService_, _$httpBackend_ ) {
        LineItemService = _LineItemService_;
        $httpBackend = _$httpBackend_;

    } ) );

    afterEach( function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );