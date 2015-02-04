'use strict';

describe( 'Controller: SubmissionCtrl', function () {

    beforeEach( module( 'expenseApp' ) );

    var SubmissionCtrl, scope, element, testBool = false;

    beforeEach( inject( function ( $controller, $rootScope ) {
        scope = $rootScope.$new();
        SubmissionCtrl = $controller( 'SubmissionCtrl', {
            $scope: scope,
            deleteSubmission: function ( value ) {
                testBool = value;
            }
        } );

        spyOn( SubmissionCtrl, 'deleteSubmission' ).and.callThrough();
    } ) );

    /*it('should call deleteSubmission() on click', inject(function ($rootScope, $compile) {
        element = $compile('<button ng-click="deleteSubmission = true"></button>')($rootScope);
        $rootScope.$digest();
        expect($rootScope.deleteSubmission).toBeFalsy();
        browserTrigger(element, 'click');
        expect($rootScope.deleteSubmission).toEqual(true);
    }));*/

    /*it('should set testBool appropriately through deleteSubmission', function () {
        expect(testBool).toEqual(false);
        SubmissionCtrl.deleteSubmission(true);
        expect(SubmissionCtrl.deleteSubmission).toHaveBeenCalled();
        expect(testBool).toEqual(true);
    });*/
} );