using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class SubmissionPage : PageObjectBase
    {
        // header fields
        private static readonly By WeekendingDateInput = By.Id("datePickerInput");
        private static readonly By clientDropDownList = By.Id("clientDropDownList");
        private static readonly By submissionDescription = By.Id("submissionDescription");
        private static readonly By submissionManager = By.Id("submissionManager");
        private static readonly By submissionStatus = By.Id("submissionStatus");

        private static readonly By newCommentButton = By.Id("newCommentButton");
        private static readonly By addLineItemButton = By.Id("addLineItemButton");
        private static readonly By submitTableButton = By.Id("submitTableButton");
        private static readonly By saveTableButton = By.Id("saveTableButton");
        private static readonly By approveTableButton = By.Id("approveTableButton");
        private static readonly By rejectTableButton = By.Id("rejectTableButton");

        private static readonly string elementByRoleAndRow = "(//span[@title='[{0}]'])[{1}]";
        private static readonly string EDIT = "Edit Report";
        private static readonly string DELETE = "Delete Report";
        private static readonly string RECEIPT = "View receipt";

        private static readonly string billableByRow = 
            "(//tbody[contains(@ng-repeat,'expense')][{0}])//span[@class='glyphicon glyphicon-ok']";

        private static readonly string rowPath = "//tbody[contains(@ng-repeat,'expense')]";
        private static readonly string cellPathByColumn = "(" + rowPath + ")[{0}]//td[{1}]";
        private static readonly int EXPENSE_DATE = 3;
        private static readonly int EXPENSE_TYPE = 4;
        private static readonly int AMOUNT = 5;


        // modal controls
        private static readonly By commentTextArea = By.Id("commentTextArea");
        private static readonly By yesButton = By.Id("yesButton");
        private static readonly By cancelButton = By.Id("cancelButton");

        // line item table headers
        private static readonly By expenseDateHeader = By.Id("subExpenseDate");
        private static readonly By expenseTypeHeader = By.Id("subExpenseType");
        private static readonly By amountHeader = By.Id("subAmount");
        private static readonly By billableHeader = By.Id("subBillable");
        private static readonly By receiptHeader = By.Id("subReceipt");

        public SubmissionPage(IWebDriver driver)
            : base(driver)
        {
        }

        #region Header controls
        /// <summary>
        /// Get text value from the Weekending Date input.
        /// 
        /// NOTE:  Not actually the real value, but a parallel property set in angular.
        /// </summary>
        /// <returns></returns>
        public string GetWeekendingDate()
        {
            return Find(WeekendingDateInput).Text;
        }

        /// <summary>
        /// Determine the client currently selected by the client dropdown.
        /// </summary>
        /// <returns></returns>
        public string GetSelectedClient()
        {
            return Find(clientDropDownList).Text;
        }

        /// <summary>
        /// Select a specific client from the client dropdown.
        /// </summary>
        /// <param name="client">name of client to select</param>
        /// <returns></returns>
        public SubmissionPage SelectClient(string client)
        {
            SelectByText(clientDropDownList, client);

            return this;
        }

        /// <summary>
        /// Get the description of the currently selected submission.
        /// </summary>
        /// <returns></returns>
        public string GetDescription()
        {
            return Find(submissionDescription).Text;
        }

        /// <summary>
        /// Type a description into the submission description field.
        /// </summary>
        /// <param name="description"></param>
        /// <returns></returns>
        public SubmissionPage SetDescription(string description)
        {
            SendKeys(submissionDescription, description);

            return this;
        }

        /// <summary>
        /// Get the name of the manager of the currently selected submission.
        /// </summary>
        /// <returns></returns>
        public string GetManager()
        {
            return Find(submissionManager).Text;
        }

        /// <summary>
        /// Get the status of the currently selected submission
        /// </summary>
        /// <returns></returns>
        public string GetStatus()
        {
            return Find(submissionStatus).Text;
        }
        #endregion

        #region read expense table values
        /// <summary>
        /// Get the contents of a specific cell on the table.  Should not be
        /// directly called outside the page object.
        /// </summary>
        /// <param name="row">row of cell to search for</param>
        /// <param name="column">column of cell to search for</param>
        /// <returns></returns>
        private string GetCellByRowAndColumn(int row, int column)
        {
            string fullPath = string.Format(cellPathByColumn, row, column);
            return Find(By.XPath(fullPath)).Text;
        }

        /// <summary>
        /// Counts the number of expense rows in the line item table.
        /// </summary>
        /// <returns></returns>
        public int GetRowCount()
        {
            return FindAll(By.XPath(rowPath)).Count;
        }

        /// <summary>
        /// Get all the string contents of all cells in a given column.
        /// 
        /// Will return an empty string if there are no columns.
        /// 
        /// Should not be directly called outside the page object.
        /// </summary>
        /// <param name="column"></param>
        /// <returns></returns>
        public List<string> GetCellContentsByColumn(int column)
        {
            int rowCount = GetRowCount();
            List<string> columnContents = new List<string>();

            for (int row = 1; row <= rowCount; row++)
            {
                columnContents.Add(GetCellByRowAndColumn(row, column));
            }

            return columnContents;
        }

        /// <summary>
        /// Reads and returns all the Expense Date values in order.
        /// </summary>
        /// <returns></returns>
        public List<string> GetAllExpenseDatesFromTable()
        {
            return GetCellContentsByColumn(EXPENSE_DATE);
        }

        /// <summary>
        /// Reads and returns all the Expense Type values in order.
        /// </summary>
        /// <returns></returns>
        public List<string> GetAllExpenseTypesFromTable()
        {
            return GetCellContentsByColumn(EXPENSE_TYPE);
        }

        /// <summary>
        /// Reads and returns all the Amount values in order.
        /// </summary>
        /// <returns></returns>
        public List<string> GetAllAmountsFromTable()
        {
            return GetCellContentsByColumn(AMOUNT);
        }
        #endregion

        #region expense table headers
        /// <summary>
        /// Click the Expense Date header.
        /// </summary>
        /// <returns></returns>
        private SubmissionPage SortByExpenseDate()
        {
            Click(expenseDateHeader);
            return this;
        }

        /// <summary>
        /// Click the Expense Type header.
        /// </summary>
        /// <returns></returns>
        private SubmissionPage SortByExpenseType()
        {
            Click(expenseTypeHeader);
            return this;
        }

        /// <summary>
        /// Click the Amount header.
        /// </summary>
        /// <returns></returns>
        private SubmissionPage SortByAmount()
        {
            Click(amountHeader);
            return this;
        }

        /// <summary>
        /// Click the Billable header.
        /// </summary>
        /// <returns></returns>
        private SubmissionPage SortByBillable()
        {
            Click(billableHeader);
            return this;
        }

        /// <summary>
        /// Click the Receipts header.
        /// </summary>
        /// <returns></returns>
        private SubmissionPage SortByReceipt()
        {
            Click(receiptHeader);
            return this;
        }

        /// <summary>
        /// Click an element on the table by what it does and the row it occupies on the 
        /// line items table.
        /// 
        /// This method ensures that the element it is looking for exists first.
        /// </summary>
        /// <param name="role">Edit, Delete or Receipt button</param>
        /// <param name="row">specific line item row</param>
        private void ClickElementByRoleOnRow(string role, int row)
        {
            string fullPath = string.Format(elementByRoleAndRow, role, row);
            By element = By.XPath(fullPath);
            if (DoesElementExist(element))
            {
                Click(element);
            }
        }

        /// <summary>
        /// Clicks the Edit button for a specific line item on the table.
        /// </summary>
        /// <param name="row">specific line item row</param>
        /// <returns></returns>
        public SubmissionModal ClickEditOnRow(int row)
        {
            ClickElementByRoleOnRow(EDIT, row);
            return new SubmissionModal(Driver);
        }

        /// <summary>
        /// Clicks the Delete button for a specific line item on the table.
        /// 
        /// May also specify whether you want to click yes or no on the confirmation
        /// modal.  (Default is yes if argument is not given.)
        /// </summary>
        /// <param name="row">specific line item row</param>
        /// <param name="shouldDelete">whether the line item deletion should be confirmed
        /// when the confirm delete modal appears (optional; defaults to true)</param>
        /// <returns></returns>
        public SubmissionPage ClickDeleteOnRow(int row, bool shouldDelete = true)
        {
            ClickElementByRoleOnRow(DELETE, row);
            Click(shouldDelete ? yesButton : cancelButton);
            return this;
        }

        /// <summary>
        /// Clicks the Receipt button for a specific line item on the table.
        /// 
        /// The Receipt button must exist, or no button will be clicked.
        /// </summary>
        /// <param name="row">specific line item row</param>
        /// <returns></returns>
        public SubmissionPage ClickReceiptOnRow(int row)
        {
            ClickElementByRoleOnRow(RECEIPT, row);
            return this;
        }

        /// <summary>
        /// Determines whether a given line item is billable.
        /// </summary>
        /// <param name="row">specific line item row</param>
        /// <returns></returns>
        public bool IsBillableOnRow(int row)
        {
            string billablePath = string.Format(billableByRow, row);
            return DoesElementExist(By.XPath(billablePath));
        }

        /// <summary>
        /// Determines whether a given line item allows you to view receipts.
        /// </summary>
        /// <param name="row">specific line item row</param>
        /// <returns></returns>
        public bool IsReceiptOnRow(int row)
        {
            string receiptPath = string.Format(elementByRoleAndRow, RECEIPT, row);
            return CanClick(By.XPath(receiptPath));
        }
        #endregion

        #region buttons for expenses table
        /// <summary>
        /// Clicks the New Comment button (if possible).
        /// </summary>
        /// <returns></returns>
        public SubmissionPage ClickNewCommentButton()
        {
            if (CanClickNewComment())
            {
                Click(newCommentButton);
            }
            return this;
        }

        /// <summary>
        /// Clicks the "New Comment" button, then makes a given comment.
        /// 
        /// May also specify whether you want to accept or cancel the comment.
        /// </summary>
        /// <param name="comment">the text of the comment you wish to make</param>
        /// <param name="confirm">should click yes after entering comment (optional; default to yes)</param>
        /// <returns></returns>
        public SubmissionPage AddComment(string comment, bool confirm = true)
        {
            Click(newCommentButton);
            SendKeys(commentTextArea, comment);
            Click(confirm ? yesButton : cancelButton);
            return this;
        }

        /// <summary>
        /// Clicks the Add Line Item button (if possible).
        /// </summary>
        /// <returns></returns>
        public SubmissionPage ClickAddLineItem()
        {
            if (CanClickAddLineItemButton())
            {
                Click(addLineItemButton);
            }
            return this;
        } 

        /// <summary>
        /// Determines if the New Comment button can be clicked.  It can only be clicked
        /// if it is both visible and enabled.
        /// </summary>
        /// <returns></returns>
        public bool CanClickNewComment()
        {
            return CanClick(newCommentButton);
        }

        /// <summary>
        /// Determines if the Add Line Item button can be clicked.  It can only be clicked
        /// if it is both visible and enabled.
        /// </summary>
        /// <returns></returns>
        public bool CanClickAddLineItemButton()
        {
            return CanClick(addLineItemButton);
        }

        /// <summary>
        /// Determines if the Approve button can be clicked.  It can only be clicked
        /// if it is both visible and enabled.
        /// </summary>
        /// <returns></returns>
        public bool CanClickApprove()
        {
            return CanClick(approveTableButton);
        }

        /// <summary>
        /// Determines if the Reject button can be clicked.  It can only be clicked
        /// if it is both visible and enabled.
        /// </summary>
        /// <returns></returns>
        public bool CanClickReject()
        {
            return CanClick(rejectTableButton);
        }
        #endregion
    }
}