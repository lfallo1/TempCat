using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using Selenium.Enumerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class ExpenseReportSubmissionBaseModal : PageObjectBase
    {
        private static readonly By selectSubmissionType = By.XPath(
            "//select[@ng-model='selectedType']");
        private static readonly By cancelButton = By.Id("cancel");
        private static readonly By submitButton = By.Id("save");
        private static readonly By policyButton = By.Id("policy");
        private static readonly By mileageInput = By.Id("mileageDistance");

        private static readonly By mileageForm = By.Id("mileage-line-form");
        private static readonly By perDiemForm = By.Id("per-diem-form");
        private static readonly By otherForm = By.Id("other-line-form");

        public ExpenseReportSubmissionBaseModal(IWebDriver driver)
            : base(driver)
        {
        }

        public ExpenseReportSubmissionBaseModal ChangeSubmissionType(SubmissionType type)
        {
            SelectByIndex(selectSubmissionType, (int)type);
            return this;
        }

        public void ClickCancel()
        {
            Find(cancelButton).Click();

           // WaitForModalClose();
        }

        public bool CheckMileageDefault()
        {
            var mileageText = Driver.FindElement(mileageInput);
            var text = mileageText.GetAttribute("value");
            var defaultMiles = false;
            if(text == "0")
            {
                defaultMiles = true;
            }
            return defaultMiles;
        }

        private void WaitForModalClose()
        {
            WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(5));
            if (Driver.FindElement(mileageForm).Displayed)
            {
                wait.Until(d => !d.FindElement(mileageForm).Displayed);
            }
            else if (Driver.FindElement(perDiemForm).Displayed)
            {

                wait.Until(d => !d.FindElement(perDiemForm).Displayed);
            }
            else
            {
                wait.Until(d => !d.FindElement(otherForm).Displayed);
            }
        }

        public ExpenseReportSubmissionPage ClickSave()
        {
            Find(submitButton).Click();
            WaitForModalClose();
            return new ExpenseReportSubmissionPage(Driver);
        }

        public ExpenseReportSubmissionBaseModal ClickPolicy()
        {
            Find(policyButton).Click();
            return this;
        }

        public SubmissionType GetVisibleModalForm()
        {
            if (Find(mileageForm).Displayed)
            {
                return SubmissionType.Mileage;
            }
            else if (Find(perDiemForm).Displayed)
            {
                return SubmissionType.Per_Diem;
            }
            else
            {
                return SubmissionType.Other;
            }
        }

        public SubmissionType GetCurrentModalSelection()
        {
            string submissionText = GetSelectValueFromDropdown(selectSubmissionType);
            return (SubmissionType)Enum.Parse(typeof(SubmissionType), submissionText, true);
        }

        public void SelectSubmissionType(SubmissionType subType)
        {
            this.SelectByIndex(selectSubmissionType, (int)subType);
        }
    }
}
