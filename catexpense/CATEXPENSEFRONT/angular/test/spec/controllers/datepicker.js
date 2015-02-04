'use strict';

describe( 'Controller: DatepickerCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var DatepickerCtrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        DatepickerCtrl = $controller( 'DatepickerCtrl', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
