using System;
using System.Configuration;
using OpenQA.Selenium;
using System.Collections.Generic;
using Selenium.Enumerators;
using OpenQA.Selenium.Support.UI;
using System.Threading;

namespace Selenium.PageObjects
{
    public class ExpenseReportHomePage : PageObjectBase
    {
        private static readonly string url = ConfigurationManager.AppSettings["testUrl"];
        private static readonly By ClientList = By.Id("clientDropDownList");
        private static readonly By EmployeeTable = By.Id("employee-short-table");
        private static readonly By EmployeeTableNoContentsWarning = By.XPath(
            "//div[@id='employee-short-table']//div[@class='alert alert-warning fade in']");
        private static readonly By ManagerTable = By.Id("manager-short-table");
        private static readonly By FinanceTable = By.Id("finance-short-table");
        private static readonly By SubmissionDescription = By.Id("submissionDescription");
        private static readonly By DatePickerInput = By.Id("datePickerInput");
        private static readonly By DatePickerButton = By.Id("datePickerBtn");
        private static readonly By DatePickerTodayButton = By.XPath("//button[.='Current week']");
        private static readonly By DatePickerClearButton = By.XPath("//button[.='Clear']");
        private static readonly By DatePickerCloseButton = By.XPath("//button[.='Close']");
        private static readonly By RejectedAlert = By.Id("rejectedAlert");
        private static readonly By AwaitingAlert = By.Id("awaitingAlert");
        private static readonly By FinanceAlert = By.Id("financeAlert");
        private static readonly By EditButtons = By.ClassName("glyphicon-edit");
        private static readonly By DeleteSubmissionButton = By.Id("deleteSubmissionButton");
        private static readonly By SubmitButton = By.Id("createSubmissionButton");
        private static readonly By AddLineItemButton = By.Id("addLineItemButton");
        private static readonly By ProjectSyncButton = By.Id("syncProjectsButton");
        private static readonly By SubmissionModal = By.XPath("//div[@class='modal-content']"); 

        private static readonly By EmployeeTableSelect = By.XPath(
            "//div[@id='employee-short-table']//select");
        private static readonly By FinanceTableSelect = By.XPath(
            "//div[@id='finance-short-table']//select");

        private static readonly By _editButtonByTable = By.XPath(
            "//div[@id='{0}-short-table']//span[@title='Edit Report']");

        private static readonly string _deleteClientButtonByRow =
            "//span[@title='Delete Submission'][{0}]";

        private static readonly string _allColumnsByTable =
            "//tbody[@ng-repeat='submission in {0}Submissions']";

        private static readonly string _cellByTableRowAndColumn =
            _allColumnsByTable + "[{1}]//td[{2}]";


        public ExpenseReportHomePage(IWebDriver driver, string username, string password)
            : base(driver)
        {
            Visit(string.Format("http://{0}", url), string.Empty);

            Thread.Sleep(2000);
            Login(username, password);
            Thread.Sleep(2000);
        }

        public ExpenseReportHomePage(IWebDriver driver)
            : base(driver)
        { 
        }

        public bool DoesTableExist(UserType type)
        {
            switch (type)
            {
                case UserType.Employee:
                    {
                        return DoesElementExist(EmployeeTable);
                    }
                case UserType.Manager:
                    {
                        return DoesElementExist(ManagerTable);
                    }
                case UserType.Finance:
                    {
                        return DoesElementExist(FinanceTable);
                    }
                default:
                    {
                        return false;
                    }
            }
        }

        public bool IsPagesMerged()
        {
            var pagesMerged = false;
            var dateInput = Driver.FindElement(DatePickerInput);
            var description = Driver.FindElement(SubmissionDescription);
            var clientBox = Driver.FindElement(ClientList);

            if(dateInput.Displayed && description.Displayed && clientBox.Displayed)
            {
                pagesMerged = true;
            }
            return pagesMerged;
        }

        public void AddDescriptionToSubmission()
        {
            var submissionDescrip = Driver.FindElement(SubmissionDescription);
            submissionDescrip.SendKeys("test for description");
        }

        public string ReadSubmissionDescription()
        {
            var submissionText = Driver.FindElement(SubmissionDescription);
            var text = submissionText.GetAttribute("value");
            return text;

        }

        public bool SelectDropdownElements()
        {

            var dropDownSelect = Driver.FindElement(ClientList);
            var selectElement = new SelectElement(dropDownSelect);
            OpenDatePicker();
            DatePickerClickToday();
            var isPresent = false;
            IList<IWebElement> AllDropDownList = Driver.FindElement(ClientList).FindElements(By.XPath("//option"));
            

                var valueText = AllDropDownList[0]
                    .Text;
                selectElement.SelectByText(valueText);
                selectElement.SelectedOption.Click();

                if (string.IsNullOrEmpty(valueText))
                {
                    isPresent = false;
                }
                else
                {
                    isPresent = true;
                }

            

            return isPresent;

        }

        public bool ClickProjectSync()
        {
            var projectSyncBtn = Driver.FindElement(ProjectSyncButton);
            projectSyncBtn.Click();
            if (projectSyncBtn.Enabled)
            {
                return false;
            }
            else
            {
                return true;
            }

        }

        public ExpenseReportSubmissionBaseModal ClickAddLineItem()
        {
            Find(AddLineItemButton).Click();
            return new ExpenseReportSubmissionBaseModal(Driver);
        }

        public ExpenseReportSubmissionBaseModal ClickCreateSubmission()
        {
            try
            {
                Find(SubmitButton).Click();
            }
            catch (OpenQA.Selenium.WebDriverException)
            {
                ClickAddLineItem();
            }

            return new ExpenseReportSubmissionBaseModal(Driver);
        }

        public bool CancelSubmissionClick()
        {
            ExpenseReportSubmissionBaseModal modal = new ExpenseReportSubmissionBaseModal(Driver);
            var clicked = false;
            OpenDatePicker();
            DatePickerClickToday();
            ClickCreateSubmission();
            Thread.Sleep(3000);
            modal.ClickCancel();
            ///Driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(10));

            try
            {
                Thread.Sleep(3000);
                //Driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(10));
                var cancelSubmissionButton = Driver.FindElement(DeleteSubmissionButton);

                cancelSubmissionButton.Click();
                clicked = true;
            }

            catch (WebDriverException)
            {
                clicked = false;
            }

            return clicked;
        }

        public bool CheckMileageDefault()
        {
            ExpenseReportSubmissionBaseModal modal = new ExpenseReportSubmissionBaseModal(Driver);
            OpenDatePicker();
            DatePickerClickToday();
            ClickCreateSubmission();
            return modal.CheckMileageDefault();
        }

        public void CreateTestSubmission()
        {
            ExpenseReportSubmissionBaseModal modal = new ExpenseReportSubmissionBaseModal(Driver);
            SubmissionType type = SubmissionType.Other;
            modal.ChangeSubmissionType(type);
            modal.SetDescription("test submission");
            modal.SetAmount("187");
            modal.ClickSave();
        }


        public void OpenDatePicker()
        {
            Find(DatePickerButton).Click();
        }

        public void DatePickerClickToday()
        {
            Find(DatePickerTodayButton).Click();
        }

        public void DatePickerClickClear()
        {
            Find(DatePickerClearButton).Click();
        }

        public void DatePickerClickClose()
        {
            Find(DatePickerCloseButton).Click();
        }

        public string ReadDatePickerInput()
        {
            var input = Find(DatePickerInput);
            var text = input.GetAttribute("value");
            return text;
        }

        public bool DoesSubmissionModalExist()
        {
            return DoesElementExist(SubmissionModal);
        }

        public void ClickFirstEditableSubmission()
        {
            IList<IWebElement> AllEditableSubmissions = Driver.FindElements(EditButtons);
            AllEditableSubmissions[0].Click();
        }

        public bool DoesAlertExist(UserType type)
        {
            switch (type)
            {
                case UserType.Employee:
                    {
                        return DoesElementExist(RejectedAlert);
                    }
                case UserType.Manager:
                    {
                        return DoesElementExist(AwaitingAlert);
                    }
                case UserType.Finance:
                    {
                        return DoesElementExist(FinanceAlert);
                    }
                default:
                    {
                        return false;
                    }
            }
        }

        #region check column headers for accuracy
        public List<string> GetAllHeadersAtTable(UserType table)
        {
            var headerXpath = string.Format("//div[@id='{0}-short-table']//th", table).ToLower();
            var allHeaders = Driver.FindElements(By.XPath(headerXpath));

            var allHeaderStrings = new List<string>();
            foreach (IWebElement header in allHeaders)
            {
                allHeaderStrings.Add(header.Text);
            }

            return allHeaderStrings;
        }

        public List<string> GetEmployeeTableHeaders()
        {
            return GetAllHeadersAtTable(UserType.Employee);
        }

        public List<string> GetManagerTableHeaders()
        {
            return GetAllHeadersAtTable(UserType.Manager);
        }

        public List<string> GetFinanceTableHeaders()
        {
            return GetAllHeadersAtTable(UserType.Finance);
        }
        #endregion

        //public ExpenseReportEditSubmissionPage ClickEditByTableAndColumn(UserType table, int column)
        //{
        //    var buttonXpath = string.Format(_editButtonByTable, table.ToString().ToLower());
        //    var allEditButtons = Driver.FindElements(By.XPath(buttonXpath));

        //    if (column > 0 && column <= GetColumnCountByTable(table))
        //    {
        //        var chosenButton = allEditButtons[column - 1];
        //        chosenButton.Click();
        //    }

        //    return new ExpenseReportEditSubmissionPage(Driver);
        //}

        #region get information from tables

        public int GetEmployeeColumnCount()
        {
            return GetColumnCountByTable(UserType.Employee);
        }

        public bool IsEmployeeTableNoEntryWarningVisible()
        {
            return DoesElementExist(EmployeeTableNoContentsWarning);
        }

        public int GetManagerColumnCount()
        {
            return GetColumnCountByTable(UserType.Manager);
        }

        public int GetFinanceColumnCount()
        {
            return GetColumnCountByTable(UserType.Finance);
        }

        private int GetColumnCountByTable(UserType tableType)
        {
            var buttonXpath = string.Format(_allColumnsByTable,
                tableType.ToString().ToLower()); 
            var allEditButtons = Driver.FindElements(By.XPath(buttonXpath));

            return allEditButtons.Count;
        }

        private string GetCellByTableRowAndColumn(UserType table, int row, int column)
        {
            var cellXpath = string.Format(_cellByTableRowAndColumn,
                table.ToString().ToLower(), column, row);

            var cell = Find(By.XPath(cellXpath));

            return cell.Text;
        }

        private List<string> GetColumnByTableAndRow(UserType table, int row)
        {
            int columnCount = GetColumnCountByTable(table);
            var allColumns = new List<string>();

            while (allColumns.Count < columnCount)
            {
                allColumns.Add(GetCellByTableRowAndColumn(table, row, allColumns.Count + 1));
            }

            return allColumns;
        }

        #region exposed methods to get specific columns from page

        #region Employee table
        public List<string> GetEmployeeSubmittedColumn()
        {
            return GetColumnByTableAndRow(UserType.Employee, 3);
        }

        public List<string> GetEmployeeClientColumn()
        {
            return GetColumnByTableAndRow(UserType.Employee, 4);
        }

        public List<string> GetEmployeeTotalColumn()
        {
            return GetColumnByTableAndRow(UserType.Employee, 5);
        }

        public List<string> GetEmployeeWeekEndingColumn()
        {
            return GetColumnByTableAndRow(UserType.Employee, 6);
        }

        public List<string> GetEmployeeStatusColumn()
        {
            return GetColumnByTableAndRow(UserType.Employee, 7);
        }

        public List<string> GetEmployeeLastUpdatedColumn()
        {
            return GetColumnByTableAndRow(UserType.Employee, 7);
        }
        #endregion

        #region Manager table
        public List<string> GetManagerSubmittedColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 2);
        }

        public List<string> GetManagerSubmittedByColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 3);
        }

        public List<string> GetManagerWeekEndingColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 4);
        }

        public List<string> GetManagerClientColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 5);
        }

        public List<string> GetManagerAmountColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 6);
        }
        #endregion

        #region Finance table
        public List<string> GeFinanceSubmittedColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 2);
        }

        public List<string> GetFinanceSubmittedByColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 3);
        }

        public List<string> GetFinanceWeekEndingColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 4);
        }

        public List<string> GetFinanceClientColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 5);
        }

        public List<string> GetFinanceAmountColumn()
        {
            return GetColumnByTableAndRow(UserType.Manager, 6);
        }
        #endregion

        #endregion

        #endregion

        public void DeleteSubmission()
        {
            var deleteButton = Find(DeleteSubmissionButton);
            deleteButton.Click();            
        }

        public ExpenseReportHomePage FilterEmployeeTable(int selection)
        {
            SelectByIndex(EmployeeTableSelect, selection);
            return this;
        }

        public ExpenseReportHomePage FilterFinanceTable(int selection)
        {
            SelectByIndex(FinanceTableSelect, selection);
            return this;
        }
    }
}
