using System;
using System.Diagnostics;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using LOGGER = Logger.Logger;
using System.Collections.Generic;
using Selenium.PageObjects;

namespace Selenium
{
    public class PageObjectBase
    {
        protected IWebDriver Driver { get; set; }
        private WebDriverWait wait;
        private static readonly By HomeLink = By.Id("homeLink");
        private static readonly By SubmissionLink = By.Id("submissionLink");
        private const string LOGSTRING = "TestDetails";
        private const string ERRORMESSAGE =
            "PageObjectBase: We're not on the expected page.";

        private static readonly By usernameLogin = By.Id("usernameInput");
        private static readonly By passwordLogin = By.Id("passwordInput");
        private static readonly By loginButton = By.Id("loginButton");
        private static readonly By logoutButton = By.Id("logoutButton");

        public PageObjectBase(IWebDriver driver)
        {
            Driver = driver;
            wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(10));
        }

        public void Login(string username, string password)
        {            
            Find(usernameLogin).SendKeys(username);
            Find(passwordLogin).SendKeys(password);
            Find(loginButton).Click();
        }

        public void Visit(string url, string expectedTitle)
        {
            var rootUrl = new Uri(url);
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("GoUrl: {0}", url));
            Driver.Navigate().GoToUrl(rootUrl);

            // Wait for page to have the right url
            DateTime timestart = DateTime.Now;
            int secondsToTimeout = 15;
            while (!GetTitle().Contains(expectedTitle))
            {
                if ((DateTime.Now - timestart).TotalSeconds > secondsToTimeout)
                {
                    LOGGER.GetLogger(LOGSTRING).LogError(ERRORMESSAGE);
                    LOGGER.GetLogger(LOGSTRING).LogInfo(string.Format("Expected: {0}", expectedTitle));
                    LOGGER.GetLogger(LOGSTRING).LogInfo(string.Format("Actual: {0}", Driver.Title));
                    throw new NoSuchWindowException(ERRORMESSAGE);
                }
            }
            // end wait
        }

        public string GetTitle()
        {
            return Driver.Title;
        }

        public string GetCurrentUrl()
        {
            return Driver.Url;
        }

        public IWebElement Find(By by)
        {
            return Driver.FindElement(by);
        }

        public bool DoesElementExist(By element)
        {
            try
            {
                var elements = Driver.FindElements(element);
                return elements.Count > 0;
            }
            catch (WebDriverException wde)
            {
                Console.WriteLine(wde.ToString());
                return false;
            }
        }

        public void Click(By by)
        {
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("Click: {0}", by));

            var element = Find(by);
            var actions = new Actions(Driver);
            actions.MoveToElement(element).Click().Perform();
        }

        public void ClickAndWaitForPageWithTitle(By by, string title, long timeoutPerAttempt = 2000, int totalAttempts = 3)
        {
            int attempts = 0;
            while (attempts < totalAttempts)
            {
                Stopwatch stopwatch = Stopwatch.StartNew();
                Click(by);
                while (stopwatch.Elapsed < TimeSpan.FromMilliseconds(2000))
                {
                    if (GetTitle().Contains(title))
                    {
                        break;
                    }
                }
                attempts++;
                if (attempts == totalAttempts && !GetTitle().Contains(title))
                {
                    throw new Exception("Could not switch to page with title :" + title);
                }
            }
        }

        public void SendKeys(By by, string inputText)
        {
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("SndKy: {0}", inputText));
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("Elmnt: {0}", by));
            Find(by).Clear();
            Find(by).SendKeys(inputText);
        }

        public void SelectByText(By by, string optionText)
        {
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("Selct: {0}", optionText));
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("Elmnt: {0}", by));
            var select = new SelectElement(Find(by));
            select.SelectByText(optionText);
        }

        public void SelectByIndex(By by, int optionIndex)
        {
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("Selct: {0}", optionIndex));
            LOGGER.GetLogger(LOGSTRING).LogMessage(string.Format("Elmnt: {0}", by));
            var select = new SelectElement(Find(by));
            select.SelectByIndex(optionIndex);
        }

        public string GetSelectValueFromDropdown(By dropdown)
        {
            var selectedElement = new SelectElement(Find(dropdown));
            return selectedElement.SelectedOption.Text;
        }

        public string GetInnerHtml(By by)
        {
            var innerHtml = Find(by).GetAttribute("innerHTML");
            return innerHtml;
        }

        public ExpenseReportHomePage ClickHome()
        {
            Click(HomeLink);
            return new ExpenseReportHomePage(Driver);
        }

        public ExpenseReportSubmissionPage ClickSubmission()
        {
            Click(SubmissionLink);
            return new ExpenseReportSubmissionPage(Driver);
        }

        public void ClickLogout()
        {
            Click(logoutButton);
        }
    }
}
