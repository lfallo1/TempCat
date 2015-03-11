'use strict';

//To use, inject 'Constants' into a controller/serverice/wherever you want and refernce by calling Constants.ONE or Constants.TWO

angular.module( 'expenseApp.Constants' )
    .constant(
    'Constants',
    {
        'ONE': 'one',
        'TWO': 'two'
    } );