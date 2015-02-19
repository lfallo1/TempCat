using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System.Collections.Generic;
using System.Threading;
using System.Linq;
namespace Selenium.PageObjects
{
    public class ExpenseReportSubmissionPage : PageObjectBase
    {
        private static readonly By SubmitButton = By.Id("createSubmissionButton");
        private static readonly By CancelButton = By.Id("cancelDetailsViewBtn");
        private static readonly By AddLineItemButton = By.Id("addLineItemButton");
        private static readonly By SubmitTableButton = By.Id("submitTableButton");
        private static readonly By SaveTableButton = By.Id("saveTableButton");
        private static readonly By DatePickerInput = By.Id("datePickerInput");
        private static readonly By DatePickerButton = By.Id("datePickerBtn");
        private static readonly By DatePickerTodayButton = By.XPath("//button[.='Today']");
        private static readonly By DatePickerClearButton = By.XPath("//button[.='Clear']");
        private static readonly By DatePickerCloseButton = By.XPath("//button[.='Close']");
        private static readonly By SubmissionModal = By.XPath("//div[@class='modal-content']");        
        private static readonly By DeleteSubmissionButton = By.Id("deleteSubmissionButton");

        public BaseSubmissionModal BaseModal;

        public ExpenseReportSubmissionPage(IWebDriver Driver)
            : base(Driver)
        {
            this.Driver = Driver;
        }
        public BaseSubmissionModal ClickCreateSubmission()
        {
            try
            { 
                Find(SubmitButton).Click(); 
            }
            catch (OpenQA.Selenium.WebDriverException)
            {
                ClickAddLineItem();
            }
            
            return new BaseSubmissionModal(Driver);
        }

        public bool DoesSubmissionModalExist()
        {
            return DoesElementExist(SubmissionModal);
        }

        public BaseSubmissionModal ClickAddLineItem()
        {
            Find(AddLineItemButton).Click();
            return new BaseSubmissionModal(Driver);
        }    

        //public ExpenseReportSubmissionPage SelectClient(int clientIndex)
        //{
        //    SelectByIndex(ClientList, clientIndex);
        //    return this;
        //}

        //public ExpenseReportSubmissionPage SelectClient(string clientName)
        //{
        //    SelectByText(ClientList, clientName);
        //    return this;
        //}

        //public ExpenseReportSubmissionPage SelectFirstClient()
        //{
        //    var allClients = GetAllClients();
        //    return SelectClient(allClients.First());
        //}

        //public int GetClientCount()
        //{
        //    return Driver.FindElement(ClientList).FindElements(By.TagName("option")).Count;
        //}

        //public List<string> GetAllClients()
        //{
        //    var allClients = new List<IWebElement>(Driver.FindElement(ClientList).
        //        FindElements(By.TagName("option")));

        //    return allClients.Select(e => e.Text).ToList();            
        //}

        //public string GetCurrentClient()
        //{
        //    return GetSelectValueFromDropdown(ClientList);
        //}

        //#region handle date picker
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


        
       
    }
}