using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;
using NUnit.Framework;
using Moq;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class ErrorControllerTest
    {
        private Mock<IErrorService> mockService = new Mock<IErrorService>();
        private ErrorController controller;

        private Error error1;

        [TestFixtureSetUp]
        public void ErrorControllerTestSetUp()
        {
            controller = new ErrorController(mockService.Object);
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/Error"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "error" } });

            error1 = new Error();
            error1.ErrorId = 1;
            error1.username = "tester";
            error1.endpoint = "api/testerror";
            error1.error = "test error";
            error1.DateCreated = DateTime.Today;

            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(ErrorController), controller.GetType());
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

        //[Test]
        //public void PostErrorTest()
        //{
        //    mockService.Setup(s => s.Create(It.IsAny<Error>())).Returns(error1);
        //
        //    var response = controller.Post(error1);
        //
        //    Assert.IsNotNull(response);
        //    Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        //}
    }
}
