using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using Moq;
using NUnit.Framework;
using CatExpenseFront.Services.Interfaces;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class SubmissionControllerTest
    {
        private Mock<ISubmissionService> mockService = new Mock<ISubmissionService>();
        private SubmissionController controller;

        private Submission submission1;
        private Submission submission2;
        private Submission submission3;
        private Submission submission4;
        private List<Submission> submissions;

        [TestFixtureSetUp]
        public void SubmissionControllerTestSetUp()
        {
            // Arrange
            controller = new SubmissionController(mockService.Object);
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/submission"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "submission" } });

            submission1 = new Submission();
            submission1.ActiveDirectoryUser = "TestUser1";
            submission1.ManagerName = "TestManager1";
            submission1.Status = new Status();
            submission1.Status.StatusName = "submitted";
            submission1.LineItems = new List<LineItem>()
            {
                new LineItem()
                {
                    LineItemAmount = 20
                },
                new LineItem()
                {
                    LineItemAmount = 30
                },
            };
            submission1.SubmissionId = 1;
            submission1.WeekEndingDate = DateTime.Today;
            submission1.RepliconProjectId = 17;

            submission2 = new Submission();
            submission2.ActiveDirectoryUser = "TestUser2";
            submission2.ManagerName = "TestManager2";
            submission2.Status = new Status();
            submission2.Status.StatusName = "manager_rejected";
            submission2.LineItems = new List<LineItem>()
            {
                new LineItem()
                {
                    LineItemAmount = 30
                },
                new LineItem()
                {
                    LineItemAmount = 80
                },
            };
            submission2.SubmissionId = 2;

            submission3 = new Submission();
            submission3.ActiveDirectoryUser = "TestUser3";
            submission3.ManagerName = "TestManager1";
            submission3.Status = new Status();
            submission3.Status.StatusName = "manager_approved";
            submission3.LineItems = new List<LineItem>()
            {
                new LineItem()
                {
                    LineItemAmount = 20
                },
                new LineItem()
                {
                    LineItemAmount = 30
                },
            };
            submission3.SubmissionId = 3;

            submission4 = new Submission();
            submission4.ActiveDirectoryUser = "TestUser4";
            submission4.ManagerName = "TestManager2";
            submission4.Status = new Status();
            submission4.Status.StatusName = "manager_approved";
            submission4.LineItems = new List<LineItem>()
            {
                new LineItem()
                {
                    LineItemAmount = 20
                },
                new LineItem()
                {
                    LineItemAmount = 30
                },
            };
            submission4.SubmissionId = 4;

            submissions = new List<Submission>
            {
                submission1,
                submission2,
                submission3,
                submission4
            };

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(SubmissionController), controller.GetType());
        }

        [TestFixtureTearDown]
        public void CleanUp()
        {
            controller.Dispose();
        }

        [TearDown]
        public void TearDown()
        {
            controller.ModelState.Clear();
        }

        [Test]
        public void EmptySubmissionControllerConstructorTest()
        {
            // Arrange
            var emptyController = new SubmissionController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(SubmissionController), emptyController.GetType());
        }

        //[Test]
        public void GetSubmissionByUsernameTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);

            // Act
            var response = controller.GetUserSubmissions();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, (response as ICollection<Submission>).Count);
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission1));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission2));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission3));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission4));
        }

        //[Test]
        public void GetPendingSubmissionsByManagerNameTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);

            // Act
            var response = controller.GetPendingSubmissionsByManagerName();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, (response as ICollection<Submission>).Count);
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission1));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission2));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission3));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission4));
        }

        //[Test]
        public void GetPendingSubmissionsByFinanceApproverTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);

            // Act
            var response = controller.GetPendingSubmissionsByFinanceApprover();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(2, (response as ICollection<Submission>).Count);
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission1));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission2));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission3));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission4));
        }





        //[Test]
        public void GetSubmissionsTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);

            // Act
            var response = controller.GetUserSubmissions();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(4, (response as ICollection<Submission>).Count);
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission1));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission2));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission3));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission4));
        }



        //[Test]
        public void ModelStateErrorPostTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.Post(submission1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Test]
        public void PostTest()
        {
            // Arrange
            mockService.Setup(s => s.Create(It.IsAny<Submission>())).Returns(submission1);

            // Act
            var response = controller.Post(submission1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        }

        //[Test]
        public void DeleteSubmissionTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(1)).Returns(submission1);
            mockService.Setup(s => s.Delete(submission1)).Returns(0);

            // Act
            var response = controller.DeleteSubmission(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        //[Test]
        public void FailDeleteSubmissionTest()
        {
            // Arrange
            Submission nullSubmission = null;
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullSubmission);

            // Act
            var response = controller.DeleteSubmission(17);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

    }
}
