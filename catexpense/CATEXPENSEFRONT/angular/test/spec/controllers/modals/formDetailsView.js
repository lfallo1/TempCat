'use strict';

describe( 'Controller: FormDetailsCtrl', function () {

    // load the controller's module
    beforeEach( module( 'expenseApp' ) );

    var FormDetailsCtrl;
    var scope;

    //Mock promise implementation
    var fakePromise = {
        resolve: function ( success, error ) {
            if ( success ) {
                return this.success( success );
            }
            else {
                return this.error( error );
            }
        },
        then: function ( success, error ) {
            this.success = success;
            this.error = error;
        },
        success: function () {
            return "No success callback registered!";
        },
        error: function () {
            return "No error callback registered!";
        }
    };

    //Mock $modal
    var mockModal = {
        result: fakePromise
    };

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
    beforeEach( inject( function ( $controller, $rootScope, $modal ) {
        spyOn( $modal, 'open' ).and.returnValue( mockModal );
        scope = $rootScope.$new();
        FormDetailsCtrl = $controller( 'FormDetailsCtrl', {
            $scope: scope,
            $modal: $modal,
            $modalInstance: mockModalInstance
        } );
    } ) );

    it( 'should say that the default value for divShow is false.', function () {
        expect( scope.divShow ).toBe( false );
    } );

    it( 'should return true when scope.selectedType === \'Mileage\'', function () {
        scope.selectedType = 'Mileage';
        expect( scope.displayMileageForm() ).toBe( true );
    } );

} );
