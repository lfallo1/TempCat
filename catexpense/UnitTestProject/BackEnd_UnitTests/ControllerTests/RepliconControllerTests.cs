using System.Collections.Generic;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using System.Web;
using System.Security.Principal;
using System.Web.Mvc;
using System.Web.Routing;
using System;
using System.Collections.Specialized;
using CatExpenseFront.App_Start;
using System.Net.Http;
using System.Web.Http.Hosting;
using System.Web.Http;
using System.Web.Http.Routing;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class RepliconControllerTests
    {
        private Mock<IRepliconUserProjectService> mockService = new Mock<IRepliconUserProjectService>();
        private Mock<IFinanceApproverService> financeService = new Mock<IFinanceApproverService>();
        private Mock<RepliconRequest> repRequestService = new Mock<RepliconRequest>();
        private Mock<RepliconResponse> repResponseService = new Mock<RepliconResponse>();
        private RepliconProjectController controller;
        private List<RepliconUserProject> projectList;
        private RepliconUserProject testProject;
        private List<FinanceApprover> financeList;
        private FinanceApprover testApprover;


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
        public void RepliconControllerTestsSetUp()
        {
            controller = new RepliconProjectController(mockService.Object, financeService.Object, 
                repRequestService.Object, repResponseService.Object);
            HttpContextFactory.SetCurrentContext(GetMockedHttpContext());
            controller.Request = new HttpRequestMessage()
            {
                RequestUri = new Uri("http://localhost/api/RepliconProject"),
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };
            controller.Configuration = new HttpConfiguration();
            controller.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            controller.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "RepliconProject" } });

            projectList = new List<RepliconUserProject>();
            testProject = new RepliconUserProject();
            testProject.ID = 1;
            testProject.ProjectName = "testProject";
            testProject.UserName = "catexpuser";
            projectList.Add(testProject);

            testApprover = new FinanceApprover();
            testApprover.id = 1;
            testApprover.Username = "catexpuser";
            financeList = new List<FinanceApprover>();
            financeList.Add(testApprover);
           
        }

        [Test]
        public void EmptyRepliconControllerConstructor()
        {
            var emptyController = new RepliconProjectController();

            Assert.IsNotNull(emptyController);
            Assert.AreSame(typeof(RepliconProjectController), emptyController.GetType());
        }

        [Test]
        public void RepliconControllerConstructorTest()
        {
            Assert.IsNotNull(controller);
            Assert.AreSame(typeof(RepliconProjectController), controller.GetType());
        }

        [Test]
        public void GetRepliconProjectsTest()
        {
            mockService.Setup(x => x.All()).Returns(projectList);
            var response = controller.GetRepliconProject();

            Assert.IsNotNull(response);
            Assert.AreSame(typeof(List<RepliconUserProject>), response.GetType());
            Assert.AreEqual(1, response[0].ID);
          
        }

        [Test]
        [ExpectedException(typeof(System.NotSupportedException))]
        public void UpdateRepliconTableTest()
        {
            repRequestService.Setup(r => r.SetupGetAllProjectsQuery()).Returns(new JObject());
            repRequestService.Setup(r => r.PerformApiRequest(It.IsAny<JObject>())).Returns(new JObject());
            repResponseService.Setup(r => r.GetResponseValue(It.IsAny<JObject>())).Returns(new JArray());
            repResponseService.Setup(r => r.CreateAllProjectsList(It.IsAny<JArray>())).Returns(projectList);
            mockService.Setup(r => r.All()).Returns(projectList);
            mockService.Setup(r => r.Delete(It.IsAny<RepliconUserProject>())).Returns(0);
            mockService.Setup(r => r.CreateAll(It.IsAny<List<RepliconUserProject>>())).Returns(projectList);

            controller.UpdateTable();
            mockService.Verify(x => controller.UpdateTable());
        }

        [Test]
        [ExpectedException(typeof(System.NotSupportedException))]
        public void UpdateFinanceApproversTest()
        {
            financeService.Setup(x => x.All()).Returns(financeList);
            financeService.Setup(x => x.Delete(It.IsAny<FinanceApprover>())).Returns(0);
            financeService.Setup(x => x.Create(It.IsAny<FinanceApprover>())).Returns(testApprover);

            controller.UpdateFinanceApprovers();
            mockService.Verify(x => controller.UpdateFinanceApprovers());
        }
    }
}
