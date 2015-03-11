angular.module( 'expenseApp' )
    .directive(
    'submissionTable',
    [
        function () {
            return {
                restrict: 'E',
                templateUrl: 'Views/Home/views/submissionTable.html',
                controller: 'submissionTableCtrl',
                controllerAs: 'table'
            }
        }
    ] );