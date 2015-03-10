using CatExpenseFront.App_Start;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
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
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Web.Http.Routing;
using System.Web.Routing;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class ErrorControllerTests
    {
        private Mock<IErrorService> mockService = new Mock<IErrorService>();
        Error error = new Error();
        private ErrorController controller;

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
            request.Setup(req => req.Url).Returns(new Uri("http://localhost:54879/api/Error"));
            request.Setup(req => req.RequestContext).Returns(requestContext.Object);
            requestContext.Setup(x => x.RouteData).Returns(new RouteData());
            request.SetupGet(req => req.Headers).Returns(new NameValueCollection());

            return context.Object;

        }

        [SetUp]
        public void Init()
        {
            controller = new ErrorController(mockService.Object);
            HttpContextFactory.SetCurrentContext(GetMockedHttpContext());
            
            
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

        [Test]
        public void ErrorControllerPostTest()
        {
            var config = new HttpConfiguration();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:55192/api/Error");
            var route = config.Routes.MapHttpRoute("ErrorController", "api/Error");
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
