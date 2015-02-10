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
    public class CommentControllerTests
    {
        private Mock<ICommentService> mockService = new Mock<ICommentService>();
     
        private CommentController controller;

        private string comment = "im a comment";
        private Comment comment1;
        private Comment comment2;
        private Comment comment3;
        private List<Comment> comments;

        [TestFixtureSetUp]
        public void CommentControllerTestsSetUp()
        {
            controller = new CommentController(mockService.Object);
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/comment"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "comment" } });

            comment1 = new Comment();
            comment1.SubmissionId = 1;
            comment1.CommentId = 1;

            comment2 = new Comment();
            comment2.SubmissionId = 1;
            comment2.CommentId = 2;

            comment3 = new Comment();
            comment3.SubmissionId = 2;
            comment3.CommentId = 3;

            comments = new List<Comment>
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
        public void EmptyCommentControllerConstructorTest()
        {
            // Arrange
            var emptyController = new CommentController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(CommentController), emptyController.GetType());
        }

       

        [Test]
        public void GetLineItemTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(comment1);

            // Act
            var response = controller.GetCommentById(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(OkNegotiatedContentResult<Comment>), response.GetType());
        }

        [Test]
        public void FailGetCommentTest()
        {
            // Arrange
            Comment nullComment = null;
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullComment);

            // Act
            var response = controller.GetCommentById(1);

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
            var response = controller.GetCommentsBySubmissionId(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(2, (response as ICollection<Comment>).Count);
            Assert.IsTrue((response as ICollection<Comment>).Contains(comment1));
            Assert.IsTrue((response as ICollection<Comment>).Contains(comment2));
            Assert.IsFalse((response as ICollection<Comment>).Contains(comment3));
        }

        [Test]
        public void PutCommentTest()
        {
            // Arrange
            mockService.Setup(s => s.Update(comment1)).Returns(0);
            // Act
            var response = controller.PutComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void FailPutCommentTest()
        {
            // Act
            var response = controller.PutComment(3, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void ModelStateErrorPutCommentTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.PutComment(1, comment);

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
            var response = controller.CreateComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
        }

        [Test]
        public void PostTest()
        {
            // Arrange
            mockService.Setup(s => s.Create(It.IsAny<Comment>())).Returns(comment1);

            // Act
            var response = controller.CreateComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
        }

        [Test]
        public void DeleteCommentTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(1)).Returns(comment1);
            mockService.Setup(s => s.Delete(comment1)).Returns(0);

            // Act
            var response = controller.DeleteComment(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void FailDeleteCommentTest()
        {
            // Arrange
            Comment nullComment = null;
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullComment);

            // Act
            var response = controller.DeleteComment(17);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}