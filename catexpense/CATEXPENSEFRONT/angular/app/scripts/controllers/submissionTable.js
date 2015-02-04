angular.module('expenseApp')
    .controller('submissionTableCtrl', function ($scope, $route, $modal, $location, $rootScope, $filter, Application, receiptService, LineItemService, MessageService, SubmissionService, Authentication) {
        $scope.receipts = true;
        var orderBy = $filter('orderBy');
        var sortColumn = { field: 'DateCreated', reverse: false };
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
            receiptService.setAllReceipts([])
            //when the orgin is employee table the submission cannot be approved or rejected
            Application.setOrigin("EmployeeTable");
            // get username
            $scope.userName = Authentication.getUserName();
            //if the submission is valid set the submission in the application service
            if (submission) {
                Application.setSubmission(submission);
                $rootScope.$broadcast("checkReceipts");

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
            $scope.isApprover = Authentication.getApprover();
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
            var allReceipt = receiptService.getAllReceipts();
            allReceipt.push(receipt);
            receiptService.setAllReceipts(allReceipt);
            submissions[Application.getSubmissionIndex()].allSubmissionReceipts = allReceipt;
            submissions[Application.getSubmissionIndex()].ReceiptPresent = true;
            submissions[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()].ReceiptPresent = true;
            submissions[Application.getSubmissionIndex()].LineItems[Application.getLineItemIndex()].Receipts.push(receipt);
            receiptService.setReceipts(allReceipt);
            $route.reload();
        });

        if (Application.getSubmission()) {
            $scope.currentSubmission = Application.getSubmission();
            $scope.userName = Authentication.getUserName();
            $scope.showComments = $scope.currentSubmission.LineItems.length != 0;
            //if the submission id is 1 the user can edit the submission
            $scope.createNewItemLoad = $scope.currentSubmission.StatusId == 1 || $scope.currentSubmission.StatusId == 4 || $scope.currentSubmission.StatusId == 6;
            $scope.dt1 = $scope.currentSubmission.WeekEndingDate;
            if (Authentication.getApprover() || Authentication.getIsManager()) {
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
            receiptService.setAddReceipt(false);
            receiptService.setShowAllReceipts(false);
            receiptService.setReceipts($scope.currentSubmission.LineItems[index].Receipts);
            console.log();
            var modalInstance = $modal.open({
                templateUrl: 'Views/HotTowel/views/modals/receiptModal.html',
                controller: 'receiptController'
            });
        };
        $scope.$on("refreshCreateNewItemLoad", function () {
            $scope.editExistingSubmission = false;
        });

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

        $scope.$on("saveComment", function (response, comment) {
            if (Application.getComment().ExpenseComment != undefined) {
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

        $scope.$on("confirmDeleteComment", function () {
            SubmissionService.DeleteLineItemComment($scope.currentSubmission.LineItemComments[commentIndex].LineItemCommentId).then(function (success) {
                $scope.currentSubmission.LineItemComments.splice(commentIndex, 1);;
            });
        });

    });
