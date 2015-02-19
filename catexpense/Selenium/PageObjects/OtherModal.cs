using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class OtherModal : BaseSubmissionModal
    {
        private static readonly By AllDayCheckBoxes = 
            By.XPath("//input[contains(@ng-model,'perDiemValues.days.')]");

        private static readonly By otherDatePickerValue = By.Id("otherDatePickerValue");
        private static readonly By otherDatePickerButton = By.Id("otherDatePickerButton");
        private static readonly By otherDescription = By.Id("otherDescription");
        private static readonly By otherAmount = By.Id("otherAmount");

        private static readonly By billable = By.Id("otherBillable");

        public OtherModal(IWebDriver driver)
            : base(driver)
        {
        }

        public void ClickDatePickerButton()
        {
            Click(otherDatePickerButton);
        }

        public void SetDescription(string description)
        {
            SendKeys(otherDescription, description);
        }

        public string GetDescription()
        {
            return Find(otherDescription).Text;
        }

        public void SetAmount(double amount)
        {
            SendKeys(otherDescription, amount.ToString());
        }

        public void CheckBillable()
        {
            Find(billable).Click();
        }

        public bool IsBillable()
        {
            return Find(billable).Selected;
        }
    }
}
