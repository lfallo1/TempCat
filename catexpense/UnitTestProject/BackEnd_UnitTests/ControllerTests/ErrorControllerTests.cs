using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class ErrorControllerTests
    {
        private Mock<IErrorService> mockService = new Mock<IErrorService>();
        Error error = new Error();
        private ErrorController controller;

        [SetUp]
        public void Init()
        {
            controller = new ErrorController(mockService.Object);
            
        }

        [Test]
        public void EmptyErrorControllerConstructorTest()
        {
            var emptyController = new ErrorController();

            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(ErrorController), emptyController.GetType());
        }

        [Test]
        public void ErrorControllerConstructorTest()
        {
            var controller = new ErrorController(mockService.Object);

            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(ErrorController), controller.GetType());

        }

       // [Test]
        public void ErrorControllerPostTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:54879/api/Error");
            var route = config.Routes.MapHttpRoute(null, "api/Error");
            //route.RouteHandler = new FakeHttpControllerRouteHandler();
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "Error" } });

            //session["UserName"] = "User";
            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
            error.DateCreated = DateTime.Today;
            mockService.Setup(s => s.Create(error)).Returns(error);
            var actualResponse = controller.Post(error);
            Assert.IsNotNull(actualResponse);
        }
    }
}
