using Selenium.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using System.Globalization;
using Selenium.Enumerators;
using OpenQA.Selenium.Support.UI;

namespace Selenium.Page_Methods
{
    public class HomePageMethods
    {
        HomePage _homePage;
        
        public HomePageMethods(HomePage homePage)
        {
            _homePage = homePage;
        }
         
        /// <summary>
        /// this method attempts to click on the sync button returns true if successful
        /// </summary>
        /// <returns>boolean</returns>
        public bool ClickSync()
        {
            var isClicked = false;
            try
            {
                _homePage.ClickSync();
                isClicked = true;
            }
            catch(ElementNotVisibleException e)
            {
                isClicked = false;
                string error = e.ToString();
                Logger.Logger.GetLogger("TestDetails").LogError(error);
            }

            return isClicked;
            
        }

        /// <summary>
        /// this method attempts to click on the Create New Expense button to access datepicker and
        /// client fields, if successful returns true if not returns false
        /// </summary>
        /// <returns>boolean</returns>
        public bool ClickCreateNewExpense()
        {
            var isClicked = false;
            try
            {
                _homePage.ClickCreateNewExpenseReport();
                isClicked = true;
            }
            catch (ElementNotVisibleException e)
            {
                isClicked = false;
                string error = e.ToString();
                Logger.Logger.GetLogger("TestDetails").LogError(error);
            }

            return isClicked;
        }

        /// <summary>
        /// This method attempts to select a client from the client dropdown and click on it
        /// if successful returns true if not returns false
        /// </summary>
        /// <returns>boolean</returns>
        public bool SelectDropdownElements()
        {
            _homePage.ClickCreateNewExpenseReport();
            var isPresent = false;
            var valueText = _homePage.GetSelectedClient();
            _homePage.ClickClient(valueText);
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

        /// <summary>
        /// This method first tries to set the current week in datepicker then checks to see if it is indeed the 
        /// current week that was selected
        /// </summary>
        /// <returns></returns>
        public bool CheckWeekEndingDate()
        {
            var isSame = false;
            SetupSubmission();
            var actualWeek = _homePage.GetWeekendingDate();
            var expectedWeek = EndOfWeek(DateTime.Today).ToString();
            DateTime formattedActual;
            DateTime formattedExpected;
            DateTime.TryParseExact(actualWeek, "dd/MM/yyyy",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out formattedActual);
            DateTime.TryParseExact(expectedWeek, "dd/MM/yyyy",
                CultureInfo.InvariantCulture, DateTimeStyles.None, out formattedExpected);


            if (formattedActual == formattedExpected)
            {
                isSame = true;
            }
            else
            {
                isSame = false;
            }

            return isSame;
        }

        /// <summary>
        /// Method to initiate access to the create/add new line item options
        /// </summary>
        private void SetupSubmission()
        {
            _homePage.ClickCreateNewExpenseReport();
            _homePage.ClickDatePicker();
            _homePage.ClickDatePickerCurrentWeek();
        }

        /// <summary>
        /// Method to find the end of week for current week
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime EndOfWeek(DateTime dateTime)
        {
            DateTime start = StartOfWeek(dateTime);
            return start.AddDays(5);
        }

        /// <summary>
        /// Method to find the start of the current week
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime StartOfWeek(DateTime dateTime)
        {
            int days = dateTime.DayOfWeek - DayOfWeek.Monday;
            if (days < 0)
                days += 7;
            return dateTime.AddDays(-1 * days).Date;
        }

        /// <summary>
        /// this method attempts to click the create submission button
        /// if successful returns true if not returns false
        /// </summary>
        /// <returns>boolean</returns>
        public bool ClickCreateSubmission()
        {
            var submissionClicked = false;
            SetupSubmission();
            try
            {
                _homePage.ClickCreateSubmission();
                submissionClicked = true;
            }
            catch(OpenQA.Selenium.WebDriverException)
            {
                submissionClicked = false;
            }

            return submissionClicked;
        }

        /// <summary>
        /// this method attempts to click the add line item button
        /// if successful returns true if not returns false
        /// </summary>
        /// <returns>boolean</returns>
        public bool ClickAddLineItem()
        {
            var lineItemClicked = false;
            SetupSubmission();
            try
            {
                _homePage.ClickAddLineItemButton();
                lineItemClicked = true;
            }
            catch(OpenQA.Selenium.WebDriverException)
            {
                lineItemClicked = false;
            }

            return lineItemClicked;
        }

        /// <summary>
        /// this method first checks to see if the employee table is visible then
        /// checks to make sure there are submissions in the table it returns true if 
        /// both criteria are met
        /// </summary>
        /// <returns></returns>
        public bool CheckTableForExistingSubmissions()
        {
            var submissions = false;
           
                var tableExists =_homePage.DoesTableExist(UserType.Employee);
                if (tableExists)
                {
                    var tableCount = _homePage.GetRowCountForTable(UserType.Employee);
                    if (tableCount > 0)
                    {
                        submissions = true;
                    }
                }
                else
                {
                    submissions = false;
                }

                return submissions;
        }

        /// <summary>
        /// this method attempts to delete the first submission in the employee
        /// table, if successful it returns true
        /// </summary>
        /// <returns>boolean</returns>
        public bool DeleteSubmissionFromEmployeeTable()
        {
            var isDeleted = false;
            try
            {
                _homePage.ClickDeleteByTableAndColumn(UserType.Employee, 1);
                _homePage.ClickConfirmDelete();
                isDeleted = true;
            }
            catch(OpenQA.Selenium.WebDriverException)
            {
                isDeleted = false;
            }

            return isDeleted;
        }

        public bool SelectStatusFilter()
        {
            var isPresent = false;
            SelectElement selectElement;
            IList<IWebElement> statuses;
            selectElement = _homePage.SelectStatusDropdown();
            statuses = _homePage.SelectStatusesFromDropdown();

            for(int x = 0; x < statuses.Count(); x++)
            {
                var valueText = statuses[x].GetAttribute("value");
                selectElement.SelectByValue(valueText);
                selectElement.SelectedOption.Click();
                if (string.IsNullOrEmpty(valueText))
                {
                    isPresent = false;
                }
                else
                {
                    isPresent = true;
                }
            }

            return isPresent;
        }

        public bool ViewReceiptFromTable()
        {
            var receiptViewed = false;
           if (_homePage.IsReceiptOnTableRow(UserType.Employee, 1))
           {
               _homePage.ClickReceiptOnTableAndRow(UserType.Employee, 1);
               receiptViewed = true;
           }
           else
           {
               receiptViewed = false;
           }
           return receiptViewed;
        }
    }
}
