using CatExpenseFront.App_Start;
using CatExpenseFront.Controllers;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;
using System.Web.Mvc;
using System.Web.Routing;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    public class LoginControllerTests
    {
        private Mock<ISubmissionService> service = new Mock<ISubmissionService>();
        private Mock<IFinanceApproverService> mockFinanceService = new Mock<IFinanceApproverService>();
        private LoginController controller;

        private HttpContextBase GetMockedHttpContext()
        {
            var context = new Mock<HttpContextBase>();
            var request = new Mock<HttpRequestBase>();
            var response = new Mock<HttpResponseBase>();
            var session = new Mock<HttpSessionStateBase>();
            var server = new Mock<HttpServerUtilityBase>();
            var user = new Mock<IPrincipal>();
            var identity = new Mock<IIdentity>();
            var urlHelper = new Mock<System.Web.Http.Routing.UrlHelper>();

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
            user.Setup(ctx => ctx.Identity).Returns(identity.Object);
            identity.Setup(id => id.IsAuthenticated).Returns(true);
            identity.Setup(id => id.Name).Returns("test");
            request.Setup(req => req.Url).Returns(new Uri("http://localhost:54879/api/Login"));
            request.Setup(req => req.RequestContext).Returns(requestContext.Object);
            requestContext.Setup(x => x.RouteData).Returns(new RouteData());
            request.SetupGet(req => req.Headers).Returns(new NameValueCollection());

            return context.Object;

        }

        [SetUp]
        public void Setup()
        {
            // Arrange
            controller = new LoginController(service.Object, mockFinanceService.Object);
            HttpContextFactory.SetCurrentContext(GetMockedHttpContext());
            
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/login"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "login" } });

            //Assert.IsNotNull(controller);
            //Assert.AreEqual(typeof(LoginController), controller.GetType());
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
        public void EmptyLoginConstructorTest()
        {
            // Act
            var emptyController = new LoginController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(LoginController), emptyController.GetType());
        }

        [Test]
        public void TwoConstructorTest()
        {
            var twoConstructorController = new LoginController(service.Object, mockFinanceService.Object);

            Assert.IsNotNull(twoConstructorController);
            Assert.AreEqual(typeof(LoginController), twoConstructorController.GetType());
        }

        //[Test]
        //public void ThreeConstructorTest()
        //{
        //    Assert.IsNotNull(controller);
        //    Assert.AreEqual(typeof(LoginController), controller.GetType());
        //}
    }
}
