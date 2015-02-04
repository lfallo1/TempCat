'use strict';

describe( 'Controller: NavController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var NavController;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        NavController = $controller( 'NavController', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
