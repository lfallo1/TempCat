'use strict';

describe( 'Service: ValidationService', function () {

    var ValidationService;
    var lineitemdata;
    var expected_Mileage_Result;
    var expected_PerDiem_Result;
    var expected_Other_Result
    var actual_Result;

    beforeEach( module( 'expenseApp.Services' ) );

    beforeEach( inject( function ( _ValidationService_ ) {
        ValidationService = _ValidationService_;

        //setting up default variables
        lineitemdata = {
            LineItemDate: new Date(),
            LineItemDesc: 'This is a description',
            LineItemAmount: 500,
            LineItemMetadata: 'Miles:1000,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false'
        };

        expected_Mileage_Result = {
            validInput: true,
            date: {
                valid: true,
                message: 'default message'
            },
            origin: {
                valid: true,
                message: 'default message'
            },
            destination: {
                valid: true,
                message: 'default message'
            },
            miles: {
                valid: true,
                message: 'default message'
            },
            description: {
                valid: true,
                message: 'default message'
            },
            amount: {
                valid: true,
                message: 'default message'
            }
        };

        expected_PerDiem_Result = {
            validInput: true,
            days: {
                valid: true,
                message: 'default message'
            }
        };

        expected_Other_Result = {
            validInput: true,
            date: {
                valid: true,
                message: 'default message'
            },
            description: {
                valid: true,
                message: 'default message'
            },
            amount: {
                valid: true,
                message: 'default message'
            }
        };

    } ) );

    /**
     * ValidationService.validateMileage
     * Testing a valid input.
     */
    it( 'should be able to validate a valid mileage form.', function () {
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );
    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an empty date field.
     */
    it( 'should be able to validate a mileage form with an empty date field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.date.valid = false;
        expected_Mileage_Result.date.message = 'Please provide a date.';

        lineitemdata.LineItemDate = '';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an invalid date field.
     */
    it( 'should be able to validate a mileage form with an invalid date field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.date.valid = false;
        expected_Mileage_Result.date.message = 'Invalid date.';

        lineitemdata.LineItemDate = 'This is an invalid date';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemDate = 'a';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemDate = 99;
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemDate = 100.1234;
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemDate = new Date().toString();
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemDate = null;
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemDate = undefined;
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an empty origin field.
     */
    it( 'should be able to validate a mileage form with an empty origin field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.origin.valid = false;
        expected_Mileage_Result.origin.message = 'Please input an origin.';

        lineitemdata.LineItemMetadata = 'Miles:1000,Origin:,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false'
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an empty destination field.
     */
    it( 'should be able to validate a mileage form with an empty destination field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.destination.valid = false;
        expected_Mileage_Result.destination.message = 'Please input a destination.';

        lineitemdata.LineItemMetadata = 'Miles:1000,Origin:City1,Destination:,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false'
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an invalid miles field.
     */
    it( 'should be able to validate a mileage form with an invalid miles field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.miles.valid = false;
        expected_Mileage_Result.miles.message = 'Please input a valid distance.';

        lineitemdata.LineItemMetadata = 'Miles:,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemMetadata = 'Miles:-2,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemMetadata = 'Miles:thing,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemMetadata = 'Miles:a,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemMetadata = 'Miles:null,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an empty description field.
     */
    it( 'should be able to validate a mileage form with an empty description field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.description.valid = false;
        expected_Mileage_Result.description.message = 'Please input a description.';

        lineitemdata.LineItemDesc = '';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validateMileage
     * Testing an invalid form.
     * Passing in an invalid amount field.
     */
    it( 'should be able to validate a mileage form with an invalid amount field.', function () {
        expected_Mileage_Result.validInput = false;
        expected_Mileage_Result.amount.valid = false;
        expected_Mileage_Result.amount.message = 'Please input a valid amount.';

        lineitemdata.LineItemAmount = '';
        actual_Result = ValidationService.validateMileage( lineitemdata );
        expect( actual_Result ).toEqual( expected_Mileage_Result );

    } );

    /**
     * ValidationService.validatePerDiem
     * Testing a valid form.
     */
    it( 'should be able to validate a valid per diem form.', function () {
        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:true,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:true,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:true,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:true,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:true,Friday:false,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:true,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:true';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

    } );

    /**
    * ValidationService.validatePerDiem
    * Testing an invalid form.
    * Did not select any day of the week.
    */
    it( 'should be able to validate an invalid per diem form.', function () {
        expected_PerDiem_Result.validInput = false;
        expected_PerDiem_Result.days.valid = false;
        expected_PerDiem_Result.days.message = 'Please select at least one day.';

        lineitemdata.LineItemMetadata = 'Miles:undefined,Origin:City1,Destination:City2,Sunday:false,Monday:false,Tuesday:false,Wednesday:false,Thursday:false,Friday:false,Saturday:false';
        actual_Result = ValidationService.validatePerDiem( lineitemdata );
        expect( actual_Result ).toEqual( expected_PerDiem_Result );

    } );

    /**
     * ValidationService.validateOther
     * Testing a valid form.
     */
    it( 'should be able to validate a valid other form.', function () {
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

    } );

    /**
     * ValidationService.validateOther
     * Testing an invalid form.
     * Passing in an empty date field.
     */
    it( 'should be able to validate an other form with an empty date field.', function () {
        expected_Other_Result.validInput = false;
        expected_Other_Result.date.valid = false;
        expected_Other_Result.date.message = 'Please provide a date.';

        lineitemdata.LineItemDate = '';
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

    } );

    /**
     * ValidationService.validateOther
     * Testing an invalid form.
     * Passing in an invalid date field.
     */
    it( 'should be able to validate a other form with an invalid date field.', function () {
        expected_Other_Result.validInput = false;
        expected_Other_Result.date.valid = false;
        expected_Other_Result.date.message = 'Invalid date.';

        lineitemdata.LineItemDate = 'This is an invalid date';
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

        lineitemdata.LineItemDate = 'a';
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

        lineitemdata.LineItemDate = 99;
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

        lineitemdata.LineItemDate = 100.1234;
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

        lineitemdata.LineItemDate = new Date().toString();
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

        lineitemdata.LineItemDate = null;
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

        lineitemdata.LineItemDate = undefined;
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

    } );

    /**
     * ValidationService.validateOther
     * Testing an invalid form.
     * Passing in an empty description field.
     */
    it( 'should be able to validate an other form with an empty description field.', function () {
        expected_Other_Result.validInput = false;
        expected_Other_Result.description.valid = false;
        expected_Other_Result.description.message = 'Please input a description.';

        lineitemdata.LineItemDesc = '';
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

    } );

    /**
     * ValidationService.validateOther
     * Testing an invalid form.
     * Passing in an invalid amount field.
     */
    it( 'should be able to validate an other form with an invalid amount field.', function () {
        expected_Other_Result.validInput = false;
        expected_Other_Result.amount.valid = false;
        expected_Other_Result.amount.message = 'Please input a valid amount.';

        lineitemdata.LineItemAmount = '';
        actual_Result = ValidationService.validateOther( lineitemdata );
        expect( actual_Result ).toEqual( expected_Other_Result );

    } );



} );