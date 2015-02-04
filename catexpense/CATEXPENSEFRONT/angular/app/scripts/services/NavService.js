angular.module('expenseApp.Services')
    .service('NavService', function () {

    	var title;
    	return {

    		getTitle : function() {

    			return title;

    		},
    		setTitle : function(title) {

    			this.title = title;

    		}

    	};

    });