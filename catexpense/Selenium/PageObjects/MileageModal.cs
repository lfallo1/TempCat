using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class MileageModal : BaseSubmissionModal
    {
        private static readonly By mileageDatePickerValue = By.Id("mileageDatePickerValue");
        private static readonly By descriptionText = By.Id("mileageDescription");
        private static readonly By mileageOrigin = By.Id("mileageOrigin");
        private static readonly By mileageDestination = By.Id("mileageDestination");

        private static readonly By getDistanceButton = By.Id("mileageGetDistance");
        private static readonly By mileageDistance = By.Id("mileageDistance");
        private static readonly By mileageCost = By.Id("totalAmount");

        private static readonly By saveAsNewMileageButton = By.Id("mileageAddNew");
        private static readonly By saveChangesButton = By.Id("mileageSaveCurrent");
        private static readonly By cancelChangesButton = By.Id("mileageCancelCurrent");
        
        public MileageModal(IWebDriver driver)
            : base(driver)
        {
        }

        public void EnterDescription(string description)
        {
            SendKeys(descriptionText, description);
        }

        public void EnterOrigin(string origin)
        {
            SendKeys(mileageOrigin, origin);
        }

        public void EnterDestination(string destination)
        {
            SendKeys(mileageDestination, destination);
        }

        public void ClickGetDistance()
        {
            Click(getDistanceButton);
        }

        public string GetDistance()
        {
            return Find(mileageDistance).Text;
        }

        public string GetTotalCost()
        {
            return Find(mileageCost).Text;
        }

        
    }
}
