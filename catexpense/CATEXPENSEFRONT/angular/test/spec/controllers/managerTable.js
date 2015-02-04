'use strict';

describe( 'Controller: ManagerTableController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var ManagerTableController;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        ManagerTableController = $controller( 'ManagerTableController', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
