'use strict';

describe( 'Controller: HomeController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var HomeController,
      scope;

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();
        HomeController = $controller( 'HomeController', {
            $scope: scope
        } );
    } ) );

    it( 'should say that true == true. (this is a dummy test)', function () {
        expect( scope.title ).toBe( 'Home' );
    } );

} );
