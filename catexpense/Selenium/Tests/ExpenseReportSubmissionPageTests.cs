using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using NUnit.Framework;
using Selenium.PageObjects;
using System.Globalization;
using Selenium.Enumerators;
using System.Configuration;


namespace Selenium.Tests
{
    [TestFixture]
    public class ExpenseReportSubmissionPageTests : TestBase
    {
        ExpenseReportHomePage homePage;
        ExpenseReportSubmissionPage submissionPage;

        /// <summary>
        /// Sets up the credentials needed for selenium to log into the application
        /// </summary>
        [SetUp]
        public void Init()
        {
            string username;
            string password;
            username = ConfigurationManager.AppSettings["username"];
            password = ConfigurationManager.AppSettings["password"];

            homePage = new ExpenseReportHomePage(WebDriver, username, password);

            submissionPage = new ExpenseReportSubmissionPage(WebDriver);
        }

        /// <summary>
        /// Tests that you are able to open the submission page
        /// </summary>
        [Test]
        public void OpenSubmissionPage()
        {
            Assert.IsNotNull(submissionPage);
        }


        [Test]
        public void ModalHasAllSettings()
        {
            submissionPage.OpenDatePicker();
            submissionPage.DatePickerClickToday();

            for (int modalType = 0; modalType < 9; modalType++)
            {
                CheckOneModalForm((SubmissionType)modalType);
            }
        }

        private void CheckOneModalForm(SubmissionType type)
        {
            var modal = submissionPage.ClickCreateSubmission().ChangeSubmissionType(type);

            Assert.IsTrue(submissionPage.DoesSubmissionModalExist());
            Assert.AreEqual(type, modal.GetCurrentModalSelection());
            Assert.AreEqual(GetExpectedModalType(type), modal.GetVisibleModalForm());

             modal.ClickCancel();
        }

        private SubmissionType GetExpectedModalType(SubmissionType type)
        {
            var returnType = type < SubmissionType.Transportation ? type : SubmissionType.Other;
            return returnType;
        }

//        [Test]
//        public void ProjectIdsMatch()
//        {
//            // create a client and determine the known ID
//            string expectedClient = submissionPage.OpenDatePicker().
//                DatePickerClickToday().
//                GetCurrentClient();

//            submissionPage.ClickCreateSubmission().
//                SelectSubmissionType(SubmissionType.Per_Diem);

//            var perDiemModal = new PerDiemModal(WebDriver).CheckDayBox(DayOfWeek.Sunday);

//            var homePage = perDiemModal.ClickSave().ClickHome();

//            // check the first created client to see if it matches
//            var allClients = homePage.GetEmployeeClientColumn();
            
//            Assert.AreEqual(expectedClient, allClients.First());

//            // assuming the submission was successfully created, delete the new 
//            // submission, then make sure the submission was successfully deleted
//            homePage.DeleteSubmission(1).ClickConfirm();

//            Assert.AreEqual(allClients.Count - 1, homePage.GetEmployeeColumnCount());
//        }
 }
}
