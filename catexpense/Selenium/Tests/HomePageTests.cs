using NUnit.Framework;
using Selenium.Page_Methods;
using Selenium.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;

namespace Selenium.Tests
{
    [TestFixture]
    public class HomePageTests : TestBase
    {
        HomePage thisPage;
        HomePageMethods methods;

        [SetUp]
        public void Init()
        {
            thisPage = new HomePage(WebDriver);
            methods = new HomePageMethods(thisPage);
            string username;
            string password;
            username = ConfigurationManager.AppSettings["username"];
            password = ConfigurationManager.AppSettings["password"];
            thisPage = new HomePage(WebDriver, username, password);
            thisPage.Login();
        }

        [Test]
        public void OpenHomePage()
        {
            Assert.IsNotNull(thisPage);
        }

        [Test]
        public void ProjectSyncTest()
        {
           Assert.IsTrue(methods.ClickSync());
        }

        [Test]
        public void ClickCreateNewExpenseReportButton()
        {
            Assert.IsTrue(methods.ClickCreateNewExpense());
        }

        [Test]
        public void DropdownTests()
        {
            Assert.IsTrue(methods.SelectDropdownElements());
        }

        [Test]
        public void ExpectDatePickerToReadCurrentWeek()
        {
            Assert.IsTrue(methods.CheckWeekEndingDate());
        }

        [Test]
        public void ClickCreateSubmission()
        {
            Assert.IsTrue(methods.ClickCreateSubmission());
        }

        [Test]
        public void ClickAddLineItem()
        {
            Assert.IsTrue(methods.ClickAddLineItem());
        }

        [Test]
        public void DoesEmployeeTableExist()
        {
            Assert.IsTrue(methods.CheckTableForExistingSubmissions());
        }
    }
}
