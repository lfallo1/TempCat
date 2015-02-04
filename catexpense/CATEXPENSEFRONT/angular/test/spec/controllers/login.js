'use strict';

describe( 'Controller: LoginController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var LoginController;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        LoginController = $controller( 'LoginController', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
