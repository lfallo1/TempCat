using System.IO;
using NUnit.Framework;
using Selenium.PageObjects;
using System.Collections.Generic;
using Selenium.Enumerators;
using System;
using System.Configuration;
using System.Globalization;

namespace Selenium.Tests
{
    [TestFixture]
    public class ExpenseReportHomePageTests : TestBase
    {
        ExpenseReportHomePage thisPage;
        private List<UserType> allTypes = new List<UserType> 
            { UserType.Employee, UserType.Manager, UserType.Finance };

        [SetUp]
        public void Init()
        {
            string username;
            string password;
            username = ConfigurationManager.AppSettings["username"];
            password = ConfigurationManager.AppSettings["password"];
            thisPage = new ExpenseReportHomePage(WebDriver, username, password);
        }

        [Test]
        public void NavigationAndPersistentSessionTests()
        {
            var testFailWrongUrl = "Test Failed:  URL of '{0}' did not end with '{1}'.";

            var expectedEnding = "home";

            var thisTitle = thisPage.GetCurrentUrl();
            Assert.IsTrue(thisTitle.EndsWith(expectedEnding),
                string.Format(testFailWrongUrl, thisTitle, expectedEnding));

            thisPage.ClickFirstEditableSubmission();
            expectedEnding = "submission";
            thisTitle = thisPage.GetCurrentUrl();
            Assert.IsTrue(thisTitle.EndsWith(expectedEnding),
                string.Format(testFailWrongUrl, thisTitle, expectedEnding));

            thisPage.ClickHome();
            expectedEnding = "home";
            thisTitle = thisPage.GetCurrentUrl();
            Assert.IsTrue(thisTitle.EndsWith(expectedEnding),
                string.Format(testFailWrongUrl, thisTitle, expectedEnding));
        }

        [Test]
        public void DoTablesExist()
        {
            var failNoTable = "Test Failed:  {0} table missing.";
            foreach (UserType type in allTypes)
            {
                Assert.IsTrue(thisPage.DoesTableExist(type),
                    string.Format(failNoTable, type));
            }
        }

        /// <summary>
        ///  Checks that pressing the cancel button in fact closes the open modal
        /// </summary>
        [Test]
        public void CancelButtonClosesModal()
        {
             thisPage.OpenDatePicker();
             thisPage.DatePickerClickToday();
                thisPage.ClickCreateSubmission().
                ClickCancel();

            Assert.IsTrue(thisPage.DoesSubmissionModalExist());
        }

        [Test]
        public void ExpectDatePickerToReadToday()
        {
            string day = DateTime.Today.Day.ToString("00");
            string month = DateTime.Today.ToString("MMMM", CultureInfo.InvariantCulture);
            int year = DateTime.Today.Year;

            string expectedDate = string.Format("{0}-{1}-{2}", day, month, year);
            thisPage.OpenDatePicker();
            thisPage.DatePickerClickToday();
            string actualDate = thisPage.ReadDatePickerInput();
            Assert.AreEqual(expectedDate, actualDate);

            thisPage.OpenDatePicker();
            thisPage.DatePickerClickClose();
            actualDate = thisPage.ReadDatePickerInput();
            Assert.AreEqual(expectedDate, actualDate);

            thisPage.OpenDatePicker();
            thisPage.DatePickerClickClear();
            actualDate = thisPage.ReadDatePickerInput();
            Assert.AreEqual(string.Empty, actualDate);
        }

        [Test]
        public void CheckMileageDefault()
        {
            Assert.IsTrue(thisPage.CheckMileageDefault());
        }

        [Test]
        public void DoAlertsExist()
        {
            var failNoAlert = "Test Failed:  {0} alert missing.";
            foreach (UserType type in allTypes)
            {
                Assert.IsTrue(thisPage.DoesAlertExist(type), 
                    string.Format(failNoAlert, type));
            }
        }

        [Test]
        public void AddDescriptionToSubmissionTest()
        {
            thisPage.AddDescriptionToSubmission();
            var content = thisPage.ReadSubmissionDescription();
            Assert.IsNotNullOrEmpty(content);
            Assert.AreEqual("test for description", content);
        }

         //<summary>
         //This test makes sure you are able to cancel a submission 
         //</summary>
        [Test]
        public void CancelSubmissionTest()
        {
            Assert.IsTrue(thisPage.CancelSubmissionClick());
        }

        /// <summary>
        /// This test makes sure the project sync button works
        /// </summary>
        [Test]
        public void ProjectSyncTest()
        {
            Assert.IsTrue(thisPage.ClickProjectSync());
        }

        /// <summary>
        /// Makes sure that the dropdown for clients populates correctly
        /// </summary>
        [Test]
        public void DropdownTests()
        {

            Assert.IsTrue(thisPage.SelectDropdownElements());
        }

        [Test]
        public void CheckTableColumns()
        {
            Init();
            foreach (UserType type in allTypes)
            {
                CheckColumnHeadersByTable(type);
            }
        }

        [Test]
        public void CanClickEditSubmission()
        {
            thisPage.ClickFirstEditableSubmission();
            var expectedEnding = "submission";
            var thisTitle = thisPage.GetCurrentUrl();
            Assert.IsTrue(thisTitle.EndsWith(expectedEnding));
        }

        #region private functionality to check table columns by type
        private void CheckColumnHeadersByTable(UserType type)
        {
            var failNoTable = string.Format("Inconclusive:  {0} table missing.", type);
            var expectedColumns = GetExpectedColumnHeaders(type);

            Assert.IsTrue(thisPage.DoesTableExist(type), failNoTable);

            var actualColumns = thisPage.GetAllHeadersAtTable(type);

            CompareColumns(expectedColumns, actualColumns);
        }

        private List<string> GetExpectedColumnHeaders(UserType type)
        {
            return (type == UserType.Employee) ?
                new List<string>
                {
                    string.Empty,string.Empty, "Submitted", "Client", "Total", "Week Ending", 
                    "Status", "Last Updated", 
                } :
                new List<string>
                {
                    string.Empty, "Submitted", "Submitted By", "Week Ending", 
                    "Client", "Amount"
                };
        }

        private void CompareColumns(List<string> expectedColumns, List<string> actualColumns)
        {
            var failHeaderCountWrong =
                "Inconclusive:  table expected to have {0} headers, but actually has {1}.";
            var failMismatch = "Test Failed:  \"{0}\" did not contain \"{1}\"";

            Assert.AreEqual(expectedColumns.Count, actualColumns.Count,
                string.Format(failHeaderCountWrong,
                expectedColumns.Count, actualColumns.Count));

            var expectedHeader = string.Empty;
            foreach (string actualText in actualColumns)
            {
                expectedHeader = expectedColumns[actualColumns.IndexOf(actualText)];
                Assert.IsTrue(actualText.Contains(expectedHeader),
                    string.Format(failMismatch, expectedHeader, actualText));
            }
        }
        #endregion
        
        // Ensures that column retrieval code in page object works correctly.
        [Test]
        public void CheckSubmittedDates()
        {
            var allEmployeeDates = thisPage.GetEmployeeSubmittedColumn();

            foreach (string date in allEmployeeDates)
            {
                Assert.IsTrue(date.Contains("2015/"));
            }
        }

        [Test]
        public void CheckIfPagesMerged()
        {
            var checkForMerge = thisPage.IsPagesMerged();
            Assert.IsTrue(checkForMerge);
        }

       //// [Test]
       // public void CanAddAndDeleteSubmissionComments()
       // {
       //     GoToHomePage();
       //     Assert.IsTrue(thisPage.GetEmployeeColumnCount() > 0);

       //     var editSubPage = thisPage.ClickEditByTableAndColumn(UserType.Employee, 1);

       //     var commentModal = editSubPage.ClickNewCommentButton();

       //     // make a test comment (set as date and time of test) and determine
       //     // in what sequence on the comment table it should appear
       //     string expectedComment = DateTime.Now.ToString();
       //     int expectedCommentSequence = editSubPage.GetCommentCount() + 1;
       //     commentModal.TypeComment(expectedComment).ClickConfirm();

       //     // check comment (content and location) immediately after comment is made
       //     Assert.AreEqual(expectedCommentSequence, editSubPage.GetCommentCount());
       //     string actualComment = editSubPage.GetCommentByRow(expectedCommentSequence);
       //     Assert.AreEqual(expectedComment, actualComment);

       //     // make sure the comment still appears where it should be, then delete it
       //     actualComment = editSubPage.ClickHome().
       //         ClickEditByTableAndColumn(UserType.Employee, 1).
       //         GetCommentByRow(expectedCommentSequence);
       //     Assert.AreEqual(expectedComment, actualComment);

       //     // edit comment, then confirm that the edit stuck
       //     string expectedCommentAddition = System.DateTime.Now.ToString();
       //     expectedComment = actualComment + expectedCommentAddition;
       //     editSubPage.ClickEditCommentByRow(expectedCommentSequence).
       //         TypeComment(expectedCommentAddition).
       //         ClickConfirm();
       //     actualComment = editSubPage.GetCommentByRow(expectedCommentSequence);
       //     Assert.AreEqual(expectedComment, actualComment);

       //     // make sure delete comment happened
       //     editSubPage.ClickDeleteCommentByRow(expectedCommentSequence).ClickConfirm();
       //     Assert.AreEqual(expectedCommentSequence - 1, editSubPage.GetCommentCount());
       // }

        // Ensures you can select Finance Rejected and see the no submissions warning
        [Test]
        public void FilterEmployeeTableByFinanceRejected()
        {
            //Assert.IsNotNull(thisPage.GetEmployeeColumnCount());
            thisPage = thisPage.FilterEmployeeTable((int)EmployeeFilter.Finance_Rejected);

            Assert.IsFalse(thisPage.IsEmployeeTableNoEntryWarningVisible());

        }

        //[Test]
        public void TestSqlScriptRunner()
        {
            string script = "SELECT * FROM [Expense12].[dbo].[Submissions]";

            SqlHandler sqlHandler = new SqlHandler("Data Source=(local);Initial Catalog=expense12;user id=sa;password=!Catalyst!;MultipleActiveResultSets=True;Application Name=EntityFramework");
            var firstList = sqlHandler.GetAllOfSpecificColumn(sqlHandler.RunScript(script), "ActiveDirectoryUser");
         
            Assert.IsTrue(true);
        }

        [Test]
        public void ModalHasAllSettings()
        {
            thisPage.OpenDatePicker(); thisPage.DatePickerClickToday();

            for (int modalType = 0; modalType < 9; modalType++)
            {
                CheckOneModalForm((SubmissionType)modalType);
            }
        }

        private void CheckOneModalForm(SubmissionType type)
        {
            var modal = thisPage.ClickCreateSubmission().ChangeSubmissionType(type);

            Assert.IsTrue(thisPage.DoesSubmissionModalExist());
            Assert.AreEqual(type, modal.GetCurrentModalSelection());
            Assert.AreEqual(GetExpectedModalType(type), modal.GetVisibleModalForm());

             modal.ClickCancel();
        }

        private SubmissionType GetExpectedModalType(SubmissionType type)
        {
            var returnType = type < SubmissionType.Transportation ? type : SubmissionType.Other;
            return returnType;
        }
    }
}
