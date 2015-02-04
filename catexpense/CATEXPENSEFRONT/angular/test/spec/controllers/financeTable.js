'use strict';

describe( 'Controller: FinanceTableController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var FinanceTableController;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        FinanceTableController = $controller( 'FinanceTableController', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
