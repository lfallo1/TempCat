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
using System.Web;
using System.Security.Principal;
using System.Web.Routing;
using System.Collections.Specialized;
using CatExpenseFront.App_Start;
using System.Text;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class ReceiptControllerTests
    {
        private Mock<IReceiptService> mockService = new Mock<IReceiptService>();
        private Mock<ILineItemService> mockLineItemService = new Mock<ILineItemService>();
        private Mock<ISubmissionService> mockSubmission = new Mock<ISubmissionService>();
        private ReceiptController controller;

        private Receipt receipt1;
        private Receipt receipt2;
        private Receipt receipt3;
        private Guid guid1;
        private Guid guid2;
        private Guid guid3;
        private List<Receipt> receipts;
        private LineItem lineItem1;
        private LineItem lineItem2;
        private LineItem lineItem3;
        private List<LineItem> lineItems;
        private Submission submission1;


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
            request.Setup(req => req.Url).Returns(new Uri("http://localhost:54879/api/Receipts"));
            request.Setup(req => req.RequestContext).Returns(requestContext.Object);
            requestContext.Setup(x => x.RouteData).Returns(new RouteData());
            request.SetupGet(req => req.Headers).Returns(new NameValueCollection());

            return context.Object;

        }
        [TestFixtureSetUp]
        public void ReceiptControllerTestSetUp()
        {
            // Arrange
            controller = new ReceiptController(mockService.Object, mockLineItemService.Object, mockSubmission.Object);
            HttpContextFactory.SetCurrentContext(GetMockedHttpContext());
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
            var bytes = Encoding.UTF8.GetBytes("testtttting");
            var base64 = Convert.ToBase64String(bytes);
            
            receipt1 = new Receipt();
            receipt1.Base64String = base64;
            guid1 = Guid.NewGuid();
            receipt1.ReceiptImage = bytes;

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
            
            lineItem1 = new LineItem();
            lineItem1.SubmissionId = 1;
            lineItem2 = new LineItem();
            lineItem3 = new LineItem();

            lineItems = new List<LineItem>
            {
                lineItem1,
                lineItem2,
                lineItem3,
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
        public void EmptyReceiptControllerConstructorTest()
        {
            // Arrange
            var emptyController = new ReceiptController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(ReceiptController), emptyController.GetType());
        }

        [Test]
        public void OneConstructorReceiptControllerTest()
        {
            var oneConstructor = new ReceiptController(mockService.Object);
            Assert.IsNotNull(oneConstructor);
            Assert.AreEqual(typeof(ReceiptController), oneConstructor.GetType());
        }

       [Test]
        public void TwoConstructorReceiptControllerTest()
        {
            var twoConstructor = new ReceiptController(mockService.Object, mockLineItemService.Object);

            Assert.IsNotNull(twoConstructor);
            Assert.AreEqual(typeof(ReceiptController), twoConstructor.GetType());
        }

        [Test]
        public void ModelStateErrorPostTest()
        {
            // Arrange
            controller.ModelState.AddModelError("test", "test");
            mockService.Setup(s => s.Create(It.IsAny<Receipt>())).Returns(receipt1);
            mockLineItemService.Setup(s => s.Find(It.IsAny<int>())).Returns(lineItem1);

            // Act
            var response = controller.FileUpload(receipt1);

            // Assert
            Assert.IsNotNull(response);
            //Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void PostTest()
        {
            // Arrange
            mockService.Setup(s => s.Create(It.IsAny<Receipt>())).Returns(receipt1);
            mockLineItemService.Setup(s => s.Find(It.IsAny<int>())).Returns(lineItem1);

            // Act
            var response = controller.FileUpload(receipt1);

            // Assert
            Assert.IsNotNull(response);
            //Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
        }

       

        [Test]
        public void GetReceiptIdsBySubmissionIdTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(receipts);
            mockLineItemService.Setup(s => s.All()).Returns(lineItems);

            // Act
            var response = controller.GetReceiptIdsBySubmissionId(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(3, (response as ICollection<ReceiptWithoutImage>).Count);
        }

        //[Test]
        public void GetReceiptByUniqueIdTest()
        {
            receipt1.Name = "Test";
            
            mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(receipt1);

            controller.GetReceiptByUniqueId(1);

            mockService.Verify(x => x.Find(It.IsAny<int>()), Times.Never());
        }

        [Test]
        public void GetAllReceiptsBySubmissionIdTest()
        {
            mockService.Setup(s => s.All()).Returns(receipts);
            mockLineItemService.Setup(s => s.All()).Returns(lineItems);

            var response = controller.GetAllReceiptsBySubmissionId(1);
            Assert.IsNotNull(response);
           
        }

        [Test]
        public void FileUploadTest()
        {
            mockLineItemService.Setup(x => x.Find(It.IsAny<int>())).Returns(lineItem1);
            mockService.Setup(x => x.Create(It.IsAny<Receipt>())).Returns(receipt1);
            mockLineItemService.Setup(x => x.Update(It.IsAny<LineItem>())).Returns(0);
            var response = controller.FileUpload(receipt1);

            Assert.AreEqual(typeof(Receipt), response.GetType());
            Assert.IsNotNull(response);
        }

        [Test]
        public void ReceiptControllerDeleteTest()
        {
            submission1 = new Submission();
            submission1.SubmissionId = 1;
            submission1.ActiveDirectoryUser = "catexpuser";
            mockService.Setup(x => x.Find(It.IsAny<int>())).Returns(receipt1);
            mockLineItemService.Setup(x => x.Find(It.IsAny<int>())).Returns(lineItem1);
            mockSubmission.Setup(x => x.Find(It.IsAny<int>())).Returns(submission1);

            var response = controller.DeleteReceipt(1, 1);

            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
