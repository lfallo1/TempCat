'use strict';

describe( 'Controller: EmployeeTableController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var EmployeeTableController;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        EmployeeTableController = $controller( 'EmployeeTableController', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
