using Selenium.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using System.Globalization;

namespace Selenium.Page_Methods
{
    public class HomePageMethods
    {
        HomePage _homePage;

        public HomePageMethods(HomePage homePage)
        {
            _homePage = homePage;
        }
         
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
        /// current week
        /// </summary>
        /// <returns></returns>
        public bool CheckWeekEndingDate()
        {
            _homePage.ClickCreateNewExpenseReport();
            var isSame = false;
            _homePage.ClickDatePicker();
            _homePage.ClickDatePickerCurrentWeek();
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
    }
}
