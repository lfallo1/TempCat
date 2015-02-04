'use strict';

describe( 'Controller: submissionTableCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var submissionTableCtrl;
    var scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        submissionTableCtrl = $controller( 'submissionTableCtrl', {
            $scope: scope
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
