angular.module( 'expenseApp.Services' )
    .service(
    'NavService',
    [
        function (
            ) {

            var self = this;
            var title;

            self.getTitle = function () {
                return title;
            };

            self.setTitle = function ( newTitle ) {
                title = newTitle;
            };

        }
    ] );