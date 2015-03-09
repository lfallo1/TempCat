'use strict';

//testing all the functionality except scope.policyIs
describe( 'Controller: PolicyCtrl', function () {

    var PolicyCtrl;
    var scope;
    var ExpenseCategory, getAllExpenseCategoriesDeferred;

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

    var mockSelectedType = 'something';

    //mocking the promise
    var mockPromise = {
        resolve: function ( success, error ) {
            if ( success ) {
                return this.success( success );
            } else {
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

    // load the controller's module
    beforeEach( module( 'expenseApp.Controllers' ) );

    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $controller, $rootScope, $q ) {

        ExpenseCategory = {
            getAllExpenseCategories: function () {
                getAllExpenseCategoriesDeferred = $q.defer();
                return getAllExpenseCategoriesDeferred.promise;
            },
        };

        scope = $rootScope.$new();

        PolicyCtrl = $controller( 'PolicyCtrl', {
            $scope: scope,
            $modalInstance: mockModalInstance,
            selectedType: mockSelectedType,
            ExpenseCategory: ExpenseCategory
        } );

        spyOn( scope, 'getExpenseCategories' );

    } ) );

    it( 'should set policyType equal to selectedType as the default.', function () {
        expect( scope.policyType ).toBe( mockSelectedType );
    } );

    it( 'should get the default values for scope.policyIs.', function () {
        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: true,
            error: false
        };
        expect( scope.policyIs ).toEqual( expected );
    } );

    it( 'should get the list of all expense categories (success) and display the Mileage Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: true,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Mileage';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Per Diem Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: true,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Per Diem';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Transportation Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: true,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Transportation';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Lodging Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: true,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Lodging';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Parking Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: true,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Parking';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Entertainment Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: true,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Entertainment';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Meals Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: true,
            airfare: false,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Meals';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Airfare Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: true,
            other: false,
            loading: false,
            error: false
        };

        scope.policyType = 'Airfare';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the Other Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: true,
            loading: false,
            error: false
        };

        scope.policyType = 'Other';

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (success) and display the error Policy.', function () {
        var successObj = {
            data: [
                { "ExpenseCategoryName": "Mileage" },
                { "ExpenseCategoryName": "Per Diem" },
                { "ExpenseCategoryName": "Transportation" },
                { "ExpenseCategoryName": "Lodging" },
                { "ExpenseCategoryName": "Parking" },
                { "ExpenseCategoryName": "Entertainment" },
                { "ExpenseCategoryName": "Meals" },
                { "ExpenseCategoryName": "Airfare" },
                { "ExpenseCategoryName": "Other" }
            ]
        };

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: true
        };

        scope.policyType = null;

        getAllExpenseCategoriesDeferred.resolve( successObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should get the list of all expense categories (error) and display the error Policy.', function () {
        var errorObj = {};

        var expected = {
            mileage: false,
            perdiem: false,
            transportation: false,
            lodging: false,
            parking: false,
            entertainment: false,
            meals: false,
            airfare: false,
            other: false,
            loading: false,
            error: true
        };

        scope.policyType = 'This can be anything';

        getAllExpenseCategoriesDeferred.reject( errorObj );

        scope.$digest();
        scope.getExpenseCategories();

        expect( scope.policyIs ).toEqual( expected );

    } );

    it( 'should dismiss the modal.', function () {
        spyOn( mockModalInstance, 'dismiss' );
        scope.ok();
        expect( mockModalInstance.dismiss ).toHaveBeenCalledWith( 'Form was cancelled.' );
    } );

} );