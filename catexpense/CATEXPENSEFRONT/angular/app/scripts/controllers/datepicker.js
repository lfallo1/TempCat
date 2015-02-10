'use strict';

angular.module( 'expenseApp.Controllers' )
    .controller('DatepickerCtrl', ["$scope", function ($scope) {
        
        /**
        * the current day's date
        */
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        /**
        * clear the selected date field
        */
        $scope.clear = function () {
            $scope.dt = null;
        };

        /**
        * Disable weekend selection
        */
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && !(date.getDay() === 6));
        };

        /**
        * Insert the date object string into the text attribute of the html
        */
        $scope.formatDate = function () {
            var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
            //null check
            if ($scope.dt1 instanceof Date && !isNaN($scope.dt1.valueOf())) {
                var dateString = ('0' + $scope.dt1.getDate()).slice(-2) + '-' + monthNames[$scope.dt1.getMonth()] + '-' + $scope.dt1.getFullYear();
                return dateString;
            };
        };

        /**
        * users can only submit expense items from 30 days 
        * into the past at maximum
        */
        $scope.toggleMin = function () {
            var date = new Date();
            $scope.minDate = date.setDate((new Date()).getDate() - 30);
        };
        $scope.toggleMin();

        /**
        * open the datepicker calendar view
        */
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        /**
        * display format of selected date
        */
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

    }]);