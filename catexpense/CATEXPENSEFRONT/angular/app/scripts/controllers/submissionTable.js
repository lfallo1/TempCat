'use strict';

angular.module( 'expenseApp.Controllers' )
    .controller(
    'submissionTableCtrl',
    [
        "$window",
        "$scope",
        "$route",
        "$modal",
        "$location",
        "$rootScope",
        "$filter",
        "Cache",
        "ReceiptService",
        "LineItemService",
        "MessageService",
        "CommentService",
        "SubmissionService",
        "Authentication",
        function (
            $window,
            $scope,
            $route,
            $modal,
            $location,
            $rootScope,
            $filter,
            Cache,
            ReceiptService,
            LineItemService,
            MessageService,
            CommentService,
            SubmissionService,
            Authentication
            ) {

            $scope.receipts = true;
            var orderBy = $filter( 'orderBy' );
            var sortColumn = { field: 'DateCreated', reverse: false };

            /**
            * enable sorting for each column in the submissionTable
            */
            $scope.submissionOrder = function ( field ) {
                if ( field === sortColumn.field )
                {
                    sortColumn.reverse = !sortColumn.reverse;
                    $scope.currentSubmission.LineItems = orderBy( $scope.currentSubmission.LineItems, sortColumn.field, sortColumn.reverse );
                } else
                {
                    sortColumn.field = field;
                    sortColumn.reverse = false;
                    $scope.currentSubmission.LineItems = orderBy( $scope.currentSubmission.LineItems, sortColumn.field, sortColumn.reverse );
                };
            };

            /**
            * when a submission is found by a week ending date and a client then run this function
            * recieves the broadcast message from submission.js clientAndDate function
            */
            $scope.$on( 'submissionFound', function ( message, submission ) {
                ReceiptService.setAllReceipts( [] )
                //when the orgin is employee table the submission cannot be approved or rejected
                Cache.setOrigin( "EmployeeTable" );
                // get username
                $scope.Username = Authentication.getUserName();
                //if the submission is valid set the submission in the Cache service
                if ( submission )
                {
                    $rootScope.$broadcast( "checkReceipts" );
                    $scope.currentDescription = submission.Description;
                    $scope.createNewItemLoad = submission.StatusId == 1 || submission.StatusId == 4 || submission.StatusId == 6;
                    //set the current submission being editted
                    $scope.currentSubmission = submission;
                    $scope.isApprover = false;
                    // if there are line items show comment functionality
                    $scope.showComments = submission.LineItems.length != 0;
                    if ( $scope.currentSubmission.LineItems.length != 0 )
                    {
                        //this for loop will determine which comments you can edit
                        for ( var i = 0; i < $scope.currentSubmission.Comments.length; i++ )
                        {
                            if ( $scope.currentSubmission.Comments[i].RepliconUserName.toUpperCase() == $scope.Username.toUpperCase() )
                            {
                                $scope.currentSubmission.Comments[i]["commentIsMine"] = true;
                            } else
                            {
                                $scope.currentSubmission.Comments[i]["commentIsMine"] = false;
                            }
                        }
                    }
                }
            } );

            /**
            * recieves broadcast message from MessageService confirming
            * that user would like to delete selected line item
            */
            $scope.$on( "confirmDeleteLineItem", function () {
                MessageService.setMessage( "" );
                MessageService.setBroadCastMessage( "" );
                // getId is the line item id set when the delete button is clicked
                LineItemService.deleteLineItem( MessageService.getId() ).then( function ( success ) {
                    $scope.currentSubmission.LineItems.splice( MessageService.getIndex(), 1 );
                    $scope.showComments = $scope.currentSubmission.LineItems.length != 0;
                    //after deleting a line item this loop will recalculate the total
                    var submissionTotalAmount = 0;
                    var userSubmissions = Cache.getAllUserSubmissions();
                    for ( var i = 0; i < userSubmissions[Cache.getSubmissionIndex()].LineItems.length; i++ )
                    {
                        submissionTotalAmount += userSubmissions[Cache.getSubmissionIndex()].LineItems[i].LineItemAmount;
                    }
                    // set the new submission total
                    userSubmissions[Cache.getSubmissionIndex()].TotalAmount = submissionTotalAmount;
                    Cache.setSubmissionStatus( userSubmissions );
                }, function ( error ) {
                    console.log( error );
                } );

            } );

            /** 
            * when user chooses to delete a line item in a submission,
            * pop up a confirmation modal before the item is actually deleted
            */
            $scope.confirmLineRemove = function ( expense, index ) {
                // set the message for the confirm message
                MessageService.setMessage( 'Are you sure you want to delete this line item? NOTE: Any attached receipts will be permanently delete.' );
                MessageService.setBroadCastMessage( "confirmDeleteLineItem" );
                MessageService.setId( expense.LineItemId );
                MessageService.setIndex( index );
                var modalInstance = $modal.open( {
                    templateUrl: 'Views/Home/views/modals/confirmModal.html',
                    controller: 'confirmModalController'
                } );
            };

            /**
            * is the current user a manager or finance approver?
            */
            $scope.isApprover = false;

            /**
            * boolean value set upon page load 
            * variable used as validation on submissionTable.html page
            */
            $scope.createNewItemLoad = Cache.getSubmissionStatus() == 1 || Cache.getSubmissionStatus() == 4 || Cache.getSubmissionStatus() == 6;
            var receipts;

            /**
            * sets the boolean value $scope.isApprover upon page load
            */
            if ( Cache.getOrigin() !== "EmployeeTable" )
            {
                if ( Authentication.getIsManager || Authentication.getIsFinanceApprover )
                {
                    $scope.isApprover = true;
                } else
                {
                    $scope.isApprover = false;
                }
            }

            /**
            * pulls current user name from session
            */
            $scope.Username = Authentication.getUserName();


            /**
            * receives broadcast message from submission.js editComment function
            */
            var commentIndex;
            $scope.$on( "editCommentFromSubmission", function ( response, index ) {
                if ( index != -1 )
                {
                    commentIndex = index;
                    Cache.setComment( $scope.currentSubmission.Comments[index] );
                } else
                {
                    Cache.setComment("");
                }
                var modalInstance = $modal.open( {
                    templateUrl: 'Views/Home/views/modals/commentModal.html',
                    controller: 'CommentController'
                } );
            } );

            /**
            * when editing the comment the index will be -1 otherwise it assumes you are creating a new comment
            */
            $scope.editComment = function ( index ) {
                if ( index != -1 )
                {
                    Cache.setIsNewComment( false );
                    if ( $scope.currentSubmission.Comments[index].commentIsMine )
                    {
                        commentIndex = index;
                        Cache.setComment( $scope.currentSubmission.Comments[index] );
                        Cache.setCommentIndex( index );
                    } else
                    {
                        return;
                    }
                } else
                {
                    Cache.setIsNewComment( true );
                    Cache.setComment( "" );
                }
                var modalInstance = $modal.open( {
                    templateUrl: 'Views/Home/views/modals/commentModal.html',
                    controller: 'CommentController'
                } );
            }

            /**
            * when this is called the receipt passed in is added to the cache
            */
            $scope.$on( "addNewReceipt", function ( message, receipt ) {
                var submissions = Cache.getAllUserSubmissions();
                var allReceipt = ReceiptService.getAllReceipts();
                allReceipt.push( receipt );
                ReceiptService.setAllReceipts( allReceipt );
                submissions[Cache.getSubmissionIndex()].allSubmissionReceipts = allReceipt;
                submissions[Cache.getSubmissionIndex()].ReceiptPresent = true;
                submissions[Cache.getSubmissionIndex()].LineItems[Cache.getLineItemIndex()].ReceiptPresent = true;
                submissions[Cache.getSubmissionIndex()].LineItems[Cache.getLineItemIndex()].Receipts.push( receipt );
                ReceiptService.setReceipts( allReceipt );
                Cache.setAllUserSubmissions( submissions );
                $scope.currentSubmission = submissions[Cache.getSubmissionIndex()];
                $rootScope.$broadcast( "addSubmissionEmployeeTable" );
            } );

            /**
            * if there is a submission stored in Cache service,
            * set submissionTable variables from those stored in Cache service
            */
            if ( Cache.getSubmission() )
            {
                $scope.currentSubmission = Cache.getSubmission();
                $scope.Username = Authentication.getUserName();
                $scope.showComments = $scope.currentSubmission.LineItems.length != 0;
                //if the submission id is 1 the user can edit the submission
                $scope.createNewItemLoad = $scope.currentSubmission.StatusId == 1 || $scope.currentSubmission.StatusId == 4 || $scope.currentSubmission.StatusId == 6;
                $scope.dt1 = $scope.currentSubmission.WeekEndingDate;
                $scope.currentDescription = $scope.currentSubmission.Description;
                if ( Authentication.getIsFinanceApprover() || Authentication.getIsManager() )
                {
                    $scope.isApprover = true;
                }
                $rootScope.$broadcast( "checkReceipts" );

                for ( var i = 0; i < Cache.getRepliconProjects().length; i++ )
                {
                    if ( $scope.currentSubmission.RepliconProject.ProjectName == Cache.getRepliconProjects()[i].ProjectName )
                    {
                        $scope.selectedClient = Cache.getRepliconProjects()[i];
                    }
                }

                $scope.editExistingSubmission = true;
                if ( $scope.currentSubmission.LineItems.length != 0 )
                {
                    for ( var i = 0; i < $scope.currentSubmission.Comments.length; i++ )
                    {
                        if ( $scope.currentSubmission.Comments[i].RepliconUserName.toUpperCase() == $scope.Username.toUpperCase() )
                        {
                            $scope.currentSubmission.Comments[i]["commentIsMine"] = true;
                        } else
                        {
                            $scope.currentSubmission.Comments[i]["commentIsMine"] = false;
                        }
                    }
                }
            }

            /** 
            * a Manager can approve a submission which will call this mehtod
            */
            $scope.approve = function () {
                // the manager does not need a comment when approving
                MessageService.setAddComment(true);
                MessageService.setCommentRequired(false);
                MessageService.setMessage( "Please confirm you are about to approve this submission." );
                MessageService.setBroadCastMessage( "confirmApproveSubmission" );
                var modalInstance = $modal.open( {
                    templateUrl: 'Views/Home/views/modals/confirmModal.html',
                    controller: 'confirmModalController'
                } );
            }

            /**
            * this function is called when a manager chooses to reject a submission
            * it will open a confirmation modal asking if they are certain they would
            * like to reject the submission
            */
            $scope.reject = function () {
                MessageService.setMessage( "Please confirm you are about to reject this submission." );
                MessageService.setBroadCastMessage( "confirmRejectSubmission" );
                MessageService.setAddComment(true);
                MessageService.setCommentRequired(true);
                var modalInstance = $modal.open( {
                    templateUrl: 'Views/Home/views/modals/confirmModal.html',
                    controller: 'confirmModalController'
                } );
            }

            /**
            * load the receipt modal with the line items receipts
            */
            $scope.viewReceipts = function ( id, index ) {
                Cache.setLineItemId( id );
                Cache.setLineItemIndex( index );
                ReceiptService.setAddReceipt( false );
                ReceiptService.setShowAllReceipts( false );
                ReceiptService.setReceipts( $scope.currentSubmission.LineItems[index].Receipts );
                var modalInstance = $modal.open( {
                    templateUrl: 'Views/Home/views/modals/receiptModal.html',
                    controller: 'receiptController'
                } );
            };

            /**
            * listen for broadcast message and set scope variable
            */
            $scope.$on( "refreshCreateNewItemLoad", function () {
                $scope.editExistingSubmission = false;
            } );

            /**
            * receives confirmation from confirmModal.js that manager would like 
            * to approve a submission and updates the submission status in the database
            * adds the submission to the list of items for approval by the finance approver
            */
            $scope.$on("confirmApproveSubmission", function (response, comment) {
                var statusName = "";
                // this checks to see where the userer is comming from and if they are an approver
                if ( $scope.isApprover && Cache.getOrigin() == "ManagerTable" )
                {
                    statusName = "Manager Approved";
                } else
                {
                    statusName = "Finance Approved";
                }

                $scope.currentSubmission.Status["StatusName"] = statusName;
                $scope.currentSubmission.Comments = new Array();
                $scope.currentSubmission.Comments[0] = {};
                $scope.currentSubmission.Comments[0]["ExpenseComment"] = comment;
                SubmissionService.updateSubmission($scope.currentSubmission.SubmissionId, $scope.currentSubmission).then(function (data) {
                    if ( statusName == "Manager Approved" )
                    {
                        var submissions = Cache.getPendingSubmissionsByManagerName();
                        submissions.splice( Cache.getSubmissionIndex(), 1 );
                        Cache.setPendingSubmissionsByManagerName( submissions );
                    } else
                    {
                        var submissions = Cache.getPendingSubmissionsByFinanceApprover();
                        submissions.splice( Cache.getSubmissionIndex(), 1 );
                        Cache.setPendingSubmissionsByFinanceApprover( submissions );
                    }
                    Cache.setSubmission( undefined );
                    $location.path( '/home' );
                } );
            } );

            /*
            * receives confirmation from confirmModal that a submission has been rejected
            * updates the submission status depending on whether it manager or finance approver
            * rejecting the submission
            */
            $scope.$on( "confirmRejectSubmission", function ( response, comment ) {
                var statusName = "";
                if ( $scope.isApprover && Cache.getOrigin() == "ManagerTable" )
                {
                    statusName = "Manager Rejected";
                } else
                {
                    statusName = "Finance Rejected";
                }

                $scope.currentSubmission.Status["StatusName"] = statusName;
                $scope.currentSubmission.Comments = new Array();
                $scope.currentSubmission.Comments[0] = {};
                $scope.currentSubmission.Comments[0]["ExpenseComment"] = comment;
                SubmissionService.updateSubmission( $scope.currentSubmission.SubmissionId, $scope.currentSubmission ).then( function ( data ) {
                    if ( statusName == "Manager Rejected" )
                    {

                        var submissions = Cache.getPendingSubmissionsByManagerName();
                        submissions.splice( Cache.getSubmissionIndex(), 1 );
                    } else
                    {
                        var submissions = Cache.getPendingSubmissionsByFinanceApprover();
                        if (submissions) {
                            submissions.splice(Cache.getSubmissionIndex(), 1);
                        }
                       
                    }
                    Cache.setSubmission( undefined );
                    $window.location.reload();
                    $location.path( '/home' );
                } );
            } );

            /**
            * recieves broadcast message from commentModal.js
            */
            $scope.$on( "saveComment", function ( response, comment ) {
                // edit comment
                if ( Cache.getComment().ExpenseComment )
                {
                    CommentService.PutComment( Cache.getComment().CommentId, comment ).then( function ( success ) {
                        $scope.currentSubmission.Comments[commentIndex]['ExpenseComment'] = comment;
                    } );
                } else
                {
                    // create new comment
                    CommentService.CreateComment($scope.currentSubmission.SubmissionId, comment, $scope.currentSubmission.StatusId).then(function (success) {
                        success.data["commentIsMine"] = true;
                        $scope.currentSubmission.Comments.push( success.data );
                    } );
                }
            } );
        }
    ] );
