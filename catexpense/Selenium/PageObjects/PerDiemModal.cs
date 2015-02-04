using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class PerDiemModal : ExpenseReportSubmissionBaseModal
    {
        private static readonly By AllDayCheckBoxes = 
            By.XPath("//input[contains(@ng-model,'perDiemValues.days.')]");

        public PerDiemModal(IWebDriver driver)
            : base(driver)
        {
        }

        public PerDiemModal CheckDayBox(DayOfWeek day)
        {
            var checkThisBox = Driver.FindElements(AllDayCheckBoxes)[(int)day];
            checkThisBox.Click();
            return this;
        }
    }
}
