-- adding fk from lineItems to Receipts

Delete From [expense12].[dbo].[Receipts]

ALTER TABLE [expense12].[dbo].[Receipts]
    ADD LineItemId INTEGER NOT NULL

ALTER TABLE [expense12].[dbo].[Receipts] WITH CHECK ADD
 CONSTRAINT FK_LineItems_LineItemId FOREIGN KEY (LineItemId) REFERENCES [expense12].[dbo].[LineItems] (LineItemId)

ALTER TABLE [expense12].[dbo].[Submissions]
ADD [Description] VARCHAR(MAX) null

/*Adding changes as required by CATEXPENSE-438*/
/* NOTE:  Receipts change already added above */

/*Create a Finance Approver table*/
CREATE TABLE Expense12.dbo.FinanceApprovers
(
id int PRIMARY KEY NOT NULL IDENTITY(1,1),
userName nvarchar(max) NOT NULL
);

/*populate FinanceApprover with all RepliconUsers who are finance approvers*/
INSERT Expense12.dbo.FinanceApprovers (userName)
SELECT RepliconUserName
FROM Expense12.dbo.RepliconUsers
WHERE FinanceApprover = 1

/*Connect Line Items to Submissions (one submission, many line items)*/
ALTER TABLE Expense12.dbo.LineItems
ADD CONSTRAINT fk_submissions
FOREIGN KEY (SubmissionId)
REFERENCES Submissions(SubmissionId)

/*Connect Line Items to Expense Categories (one expense category, many line items)*/
ALTER TABLE Expense12.dbo.LineItems
ADD CONSTRAINT fk_expenseCategoryId
FOREIGN KEY (ExpenseCategoryId)
REFERENCES ExpenseCategories(ExpenseCategoryId)

/*change statuses to more readable values*/
UPDATE Expense12.dbo.Status
SET StatusName='In Progress' 
WHERE StatusName='in_progress'

UPDATE Expense12.dbo.Status
SET StatusName='Submitted'
WHERE StatusName='submitted'

UPDATE Expense12.dbo.Status
SET StatusName='Manager Approved' 
WHERE StatusName='manager_approved'

UPDATE Expense12.dbo.Status
SET StatusName='Manager Rejected' 
WHERE StatusName='manager_rejected'

UPDATE Expense12.dbo.Status
SET StatusName='Finance Approved' 
WHERE StatusName='finance_approved'

UPDATE Expense12.dbo.Status
SET StatusName='Finance Rejected' 
WHERE StatusName='finance_rejected'

DELETE FROM  Expense12.dbo.LineItemComments

/*prepare LineItemComments to drop RepliconUsers*/
ALTER TABLE Expense12.dbo.LineItemComments
ADD RepliconUserName varchar(255) NOT NULL

ALTER TABLE Expense12.dbo.LineItemComments
DROP CONSTRAINT FK_LineItemComments_RepliconUsers

ALTER TABLE Expense12.dbo.LineItemComments
DROP COLUMN RepliconUserId

/*drop now-obsolete RepliconProjects and RepliconUsers tables*/
DROP TABLE Expense12.dbo.RepliconProjects

DROP TABLE Expense12.dbo.RepliconUsers

/*drop SubmissionId from Receipts table*/
ALTER TABLE Expense12.dbo.Receipts
DROP CONSTRAINT FK_Receipts_Receipts

ALTER TABLE Expense12.dbo.Receipts
DROP COLUMN SubmissionId

--change name of lineItemComments to just Comments
USE expense12; 
GO
EXEC sp_rename 'LineItemComments', 'Comments';
--change name of LineItemCommentId column to just CommentId
USE expense12;
GO
EXEC sp_rename 'Comments.LineItemCommentId', 'CommentId', 'COLUMN';