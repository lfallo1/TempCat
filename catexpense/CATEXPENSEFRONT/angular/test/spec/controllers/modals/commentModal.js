﻿'use strict';

describe( 'Controller: CommentController', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var CommentController;
    var scope;

    //Mock $modalInstance
    var mockModalInstance = {
        close: function ( successMessage ) {
            this.result = successMessage;
        },
        dismiss: function ( failureMessage ) {
            this.result = failureMessage;
        },
        result: null
    };

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();

        CommentController = $controller( 'FormDetailsCtrl', {
            $scope: scope,
            $modalInstance: mockModalInstance
        } );
    } ) );

    it( 'should run a dummy test ( true === true ).', function () {
        expect( true ).toBe( true );
    } );


} );
