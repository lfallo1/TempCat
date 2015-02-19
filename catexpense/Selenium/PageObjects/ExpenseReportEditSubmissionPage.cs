using OpenQA.Selenium;
using Selenium.Enumerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class ExpenseReportEditSubmissionPage : PageObjectBase
    {
        private static readonly By AddNewLineItemButton = By.Id("addNewLineItemButton");
        private static readonly By SubmitTableButton = By.Id("submitTableButton");
        private static readonly By SaveTableButton = By.Id("saveTableButton");
        private static readonly By NewCommentButton = By.Id("newCommentButton");

        #region Expense Item table paths
        private static readonly string _expenseRowPath =
            "(//tbody[@ng-repeat='expense in lineItems'])[{0}]";
        private static readonly string _editLineItemByRow = _expenseRowPath + "//td[1]//span";
        private static readonly string _deleteLineItemByRow = _expenseRowPath + "//td[2]//span";
        private static readonly string _expenseDateByRow = _expenseRowPath + "//td[3]";
        private static readonly string _expenseTypeByRow = _expenseRowPath + "//td[4]";
        private static readonly string _expenseAmountByRow = _expenseRowPath + "//td[5]";
        private static readonly string _notBillableByRow = _expenseRowPath +
            "//td[6]//span[contains(@class,'remove')]";
        private static readonly string _noReceiptByRow = _expenseRowPath +
            "//td[7]//span[contains(@class,'remove')]";
        private static readonly string _viewReceiptByRow = _expenseRowPath + "//td[7]//span[2]";
        #endregion

        #region Comments table paths
        private static readonly string _commentsRowPath =
            "(//tbody[contains(@ng-repeat,'expenseComments')])[{0}]";
        private static readonly string _editCommentByRow = _commentsRowPath + "//td[1]//span";
        private static readonly string _deleteCommentByRow = _commentsRowPath + "//td[2]//span";
        private static readonly string _clientByRow = _commentsRowPath + "//td[3]//strong";
        private static readonly string _commentDateByRow = _commentsRowPath + "//td[4]";
        private static readonly string _commentByRow = _commentsRowPath + "//td[5]";
        #endregion

        public ExpenseReportEditSubmissionPage(IWebDriver driver)
            : base(driver)
        {
        }

        public BaseSubmissionModal ClickAddNewLineItem()
        {
            Find(AddNewLineItemButton).Click();
            return new BaseSubmissionModal(Driver);
        }

        public ExpenseReportEditSubmissionPage ClickSubmitTableButton()
        {
            Find(SubmitTableButton).Click();
            return this;
        }

        public ExpenseReportEditSubmissionPage ClickSaveTableButton()
        {
            Find(SaveTableButton).Click();
            return this;
        }

        public CommentModal ClickNewCommentButton()
        {
            Find(NewCommentButton).Click();
            return new CommentModal(Driver);
        }

        #region handle expense item table
        public int GetExpenseRowCount()
        {
            var rowPath = "//tbody[@ng-repeat='expense in lineItems']";
            var allRows = Driver.FindElements(By.XPath(rowPath));
            return allRows.Count;
        }

        public BaseSubmissionModal ClickExpenseEditByRow(int row)
        {
            var icon = Find(By.XPath(string.Format(_editLineItemByRow, row)));
            icon.Click();
            return new BaseSubmissionModal(Driver);
        }

        public ExpenseReportEditSubmissionPage ClickExpenseDeleteByRow(int row)
        {
            var icon = Find(By.XPath(string.Format(_deleteLineItemByRow, row)));
            icon.Click();
            return new ExpenseReportEditSubmissionPage(Driver);
        }

        public string GetExpenseDateTimeByRow(int row)
        {
            var span = Find(By.XPath(string.Format(_expenseDateByRow, row)));
            return span.Text;
        }

        public SubmissionType GetExpenseSubmissionTypeByRow(int row)
        {
            var span = Find(By.XPath(string.Format(_expenseTypeByRow, row)));
            string typeAsString = span.Text.Replace(" ", "_");

            return (SubmissionType)Enum.Parse(typeof(SubmissionType), typeAsString);
        }

        public string GetExpenseAmountByRow(int row)
        {
            var span = Find(By.XPath(string.Format(_expenseAmountByRow, row)));
            return span.Text;
        }

        public bool IsBillableByRow(int row)
        {
            return !DoesElementExist(By.XPath(string.Format(_notBillableByRow, row)));
        }

        public bool ReceiptGivenForRow(int row)
        {
            return !DoesElementExist(By.XPath(string.Format(_noReceiptByRow, row)));
        }
        #endregion

        #region handle comment table
        public int GetCommentCount()
        {
            var rowPath = "//tbody[contains(@ng-repeat,'expenseComments')]";
            var allRows = Driver.FindElements(By.XPath(rowPath));
            return allRows.Count;
        }

        public CommentModal ClickEditCommentByRow(int row)
        {
            var editButton = Find(By.XPath(string.Format(_editCommentByRow, row)));
            editButton.Click();
            return new CommentModal(Driver);
        }

        public ConfirmModal ClickDeleteCommentByRow(int row)
        {
            var deleteButton = Find(By.XPath(string.Format(_deleteCommentByRow, row)));
            deleteButton.Click();
            return new ConfirmModal(Driver);
        }

        public string GetCommentClientByRow(int row)
        {
            var span = Find(By.XPath(string.Format(_clientByRow, row)));
            return span.Text;
        }

        public string GetCommentDateByRow(int row)
        {
            var span = Find(By.XPath(string.Format(_commentDateByRow, row)));
            return span.Text;
        }

        public string GetCommentByRow(int row)
        {
            var span = Find(By.XPath(string.Format(_commentByRow, row)));
            return span.Text;
        }
        #endregion
    }
}
