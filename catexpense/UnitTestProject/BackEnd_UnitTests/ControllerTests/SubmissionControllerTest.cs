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
using CatExpenseFront.App_Start;
using System.Web;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class SubmissionControllerTest
    {
        private Mock<HttpContextBase> mockHttpContextBase = new Mock<HttpContextBase>();
        private Mock<ISubmissionService> mockService = new Mock<ISubmissionService>();
        private Mock<ICommentService> mockCommentService = new Mock<ICommentService>();
        private Mock<IRepliconUserProjectService> mockRepliconUserService = new Mock<IRepliconUserProjectService>();
        private Mock<IFinanceApproverService> mockFinanceService = new Mock<IFinanceApproverService>();
        private SubmissionController controller;

        private Submission submission1;
        private Submission submission2;
        private Submission submission3;
        private Submission submission4;
        private List<Submission> submissions;

        [TestFixtureSetUp]
        public void SubmissionControllerTestSetUp()
        {
            HttpContextFactory.SetCurrentContext(mockHttpContextBase.Object);
            mockHttpContextBase.Setup(c => c.Session["UserName"]).Returns("TestUser1");
            // Arrange
            controller = new SubmissionController(mockService.Object, mockCommentService.Object, mockRepliconUserService.Object, mockFinanceService.Object);
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
            submission1.WeekEndingDate = new DateTime();
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
            submission1.RepliconProjectId = 1;

            submission2 = new Submission();
            submission2.ActiveDirectoryUser = "TestUser2";
            submission2.ManagerName = "TestUser1";
            submission2.Status = new Status();
            submission2.WeekEndingDate = new DateTime();
            submission2.Status.StatusName = "manager rejected";
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
            submission3.ManagerName = "TestManager3";
            submission3.Status = new Status();
            submission3.WeekEndingDate = new DateTime();
            submission3.Status.StatusName = "manager approved";
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
            submission4.ManagerName = "TestManager4";
            submission4.Status = new Status();
            submission4.WeekEndingDate = new DateTime();
            submission4.Status.StatusName = "manager approved";
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
        [Test]
        public void FullConstructorTest()
        {
            var fullController = new SubmissionController(mockService.Object, mockCommentService.Object);

            Assert.IsNotNull(fullController);
            Assert.AreEqual(typeof(SubmissionController), fullController.GetType());
        }

        [Test]
        public void GetSubmissionByUsernameTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);
            
            // Act
            var response = controller.GetUserSubmissions();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, (response as ICollection<Submission>).Count);
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission1));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission2));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission3));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission4));
        }

        [Test]
        public void GetPendingSubmissionsByManagerNameTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);

            // Act
            var response = controller.GetPendingSubmissionsByManagerName();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, (response as ICollection<Submission>).Count);
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission1));
            Assert.IsTrue((response as ICollection<Submission>).Contains(submission2));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission3));
            Assert.IsFalse((response as ICollection<Submission>).Contains(submission4));
        }

        [Test]
        public void GetPendingSubmissionsByFinanceApproverTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(submissions);
            mockRepliconUserService.Setup(s => s.All()).Returns(new List<RepliconUserProject> { new RepliconUserProject("TestUser1", 17) });

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

        [Test]
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

        [Test]
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

        [Test]
        public void DeleteSubmissionTest()
        {
            // Arrange
            FinanceApprover approver = new FinanceApprover();
            approver.id = 1;
            approver.Username = "TestUser1";
            mockService.Setup(s => s.Find(1)).Returns(submission1);
            mockService.Setup(s => s.Delete(submission1)).Returns(0);
            mockFinanceService.Setup(s => s.All()).Returns(new List<FinanceApprover>() {approver});

            // Act
            var response = controller.DeleteSubmission(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            submission1.IsDeleted = false;
        }

        [Test]
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
