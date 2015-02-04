'use strict';

describe( 'Controller: PerDiemCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var PerDiemCtrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        PerDiemCtrl = $controller( 'PerDiemCtrl', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );
