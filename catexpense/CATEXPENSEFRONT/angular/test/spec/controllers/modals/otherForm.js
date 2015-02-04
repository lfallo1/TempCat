'use strict';

describe( 'Controller: OtherCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var OtherCtrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        OtherCtrl = $controller( 'OtherCtrl', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );
