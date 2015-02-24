using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class LineItemControllerTests
    {
        private Mock<ILineItemService> mockService = new Mock<ILineItemService>();
        private Mock<ISubmissionService> mockSubmissionService = new Mock<ISubmissionService>();
        private LineItemController controller;
        private LineItem lineItem1;
        private LineItem lineItem2;
        private LineItem lineItem3;
        private List<LineItem> lineItems;

        [TestFixtureSetUp]
        public void LineItemControllerTestsSetUp()
        {
            // Arrange
            controller = new LineItemController(mockService.Object, mockSubmissionService.Object);
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/lineitem"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "lineitem" } });

            lineItem1 = new LineItem();
            lineItem1.LineItemId = 1;
            lineItem1.SubmissionId = 4;

            lineItem2 = new LineItem();
            lineItem2.LineItemId = 2;
            lineItem2.SubmissionId = 5;

            lineItem3 = new LineItem();
            lineItem3.LineItemId = 3;
            lineItem3.SubmissionId = 6;


            lineItems = new List<LineItem>
            {
                lineItem1,
                lineItem2,
                lineItem3
            };

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(LineItemController), controller.GetType());
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
        public void EmptyConstructorTest()
        {
            // Act
            var emptyController = new LineItemController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(LineItemController), emptyController.GetType());
        }



        //[Test]
        public void GetLineItemTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(1)).Returns(lineItem1);

            // Act
            var response = controller.GetLineItem(1);

            // Assert
            Assert.IsNotNull(response);
        }

        //[Test]
        public void FailGetLineItemTest()
        {
            // Arrange
            LineItem nullItem = null;
            mockService.Setup(s => s.Find(6)).Returns(nullItem);

            // Act
            var response = controller.GetLineItem(6);

            // Assert
            Assert.IsNotNull(response);
        }

        //[Test]
        public void GetLineItemsBySubmissionIdTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(lineItems);

            // Act
            var response = controller.GetLineItemsBySubmissionId(4);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, (response as ICollection<LineItem>).Count);
            Assert.IsTrue((response as ICollection<LineItem>).Contains(lineItem1));
            Assert.IsFalse((response as ICollection<LineItem>).Contains(lineItem2));
            Assert.IsFalse((response as ICollection<LineItem>).Contains(lineItem3));
        }

        //[Test]
        public void PutLineItemTest()
        {
            // Arrange
            mockService.Setup(s => s.Update(lineItem1)).Returns(0);

            // Act
            var response = controller.PutLineItem(1, lineItem1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        //[Test]
        public void FailPutLineItemTest()
        {
            // Act
            var response = controller.PutLineItem(4, lineItem1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Test]
        public void ModelStateErrorPutLineItemTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.PutLineItem(1, lineItem1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Test]
        public void ModelStateErrorPostTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.Post(lineItem1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Test]
        public void PostTest()
        {
            // Arrange
            mockService.Setup(s => s.Create(It.IsAny<LineItem>())).Returns(lineItem1);

            // Act
            var response = controller.Post(lineItem1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        }

        //[Test]
        public void DeleteLineItemTest()
        {
            // Arrange
            mockService.Setup(s => s.Find(1)).Returns(lineItem1);
            mockService.Setup(s => s.Delete(lineItem1)).Returns(0);

            // Act
            var response = controller.DeleteLineItem(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        //[Test]
        public void FailDeleteLineItemTest()
        {
            // Arrange
            LineItem nullItem = null;
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullItem);

            // Act
            var response = controller.DeleteLineItem(17);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
