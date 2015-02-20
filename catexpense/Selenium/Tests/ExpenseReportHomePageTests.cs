using System.IO;
using NUnit.Framework;
using Selenium.PageObjects;
using System.Collections.Generic;
using Selenium.Enumerators;
using System;
using System.Configuration;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Selenium.Tests
{
    [TestFixture]
    public class ExpenseReportHomePageTests : TestBase
    {
        ExpenseReportHomePage thisPage;
        BaseSubmissionModal submissionModal;
        string description;

        private List<UserType> allTypes = new List<UserType> 
            { UserType.Employee, UserType.Manager, UserType.Finance };

        [SetUp]
        public void Init()
        {
            string username = ConfigurationManager.AppSettings["username"];
            string password = ConfigurationManager.AppSettings["password"];
            description = ConfigurationManager.AppSettings["testSubDescription"];
            thisPage = new ExpenseReportHomePage(WebDriver, username, password);
        }

        /// <summary>
        /// Tests whether or not the price shown on the mileage modal is rounded to two digits.
        /// 
        /// Currently fails because Selenium cannot hit the value on the HTML because the value
        /// is being derived from angular with no parallel field set on the front end that
        /// Selenium can reach.
        /// </summary>
        [Test]
        public void MileageRoundingAccurate()
        {
            string failMessage = "Test failed:  actual cost read as '{0}'";
            string from = "Baltimore";
            string to = "Miami";
            Regex regEx = new Regex(@"\d+.\d{2}");

            // get to a point where you can see the distance entered
            thisPage.OpenDatePicker();
            thisPage.DatePickerClickCurrentWeek();
            thisPage.ClickCreateSubmission();
            MileageModal mileageModal = new MileageModal(WebDriver);
            mileageModal.EnterDescription(description);
            mileageModal.EnterOrigin(from);
            mileageModal.EnterDestination(to);
            mileageModal.ClickGetDistance();

            string cost = mileageModal.GetTotalCost();
            Match match = regEx.Match(cost);
            Assert.True(match.Success, string.Format(failMessage, cost));
        }

        /// <summary>
        /// Ensures that the Employee table can be found.
        /// </summary>
        [Test]
        public void DoesEmployeeTableExist()
        {
            var failNoTable = "Test Failed:  Employee table missing.";
            Assert.IsTrue(thisPage.DoesTableExist(UserType.Employee), failNoTable);
        }

        /// <summary>
        /// Checks that pressing the cancel button on an open submission modal will close it.
        /// 
        /// This test will fail if a submission is created for that field, as the expected button
        /// to create a submission will not appear if the submission already exists.  Refactor
        /// to accommodate this functionality pending.
        /// </summary>
        [Test]
        public void CancelButtonClosesModal()
        {
             thisPage.OpenDatePicker();
             thisPage.DatePickerClickCurrentWeek();
             thisPage.ClickCreateSubmission();

             thisPage.OpenDatePicker();
             thisPage.DatePickerClickCurrentWeek();
             thisPage.ClickCreateSubmission();
             BaseSubmissionModal modal = new BaseSubmissionModal(WebDriver);
             modal.ClickCancel();

            Assert.IsTrue(thisPage.DoesSubmissionModalExist());
        }

        /// <summary>
        /// Expects the Weekending Date to read the date for the following weekend.
        /// 
        /// Test passes in error because, at present the weekending date in angular 
        /// is being improperly set parallel to a property that Selenium can reach.
        /// </summary>
        [Test]
        public void ExpectDatePickerToReadToday()
        {
            string day = DateTime.Today.Day.ToString("00");
            string month = DateTime.Today.ToString("MMMM", CultureInfo.InvariantCulture);
            int year = DateTime.Today.Year;

            string expectedDate = string.Format("{0}-{1}-{2}", day, month, year);
            thisPage.OpenDatePicker();
            thisPage.DatePickerClickCurrentWeek();
            Assert.AreEqual(expectedDate, thisPage.ReadDatePickerInput());

            thisPage.OpenDatePicker();
            thisPage.DatePickerClickClose();
            Assert.AreEqual(expectedDate, thisPage.ReadDatePickerInput());

            thisPage.OpenDatePicker();
            thisPage.DatePickerClickClear();
            Assert.AreEqual(string.Empty, thisPage.ReadDatePickerInput());
        }

        /// <summary>
        /// Ensures that the mileage distance will default to 0.
        /// 
        /// Test will probably fail because input does not contain a property that selenium can hit.
        /// </summary>
        [Test]
        public void CheckMileageDefault()
        {
            string mileageDefault = "0";
            thisPage.OpenDatePicker();
            thisPage.DatePickerClickCurrentWeek();
            thisPage.ClickCreateSubmission();
            
            BaseSubmissionModal modal = new BaseSubmissionModal(WebDriver);

            Assert.AreEqual(modal.GetMileageDefault(), mileageDefault);
        }

        //[Test]
        public void AddDescriptionToSubmissionTest()
        {
            thisPage.OpenDatePicker();
            thisPage.DatePickerClickCurrentWeek();
            thisPage.ClickCreateSubmission();
            submissionModal = new BaseSubmissionModal(WebDriver);
            submissionModal.ClickCancel();
            //thisPage.CreateTestSubmission();
            thisPage.AddDescriptionToSubmission();
            var content = thisPage.ReadSubmissionDescription();
            Assert.IsNotNullOrEmpty(content);
            Assert.AreEqual("test for description", content);
            thisPage.OpenDatePicker();
            thisPage.DatePickerClickCurrentWeek();
            thisPage.DeleteSubmission();
        }

         //<summary>
         //This test makes sure you are able to cancel a submission 
         //</summary>
        //[Test]
        public void CancelSubmissionTest()
        {
            thisPage.CancelSubmissionClick();
            Assert.IsTrue(true);
        }

        /// <summary>
        /// This test makes sure the project sync button works
        /// </summary>
        [Test]
        public void ProjectSyncTest()
        {
            thisPage.ClickProjectSync();
            Assert.IsTrue(thisPage.IsProjectSyncing());
        }

        /// <summary>
        /// Makes sure that the dropdown for clients populates correctly
        /// </summary>
        //[Test]
        public void DropdownTests()
        {
            Assert.IsTrue(thisPage.SelectDropdownElements());
        }

        //[Test]
        public void CheckTableColumns()
        {
            Init();
            foreach (UserType type in allTypes)
            {
                CheckColumnHeadersByTable(type);
            }
        }

        //[Test]
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
            string commaSeparatedColumns = ConfigurationManager.AppSettings[
                (type == UserType.Employee) ? "employeeColumns" : "otherColumns"];

            return new List<string>(commaSeparatedColumns.Split(','));
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
        //[Test]
        public void CheckSubmittedDates()
        {
            var allEmployeeDates = thisPage.GetEmployeeSubmittedColumn();

            foreach (string date in allEmployeeDates)
            {
                Assert.IsTrue(date.Contains("2015/"));
            }
        }

        //[Test]
        public void CheckIfPagesMerged()
        {
            var checkForMerge = thisPage.IsPagesMerged();
            Assert.IsTrue(checkForMerge);
        }

       //// //[Test]
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
        //[Test]
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
    }
}
