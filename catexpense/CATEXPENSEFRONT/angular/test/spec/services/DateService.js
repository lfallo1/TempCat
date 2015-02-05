'use strict';

describe( 'Service: DateService', function () {

    beforeEach( module( 'expenseApp.Services' ) );

    var DateService;
    var actualObj;

    beforeEach( inject( function ( _DateService_ ) {
        DateService = _DateService_;

    } ) );

    /*it( 'should call getDaysOfThisWeekGivenDate() and return an object containing each day of the week given any day.', function () {
        var date1 = new Date( '1-9-2015' );
        actualObj = DateService.getDaysOfThisWeekGivenDate( date1 );

        expect( actualObj.sunday ).toEqual( new Date( '1-4-2015' ) );
        expect( actualObj.monday ).toEqual( new Date( '1-5-2015' ) );
        expect( actualObj.tuesday ).toEqual( new Date( '1-6-2015' ) );
        expect( actualObj.wednesday ).toEqual( new Date( '1-7-2015' ) );
        expect( actualObj.thursday ).toEqual( new Date( '1-8-2015' ) );
        expect( actualObj.friday ).toEqual( new Date( '1-9-2015' ) );
        expect( actualObj.saturday ).toEqual( new Date( '1-10-2015' ) );

    } );*/

} );