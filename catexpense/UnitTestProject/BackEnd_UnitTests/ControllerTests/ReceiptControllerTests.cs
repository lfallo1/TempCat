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
using CatExpenseFront.ViewModels;
using Moq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class ReceiptControllerTests
    {
        private Mock<IReceiptService> mockService = new Mock<IReceiptService>();
        private ReceiptController controller;

        private Receipt receipt1;
        private Receipt receipt2;
        private Receipt receipt3;
        private Guid guid1;
        private Guid guid2;
        private Guid guid3;
        private List<Receipt> receipts;

        [TestFixtureSetUp]
        public void ReceiptControllerTestSetUp()
        {
            // Arrange
            controller = new ReceiptController();
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/receipt"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "Receipt" } });

            receipt1 = new Receipt();
            guid1 = Guid.NewGuid();
            

            receipt2 = new Receipt();
            guid2 = Guid.NewGuid();
           

            receipt3 = new Receipt();
            guid3 = Guid.NewGuid();

            receipts = new List<Receipt>
            {
                receipt1,
                receipt2,
                receipt3,
            };

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(ReceiptController), controller.GetType());
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
        public void EmptyReceiptControllerConstructorTest()
        {
            // Arrange
            var emptyController = new ReceiptController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(ReceiptController), emptyController.GetType());
        }

       

        //[Test]
        public void ModelStateErrorPostTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");

            // Act
            var response = controller.FileUpload(receipt1);

            // Assert
            Assert.IsNotNull(response);
            //Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        //[Test]
        public void PostTest()
        {
            // Arrange
            mockService.Setup(s => s.Create(It.IsAny<Receipt>())).Returns(receipt1);

            // Act
            var response = controller.FileUpload(receipt1);

            // Assert
            Assert.IsNotNull(response);
            //Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        }

       

        //[Test]
        public void GetReceiptIdsBySubmissionIdTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(receipts);

            // Act
            var response = controller.GetReceiptIdsBySubmissionId(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, (response as ICollection<ReceiptWithoutImage>).Count);
        }
    }
}
