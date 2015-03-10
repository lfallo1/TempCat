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
using System.Web;
using System.Security.Principal;
using System.Web.Routing;
using System.Collections.Specialized;
using CatExpenseFront.App_Start;

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

        private HttpContextBase GetMockedHttpContext()
        {
            var context = new Mock<HttpContextBase>();
            var request = new Mock<HttpRequestBase>();
            var response = new Mock<HttpResponseBase>();
            var session = new Mock<HttpSessionStateBase>();
            var server = new Mock<HttpServerUtilityBase>();
            var user = new Mock<IPrincipal>();
            var identity = new Mock<IIdentity>();
            var urlHelper = new Mock<UrlHelper>();

            session.Setup(s => s.Add("UserName", "catexpuser"));
            session.Setup(s => s.IsNewSession).Returns(true);
            session.Setup(s => s.SessionID).Returns("UserName");
            var requestContext = new Mock<RequestContext>();
            requestContext.Setup(x => x.HttpContext).Returns(context.Object);
            context.Setup(ctx => ctx.Request).Returns(request.Object);
            context.Setup(ctx => ctx.Response).Returns(response.Object);
            context.Setup(ctx => ctx.Session).Returns(session.Object);
            context.Setup(ctx => ctx.Server).Returns(server.Object);
            context.Setup(ctx => ctx.User).Returns(user.Object);
            context.Setup(ctx => ctx.Session["UserName"]).Returns("catexpuser");
            user.Setup(ctx => ctx.Identity).Returns(identity.Object);
            identity.Setup(id => id.IsAuthenticated).Returns(true);
            identity.Setup(id => id.Name).Returns("test");
            request.Setup(req => req.Url).Returns(new Uri("http://localhost:54879/api/Comment"));
            request.Setup(req => req.RequestContext).Returns(requestContext.Object);
            requestContext.Setup(x => x.RouteData).Returns(new RouteData());
            request.SetupGet(req => req.Headers).Returns(new NameValueCollection());

            return context.Object;

        }

        [TestFixtureSetUp]
        public void CommentControllerTestsSetUp()
        {
            controller = new CommentController(mockService.Object);
            HttpContextFactory.SetCurrentContext(GetMockedHttpContext());
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
            comment1.RepliconUserName = "catexpuser";

            comment2 = new Comment();
            comment2.SubmissionId = 1;
            comment2.CommentId = 2;
            comment2.RepliconUserName = "user";

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
        public void OneConstructorTest()
        {
            var oneConstructor = new CommentController(mockService.Object);

            Assert.IsNotNull(oneConstructor);
            Assert.AreEqual(typeof(CommentController), oneConstructor.GetType());
        }

        [Test]
        public void TwoConstructorTest()
        {
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(CommentController), controller.GetType());
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
            mockService.Setup(s => s.Update(It.IsAny<Comment>())).Returns(0);
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(comment1);
            // Act
            var response = controller.PutComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void FailPutCommentTest()
        {
            mockService.Setup(s => s.Update(It.IsAny<Comment>())).Returns(0);
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(comment2);

            // Act
            var response = controller.PutComment(3, comment);

            // Assert
            Assert.IsNotNull(response);
        }

        [Test]
        public void ModelStateErrorPutCommentTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");
            mockService.Setup(s => s.Update(It.IsAny<Comment>())).Returns(0);
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(comment1);

            // Act
            var response = controller.PutComment(1, comment);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void ModelStateErrorPostTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");
            mockService.Setup(s => s.Update(It.IsAny<Comment>())).Returns(0);
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(comment1);

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