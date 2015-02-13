using System;
using System.Collections.Generic;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class EmailControllerTests
    {
    
        private Mock<ISubmissionService> mockSubmission = new Mock<ISubmissionService>();
        private Mock<ILineItemService> mockLineItem = new Mock<ILineItemService>();
        private EmailController controller;
        private List<Submission> submissions;
        private List<LineItem> lineItems;
     

        [TestFixtureSetUp]
        public void EmailControllerTestsSetUp()
        {
            controller = new EmailController(
               mockSubmission.Object, mockLineItem.Object);

            Submission submission1 = new Submission();
            submission1.DateUpdated = DateTime.Today - TimeSpan.FromDays(3);
            submission1.WeekEndingDate = DateTime.Today;
            submission1.ManagerName = "TestUser6";
            submission1.SubmissionId = 62;
            submission1.ActiveDirectoryUser = "TestUser6";
            submission1.StatusId = 2;
            submissions = new List<Submission>
            {
                submission1
            };

            LineItem lineItem1 = new LineItem();
            lineItem1.SubmissionId = 62;
            lineItem1.Billable = true;
            lineItem1.DateCreated = DateTime.Now - TimeSpan.FromDays(7);
            lineItem1.LineItemDesc = "Description of the Line Item";
            lineItems = new List<LineItem>
            {
                lineItem1
            };

          

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(EmailController), controller.GetType());
        }

        [Test]
        public void EmptyEmailControllerConstructorTest()
        {
            // Arrange
            var emptyController = new EmailController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(EmailController), emptyController.GetType());
        }

        [Test]
        public void GenerateMessageTest()
        {
            // Arrange
            mockLineItem.Setup(m => m.All()).Returns(lineItems);
           
            
            // Act
            var response = controller.GenerateMessage(submissions);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, response.Count);
            Assert.IsTrue(response.ContainsKey("TestManager1"));
        }
    }
}
