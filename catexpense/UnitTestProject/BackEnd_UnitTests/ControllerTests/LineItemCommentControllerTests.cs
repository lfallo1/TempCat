﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Results;
using System.Web.Http.Routing;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class LineItemCommentControllerTests
    {
        private Mock<ILineItemCommentService> mockService = new Mock<ILineItemCommentService>();
        private Mock<IRepliconUserService> mockUserService = new Mock<IRepliconUserService>();
        private LineItemCommentController controller;

        private string comment = "im a comment";
        private LineItemComment comment1;
        private LineItemComment comment2;
        private LineItemComment comment3;
        private List<LineItemComment> comments;

        [TestFixtureSetUp]
        public void LineItemCommentControllerTestsSetUp()
        {
            controller = new LineItemCommentController(mockService.Object, mockUserService.Object);
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/lineitemcomment"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "lineitemcomment" } });

            comment1 = new LineItemComment();
            comment1.SubmissionId = 1;
            comment1.LineItemCommentId = 1;

            comment2 = new LineItemComment();
            comment2.SubmissionId = 1;
            comment2.LineItemCommentId = 2;

            comment3 = new LineItemComment();
            comment3.SubmissionId = 2;
            comment3.LineItemCommentId = 3;

            comments = new List<LineItemComment>
            {
                comment1,
                comment2,
                comment3
            };
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
        public void EmptyLineItemCommentControllerConstructorTest()
        {
            // Arrange
            var emptyController = new LineItemCommentController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(LineItemCommentController), emptyController.GetType());
        }

       

        [Test]
        public void GetLineItemTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(comment1);

            // Act
            var response = controller.GetLineItemComment(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(OkNegotiatedContentResult<LineItemComment>), response.GetType());
        }

        [Test]
        public void FailGetLineItemCommentTest()
        {
            // Arrange
            LineItemComment nullComment = null;
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullComment);

            // Act
            var response = controller.GetLineItemComment(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(NotFoundResult), response.GetType());
        }

        [Test]
        public void GetLineItemsByLineItemIdTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(comments);

            // Act
            var response = controller.GetLineItemCommentsBySubmissionId(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(2, (response as ICollection<LineItemComment>).Count);
            Assert.IsTrue((response as ICollection<LineItemComment>).Contains(comment1));
            Assert.IsTrue((response as ICollection<LineItemComment>).Contains(comment2));
            Assert.IsFalse((response as ICollection<LineItemComment>).Contains(comment3));
        }

        [Test]
        public void PutLineItemCommentTest()
        {
            // Arrange
            mockService.Setup(s => s.Update(comment1)).Returns(0);
            // Act
            var response = controller.PutLineItemComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void FailPutLineItemCommentTest()
        {
            // Act
            var response = controller.PutLineItemComment(3, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void ModelStateErrorPutLineItemCommentTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.PutLineItemComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void ModelStateErrorPostTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.CreateLineItemComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
        }

        [Test]
        public void PostTest()
        {
            // Arrange
            mockService.Setup(s => s.Create(It.IsAny<LineItemComment>())).Returns(comment1);

            // Act
            var response = controller.CreateLineItemComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
        }

        [Test]
        public void DeleteLineItemCommentTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(1)).Returns(comment1);
            mockService.Setup(s => s.Delete(comment1)).Returns(0);

            // Act
            var response = controller.DeleteLineItemComment(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void FailDeleteLineItemCommentTest()
        {
            // Arrange
            LineItemComment nullComment = null;
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullComment);

            // Act
            var response = controller.DeleteLineItemComment(17);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}