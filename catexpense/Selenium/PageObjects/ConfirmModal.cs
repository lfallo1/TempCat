using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Selenium.PageObjects
{
    public class ConfirmModal : PageObjectBase
    {
        private static readonly By confirmButton = By.Id("yesButton");
        private static readonly By cancelButton = By.Id("cancelButton");

        public ConfirmModal(IWebDriver driver)
            : base(driver)
        {
        }

        public void ClickConfirm()
        {
            Find(confirmButton).Click();
            Thread.Sleep(2000);
        }

        public void ClickCancel()
        {
            Find(cancelButton).Click();
            Thread.Sleep(2000);
        }
    }
}
