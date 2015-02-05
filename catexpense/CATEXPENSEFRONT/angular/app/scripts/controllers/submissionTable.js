﻿angular.module('expenseApp')
    .controller( 'submissionTableCtrl', function ( $scope, $route, $modal, $location, $rootScope, $filter, Application, ReceiptService, LineItemService, MessageService, SubmissionService, Authentication ) {
        $scope.receipts = true;
        var orderBy = $filter('orderBy');
        var sortColumn = { field: 'DateCreated', reverse: false };

        /**
        * enable sorting for each column in the submissionTable
        */
        $scope.submissionOrder = function (field) {
            if (field === sortColumn.field) {
                sortColumn.reverse = !sortColumn.reverse;
                $scope.currentSubmission.LineItems = orderBy($scope.currentSubmission.LineItems, sortColumn.field, sortColumn.reverse);
            } else {
                sortColumn.field = field;
                sortColumn.reverse = false;
                $scope.currentSubmission.LineItems = orderBy($scope.currentSubmission.LineItems, sortColumn.field, sortColumn.reverse);
            };
        };

        //when a submission is found by a week ending date and a client then run this function
        $scope.$on('submissionFound', function (message, submission) {
            ReceiptService.setAllReceipts( [] )
            //when the orgin is employee table the submission cannot be approved or rejected
            Application.setOrigin("EmployeeTable");
            // get username
            $scope.userName = Authentication.getUserName();
            //if the submission is valid set the submission in the application service
            if (submission) {                
                $rootScope.$broadcast("checkReceipts");
                $scope.currentDescription = submission.Description;                
                $scope.createNewItemLoad = submission.StatusId == 1 || submission.StatusId == 4 || submission.StatusId == 6;
                //set the current submission being editted
                $scope.currentSubmission = submission;
                $scope.isApprover = false;
                // if there are line items show comment functionality
                $scope.showComments = submission.LineItems.length != 0;
                if ($scope.currentSubmission.LineItems.length != 0) {
                    //this for loop will determine which comments you can edit
                    for (var i = 0; i < $scope.currentSubmission.LineItemComments.length; i++) {
                        if ($scope.currentSubmission.LineItemComments[i].RepliconUserName.toUpperCase() == $scope.userName.toUpperCase()) {
                            $scope.currentSubmission.LineItemComments[i]["commentIsMine"] = true;
                        } else {
                            $scope.currentSubmission.LineItemComments[i]["commentIsMine"] = false;
                        }
                    }
                }
            }
        });

        //recieves broadcast message from MessageService confirming
        //that user would like to delete selected line item
        $scope.$on("confirmDeleteLineItem", function () {
            MessageService.setMessage("");
            MessageService.setBroadCastMessage("");
            // getId is the line item id set when the delete button is clicked
            LineItemService.deleteLineItem(MessageService.getId()).then(function (success) {
                $scope.currentSubmission.LineItems.splice(MessageService.getIndex(), 1);
                $scope.showComments = $scope.currentSubmission.LineItems.length != 0;
                //after deleting a line item this loop will recalculate the total
                var submissionTotalAmount = 0;
                var userSubmissions = Application.getAllUserSubmissions();
                for (var i = 0; i < userSubmissions[Application.getSubmissionIndex()].LineItems.length; i++) {
                    submissionTotalAmount += userSubmissions[Application.getSubmissionIndex()].LineItems[i].LineItemAmount;
                }
                // set the new submission total
                userSubmissions[Application.getSubmissionIndex()].TotalAmount = submissionTotalAmount;
                Application.setSubmissionStatus(userSubmissions);
            }, function (error) {
                console.log(error);
            });

        });

        // when user chooses to delete a line item in a submission,
        // pop up a confirmation modal before the item is actually deleted
        $scope.confirmLineRemove = function (expense, index) {
            // set the message for the confirm message
            MessageService.setMessage('Are you sure you want to delete this line item? NOTE: Any attached receipts will be permanently delete.');
            MessageService.setBroadCastMessage("confirmDeleteLineItem");
            MessageService.setId(expense.LineItemId);
            MessageService.setIndex(index);
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
                controller: 'confirmModalController'
            });
        };

        $scope.isApprover = false;
        $scope.createNewItemLoad = Application.getSubmissionStatus() == 1 || Application.getSubmissionStatus() == 4 || Application.getSubmissionStatus() == 6;
        var receipts;

        if (Application.getOrigin() !== "EmployeeTable") {
            if (Authentication.getIsManager || Authentication.getIsFinanceApprover) {
                 $scope.isApprover = true;
            } else {
                $scope.isApprover = false;
            }
        }
        $scope.userName = Authentication.getUserName();

        var commentIndex;
        $scope.$on("editCommentFromSubmission", function (response, index) {
            if (index != -1) {
                commentIndex = index;
                Application.setComment($scope.currentSubmission.LineItemComments[index]);
            } else {
                Application.setComment("");
            }
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/commentModal.html',
                controller: 'CommentController'
            });
        });
        // when editing the comment the index will be -1 otherwise it assumes you are creating a new comment
        $scope.editComment = function (index) {
            if (index != -1) {
                commentIndex = index;
                Application.setComment($scope.currentSubmission.LineItemComments[index]);
            } else {
                Application.setComment("");
            }
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/commentModal.html',
                controller: 'CommentController'
            });
        }

        $scope.deleteComment = function (index) {
            commentIndex = index;
            MessageService.setMessage("Are you sure you want to delete this comment?");
            MessageService.setBroadCastMessage("confirmDeleteComment");
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
                controller: 'confirmModalController'
            });
        }
        // when this is called the receipt passed in is added to the cache
        $scope.$on("addNewReceipt", function (message, receipt) {
            var submissions = Application.getAllUserSubmissions();
            var allReceipt = ReceiptService.getAllReceipts();
            allReceipt.push(receipt);
            ReceiptService.setAllReceipts( allReceipt );
            submissions[Application.getSubmissionIndex()].allSubmissionReceipts = allReceipt;
            submissions[Application.getSubmissionIndex()].ReceiptPresent = true;
            submissions[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()].ReceiptPresent = true;
            submissions[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()].Receipts.push(receipt);
            ReceiptService.setReceipts( allReceipt );
            Application.setAllUserSubmissions(submissions);
            $scope.currentSubmission = submissions[Application.getSubmissionIndex()];
            $rootScope.$broadcast("addSubmissionEmployeeTable");
        });

        if (Application.getSubmission()) {
            $scope.currentSubmission = Application.getSubmission();
            $scope.userName = Authentication.getUserName();
            $scope.showComments = $scope.currentSubmission.LineItems.length != 0;
            //if the submission id is 1 the user can edit the submission
            $scope.createNewItemLoad = $scope.currentSubmission.StatusId == 1 || $scope.currentSubmission.StatusId == 4 || $scope.currentSubmission.StatusId == 6;
            $scope.dt1 = $scope.currentSubmission.WeekEndingDate;
            $scope.currentDescription = $scope.currentSubmission.Description;
            if (Authentication.getIsFinanceApprover() || Authentication.getIsManager()) {
                $scope.isApprover = true;
            }
            $rootScope.$broadcast("checkReceipts");
            for (var i = 0; i < Application.getRepliconProjects().length; i++) {
                if ($scope.currentSubmission.RepliconProject.RepliconProjectName == Application.getRepliconProjects()[i].RepliconProjectName) {
                    $scope.selectedClient = Application.getRepliconProjects()[i];
                }
            }
            $scope.editExistingSubmission = true;
            if ($scope.currentSubmission.LineItems.length != 0) {
                for (var i = 0; i < $scope.currentSubmission.LineItemComments.length; i++) {
                    if ($scope.currentSubmission.LineItemComments[i].RepliconUserName.toUpperCase() == $scope.userName.toUpperCase()) {
                        $scope.currentSubmission.LineItemComments[i]["commentIsMine"] = true;
                    } else {
                        $scope.currentSubmission.LineItemComments[i]["commentIsMine"] = false;
                    }
                }
            }
        }
        // a Manager can approve a submission which will call this mehtod
        $scope.approve = function () {
            // the manager does not need a comment when approving
            MessageService.setAddComment(false);
            MessageService.setMessage("Please confirm you are about to approve this submission.");
            MessageService.setBroadCastMessage("confirmApproveSubmission");
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
                controller: 'confirmModalController'
            });
        }

        /**
        * this function is called when a manager chooses to reject a submission
        * it will open a confirmation modal asking if they are certain they would
        * like to reject the submission
        */
        $scope.reject = function () {
            MessageService.setMessage("Please confirm you are about to reject this submission.");
            MessageService.setBroadCastMessage("confirmRejectSubmission");
            MessageService.setAddComment(true);
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/confirmModal.html',
                controller: 'confirmModalController'
            });
        }

        //load the receipt modal with the line items receipts
        $scope.viewReceipts = function (id, index) {
            Application.setLineItemId(id);
            Application.setLineItemIndex(index);
            ReceiptService.setAddReceipt( false );
            ReceiptService.setShowAllReceipts( false );
            ReceiptService.setReceipts( $scope.currentSubmission.LineItems[index].Receipts );
            console.log();
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
                controller: 'receiptController'
            });
        };
        $scope.$on("refreshCreateNewItemLoad", function () {
            $scope.editExistingSubmission = false;
        });

        /**
        * receives confirmation from confirmModal.js that manager would like 
        * to approve a submission and updates the submission status in the database
        * adds the submission to the list of items for approval by the finance approver
        */
        $scope.$on("confirmApproveSubmission", function () {
            var statusName = "";
            // this checks to see where the userer is comming from and if they are an approver
            if ($scope.isApprover && Application.getOrigin() == "ManagerTable") {
                statusName = "Manager Approved";
            } else {
                statusName = "Finance Approved";
            }

            $scope.currentSubmission.Status["StatusName"] = statusName;
            SubmissionService.updateSubmission($scope.currentSubmission.SubmissionId, $scope.currentSubmission).then(function (data) {
                if (statusName == "Manager Approved") {
                    var submissions = Application.getPendingSubmissionsByManagerName();
                    submissions.splice(Application.getSubmissionIndex(), 1);
                } else {
                    var submissions = Application.getPendingSubmissionsByFinanceApprover();
                    submissions.splice(Application.getSubmissionIndex(), 1);
                }
                Application.setPendingSubmissionsByFinanceApprover(submissions);
                $location.path('/home');
            });
        });

        /*
        * receives confirmation from confirmModal that a submission has been rejected
        * updates the submission status depending on whether it manager or finance approver
        * rejecting the submission
        */
        $scope.$on("confirmRejectSubmission", function (response, comment) {
            var statusName = "";
            if ($scope.isApprover && Application.getOrigin() == "ManagerTable") {
                statusName = "Manager Rejected";
            } else {
                statusName = "Finance Rejected";
            }

            $scope.currentSubmission.Status["StatusName"] = statusName;
            $scope.currentSubmission.LineItemComments = new Array();
            $scope.currentSubmission.LineItemComments[0] = {};
            $scope.currentSubmission.LineItemComments[0]["ExpenseComment"] = comment;
            SubmissionService.updateSubmission($scope.currentSubmission.SubmissionId, $scope.currentSubmission).then(function (data) {
                if (statusName == "Manager Rejected") {

                    var submissions = Application.getPendingSubmissionsByManagerName();
                    submissions.splice(Application.getSubmissionIndex(), 1);
                } else {
                    var submissions = Application.getPendingSubmissionsByFinanceApprover();
                    submissions.splice(Application.getSubmissionIndex(), 1);
                }
                $location.path('/home');
            });
        });

        /**
        * recieves broadcast message from commentModal.js
        */
        $scope.$on("saveComment", function (response, comment) {
            if (Application.getComment().ExpenseComment) {
                SubmissionService.PutLineItemComment(Application.getComment().LineItemCommentId, comment).then(function (success) {
                    $scope.currentSubmission.LineItemComments[commentIndex]['ExpenseComment'] = comment;
                });
            } else {
                SubmissionService.CreateLineItemComment($scope.currentSubmission.SubmissionId, comment).then(function (success) {
                    success.data["commentIsMine"] = true;
                    $scope.currentSubmission.LineItemComments.push(success.data);
                });
            }

        });

        /**
        * receives confirmation from confirmModal that a comment would like to be deleted
        * removes the comment from the line item in the database
        */
        $scope.$on("confirmDeleteComment", function () {
            SubmissionService.DeleteLineItemComment($scope.currentSubmission.LineItemComments[commentIndex].LineItemCommentId).then(function (success) {
                $scope.currentSubmission.LineItemComments.splice(commentIndex, 1);;
            });
        });

    });
