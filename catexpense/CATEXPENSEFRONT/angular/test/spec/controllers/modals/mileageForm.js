'use strict';

describe( 'Controller: MileageCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var MileageCtrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        MileageCtrl = $controller( 'MileageCtrl', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );

} );
