using OpenQA.Selenium;
using Selenium.Enumerators;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class HomePage : PageObjectBase
    {
        // header fields
        private static readonly By WeekendingDateInput = By.Id("datePickerInput");
        private static readonly By DatePickerButton = By.Id("datePickerBtn");
        private static readonly By clientDropDownList = By.Id("clientDropDownList");
        private static readonly By submissionDescription = By.Id("submissionDescription");
        private static readonly By submissionManager = By.Id("submissionManager");
        private static readonly By submissionStatus = By.Id("submissionStatus");
        private static readonly By startCreateButton = By.Id("startCreateButton");

        // date picker elements
        private static readonly string datePickerHeaderPath = "(//ul[@ng-model='date']//button)[{0}]";
        private static readonly string dateButtonPath = "(//td[contains(@id,'datepicker')])[{0}]";
        private static readonly string dateButtonMonthPath = "//span[.='{0}']/..";
        private static readonly By datePickerMonth = By.XPath(string.Format(datePickerHeaderPath, 2));
        private static readonly By datePickerPrevious = By.XPath(string.Format(datePickerHeaderPath, 1));
        private static readonly By datePickerNext = By.XPath(string.Format(datePickerHeaderPath, 3));
        private static readonly By datePickerCurrentWeek = By.XPath("//ul[@ng-model='date']//button[.='Current week']");
        private static readonly By datePickerClear = By.XPath("//ul[@ng-model='date']//button[.='Clear']");
        private static readonly By datePickerClose = By.XPath("//ul[@ng-model='date']//button[.='Close']");

        // controls used to create and edit submissions
        private static readonly By createSubmissionButton = By.Id("createSubmissionButton");
        private static readonly By newCommentButton = By.Id("newCommentButton");
        private static readonly By addLineItemButton = By.Id("addLineItemButton");
        private static readonly By submitTableButton = By.Id("submitTableButton");
        private static readonly By saveTableButton = By.Id("saveTableButton");

        // controls used to access specific rows, columns and cells on the table
        private const string EDIT = "Edit Report' or @title='View Report";
        private const string DELETE = "Delete Submission";
        private static readonly string tableBasePath = "//div[@id='{0}-short-table']";
        private static readonly string tableButton = tableBasePath + "//span[@title='{1}'][{2}]";
        private static readonly string tableRowPath = "//tr[@ng-repeat='submission in {0}Submissions']";
        private static readonly string tableRowAndColPath = tableRowPath + "//td[{1}]";
        private static readonly string viewReceiptPath = "(" + tableBasePath + 
            "//span[@title='View all receipts'])[{1}]";

        public HomePage(IWebDriver driver)
            : base(driver)
        { 
        }

        public HomePage(IWebDriver driver, string username, string password)
            : base(driver)
        {
            Visit( ConfigurationManager.AppSettings["testUrl"], string.Empty);
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
        /// Click the date picker button and open the calendar.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePicker()
        {
            Click(DatePickerButton);

            return this;
        }

        /// <summary>
        /// Click the create new expense report button to access the datepicker and client dropdown.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickCreateNewExpenseReport()
        {
            Click(startCreateButton);
            return this;
        }

        #region Date Picker handler
        /// <summary>
        /// Clicks a specific date on the calendar.
        /// </summary>
        /// <param name="week">One-based number of week on the calendar (calendar always has 6 weeks)</param>
        /// <param name="day">Day of the week to be selected on shown week</param>
        /// <returns></returns>
        public HomePage ClickDatePickerDate(int week, DayOfWeek day)
        {
            int targetIndex = (week - 1) * 7 + (int)day + 1;
            string specificDateButtonPath = string.Format(dateButtonPath, targetIndex);
            Click(By.XPath(specificDateButtonPath));

            return this;
        }

        /// <summary>
        /// Clicks the date picker's month button (between previous and next buttons)
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePickerMonth()
        {
            Click(datePickerMonth);

            return this;
        }

        /// <summary>
        /// Clicks a specific month name that appears after clicking the date picker's month.
        /// </summary>
        /// <param name="month">Specific month to click</param>
        /// <returns></returns>
        public HomePage ClickDatePickerSpecificMonth(Month month)
        {
            Click(By.XPath(string.Format(dateButtonMonthPath, month.ToString())));

            return this;
        }

        /// <summary>
        /// Clicks "Current week" button on the date picker.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePickerCurrentWeek()
        {
            Click(datePickerCurrentWeek);

            return this;
        }

        /// <summary>
        /// Clicks the back button on the date picker (usually cycles to previous month).
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePickerPrevious()
        {
            Click(datePickerPrevious);

            return this;
        }

        /// <summary>
        /// Clicks the next button on the date picker (usually cycles to next month).
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePickerNext()
        {
            Click(datePickerNext);

            return this;
        }

        /// <summary>
        /// Clicks the "Clear" button on the date picker.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePickerClear()
        {
            Click(datePickerClear);

            return this;
        }

        /// <summary>
        /// Clicks the "Close" button on the date picker.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickDatePickerClose()
        {
            Click(datePickerClose);

            return this;
        }
        #endregion

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
        public HomePage SelectClient(string client)
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
        public HomePage SetDescription(string description)
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
            return IsStatusVisible() ? Find(submissionStatus).Text : string.Empty;
        }

        /// <summary>
        /// Determine whether or not the status field is visible.
        /// </summary>
        /// <returns></returns>
        public bool IsStatusVisible()
        {
            return DoesElementExist(submissionStatus);
        }
        #endregion

        #region new submission and line item elements
        /// <summary>
        /// If the "Create Submission" button exists, click it and return a SubmissionModal.
        /// 
        /// If this button does not exist, simply return the home page.
        /// </summary>
        /// <returns></returns>
        public PageObjectBase ClickCreateSubmission()
        {
            if (CanCreateNewSubmission())
            {
                Click(createSubmissionButton);

                return new SubmissionModal(Driver);
            }
            else
            {
                return this;
            }
        }

        /// <summary>
        /// Determines whether or not the UI allows the user to create a new submission.
        /// </summary>
        /// <returns></returns>
        public bool CanCreateNewSubmission()
        {
            return DoesElementExist(createSubmissionButton);
        }

        /// <summary>
        /// If possible, click the new comment button.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickNewCommentButton()
        {
            if (!CanCreateNewSubmission())
            {
                Click(newCommentButton);
            }

            return this;
        }

        /// <summary>
        /// If possible, click the add new line item button.
        /// </summary>
        /// <returns></returns>
        public SubmissionModal ClickAddLineItemButton()
        {
            if (!CanCreateNewSubmission())
            {
                Click(addLineItemButton);
            }

            return new SubmissionModal(Driver);
        }

        /// <summary>
        /// Determines whether or not the new line item button can be clicked.
        /// </summary>
        /// <returns></returns>
        public bool CanAddLineItemButton()
        {
            return !CanCreateNewSubmission() && Find(addLineItemButton).Enabled;
        }

        /// <summary>
        /// Clicks the Submit Table button.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickSubmitTable()
        {
            Click(submitTableButton);

            return this;
        }

        /// <summary>
        /// Clicks the save table button.
        /// </summary>
        /// <returns></returns>
        public HomePage ClickSaveTable()
        {
            Click(saveTableButton);

            return this;
        }
        #endregion

        #region table handlers
        #region click table buttons
        /// <summary>
        /// Clicks an edit or delete button on a specific row on a specific table.
        /// 
        /// Private method.  Called by other methods that give this method its parameters.
        /// </summary>
        /// <param name="action">Edit (includes View) or Delete</param>
        /// <param name="table">Employee, Manager or Finance</param>
        /// <param name="column">one-based column of the record you want to select</param>
        private void ClickTableButton(string action, UserType table, int column)
        {
            By buttonBy = By.XPath(string.Format(tableButton,
                table.ToString().ToLower(), action, column.ToString()));

            if (DoesElementExist(buttonBy))
            {
                Click(buttonBy);
            }
        }

        /// <summary>
        /// Click the Edit Submission button for a specific column and table.  Note that,
        /// when selecting an edit button, buttons that qualify as "view" are included in the 
        /// row count so as not to break sequence.  This also allows you to click the "view"
        /// button.
        /// </summary>
        /// <param name="table">Employee, Manager, or Finance</param>
        /// <param name="column">One-based column number</param>
        public void ClickEditOrViewByTableAndColumn(UserType table, int column)
        {
            ClickTableButton(EDIT, table, column);
        }

        /// <summary>
        /// Click the Delete Submission button for a specific column and table.
        /// </summary>
        /// <param name="table">Employee, Manager, or Finance</param>
        /// <param name="column">One-based column number</param>
        public void ClickDeleteByTableAndColumn(UserType table, int column)
        {
            ClickTableButton(DELETE, table, column);
        }
        #endregion

        /// <summary>
        /// Determine how many columns a selected kind of table has, assuming it exists.
        /// If a table is not found, zero columns will be returned.
        /// </summary>
        /// <param name="type">Type of table to count rows for:  Employee, Manager, Finance</param>
        /// <returns></returns>
        public int GetRowCountForTable(UserType type)
        {
            return FindAll(GetRowLocatorByType(type)).Count;
        }

        /// <summary>
        /// Determines the By to locate all rows of a specific table.
        /// </summary>
        /// <param name="type">Type of table to get a row By for:  Employee, Manager, Finance</param>
        /// <returns></returns>
        private By GetRowLocatorByType(UserType type)
        {
            string rowPath = string.Format(tableRowPath, type.ToString().ToLower());
            return By.XPath(rowPath);
        }
        
        /// <summary>
        /// Determines the By to locate all cells in a specific table on a specific column.
        /// </summary>
        /// <param name="type"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        private By GetCellLocatorByTypeAndColumn(UserType type, int column)
        {
            string rowAndColPath = string.Format(tableRowAndColPath, type.ToString().ToLower(), column);
            return By.XPath(rowAndColPath);
        }

        /// <summary>
        /// Finds all cells on a specific table on a specific column, then gets back all
        /// their inner text values in a list, sorted in order of appearance on the page.
        /// 
        /// If the table is not present, or if no rows were found, return an empty list.
        /// </summary>
        /// <param name="table">a specific table:  Employee, Manager, Finance</param>
        /// <param name="column">a column number to check for</param>
        /// <returns></returns>
        public List<string> GetCellContentsByTableAndColumn(UserType table, int column)
        {
            List<string> rowContents = new List<string>();

            if (DoesTableExist(table))
            {
                var allCells = FindAll(GetCellLocatorByTypeAndColumn(table, column));

                if (allCells.Count > 0)
                {
                    rowContents = allCells.Select(cell => cell.Text).ToList();
                }
            }

            return rowContents;
        }

        /// <summary>
        /// Determines if a table exists on the page, and if it is visible to the user.
        /// </summary>
        /// <param name="table">Type of table to check for:  Employee, Manager, Finance</param>
        /// <returns></returns>
        public bool DoesTableExist(UserType table)
        {
            // construct an Id path to find the table based on the table's type
            string tablePath = string.Format("{0}-short-table", table.ToString().ToLower());
            By tableBy = By.Id(tablePath);

            return DoesElementExist(tableBy) && Find(tableBy).Displayed;
        }

        #region Receipt handling
        /// <summary>
        /// Derive a receipt button's By locator in a user table by a row.
        /// </summary>
        /// <param name="table">the table to check:  Employee, Manager, Finance</param>
        /// <param name="row">the one-based row to get the receipt button from</param>
        /// <returns></returns>
        private By GetReceiptButtonByTableAndRow(UserType table, int row)
        {
            string buttonPath = string.Format(viewReceiptPath, table.ToString().ToLower(), row);
            return By.XPath(buttonPath);
        }

        /// <summary>
        /// Locates a specific receipt button and determines whether or not that receipt button
        /// is clickable by finding the button and verifying that it is displayed.
        /// </summary>
        /// <param name="table">the table to check:  Employee, Manager, Finance</param>
        /// <param name="row">the one-based row to get the receipt button from</param>
        /// <returns></returns>
        public bool IsReceiptOnTableRow(UserType table, int row)
        {
            IWebElement receiptButton = Find(GetReceiptButtonByTableAndRow(table, row));

            return receiptButton != null && receiptButton.Displayed;
        }

        /// <summary>
        /// Clicks on a given receipt on a specific table, but only if the table has
        /// an acceptable number of rows and the button is clickable.
        /// </summary>
        /// <param name="table">the table to check:  Employee, Manager, Finance</param>
        /// <param name="row">the one-based row to get the receipt button from</param>
        /// <returns></returns>
        public HomePage ClickReceiptOnTableAndRow(UserType table, int row)
        {
            if (GetRowCountForTable(table) <= row && IsReceiptOnTableRow(table, row))
            {
                Click(GetReceiptButtonByTableAndRow(table, row));
            }

            return this;
        }
        #endregion

        #endregion
    }
}
