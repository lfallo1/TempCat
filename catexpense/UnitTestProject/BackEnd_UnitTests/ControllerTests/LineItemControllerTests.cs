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
using System.Web;
using System.Security.Principal;
using System.Web.Routing;
using System.Collections.Specialized;
using CatExpenseFront.App_Start;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class LineItemControllerTests
    {
    //    private Mock<ILineItemService> mockService = new Mock<ILineItemService>();
    //    private Mock<ISubmissionService> mockSubmissionService = new Mock<ISubmissionService>();
    //    private Mock<IReceiptService> mockReceiptService = new Mock<IReceiptService>();
    //    private LineItemController controller;
    //    private LineItem lineItem1;
    //    private LineItem lineItem2;
    //    private LineItem lineItem3;
    //    private List<LineItem> lineItems;
    //    private Receipt receipt1;
    //    private Receipt receipt2;
    //    private Receipt receipt3;
    //    private List<Receipt> listReceipts;
    //    private Submission submission1;

    //    private HttpContextBase GetMockedHttpContext()
    //    {
    //        var context = new Mock<HttpContextBase>();
    //        var request = new Mock<HttpRequestBase>();
    //        var response = new Mock<HttpResponseBase>();
    //        var session = new Mock<HttpSessionStateBase>();
    //        var server = new Mock<HttpServerUtilityBase>();
    //        var user = new Mock<IPrincipal>();
    //        var identity = new Mock<IIdentity>();
    //        var urlHelper = new Mock<UrlHelper>();

    //        session.Setup(s => s.Add("UserName", "catexpuser"));
    //        session.Setup(s => s.IsNewSession).Returns(true);
    //        session.Setup(s => s.SessionID).Returns("UserName");
    //        var requestContext = new Mock<RequestContext>();
    //        requestContext.Setup(x => x.HttpContext).Returns(context.Object);
    //        context.Setup(ctx => ctx.Request).Returns(request.Object);
    //        context.Setup(ctx => ctx.Response).Returns(response.Object);
    //        context.Setup(ctx => ctx.Session).Returns(session.Object);
    //        context.Setup(ctx => ctx.Server).Returns(server.Object);
    //        context.Setup(ctx => ctx.User).Returns(user.Object);
    //        user.Setup(ctx => ctx.Identity).Returns(identity.Object);
    //        identity.Setup(id => id.IsAuthenticated).Returns(true);
    //        identity.Setup(id => id.Name).Returns("test");
    //        request.Setup(req => req.Url).Returns(new Uri("http://localhost:54879/api/Comment"));
    //        request.Setup(req => req.RequestContext).Returns(requestContext.Object);
    //        requestContext.Setup(x => x.RouteData).Returns(new RouteData());
    //        request.SetupGet(req => req.Headers).Returns(new NameValueCollection());

    //        return context.Object;

    //    }

    //    [TestFixtureSetUp]
    //    public void LineItemControllerTestsSetUp()
    //    {
    //        // Arrange
    //        controller = new LineItemController(mockService.Object, mockReceiptService.Object, 
    //            mockSubmissionService.Object, true);
    //        HttpContextFactory.SetCurrentContext(GetMockedHttpContext());
    //        controller.Request = new HttpRequestMessage()
    //        {
    //            RequestUri = new Uri("http://localhost/api/lineitem"),
    //            Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
    //        };
    //        controller.Configuration = new HttpConfiguration();
    //        controller.Configuration.Routes.MapHttpRoute(
    //            name: "DefaultApi",
    //            routeTemplate: "api/{controller}/{id}",
    //            defaults: new { id = RouteParameter.Optional });
    //        controller.RequestContext.RouteData = new HttpRouteData(
    //            route: new HttpRoute(),
    //            values: new HttpRouteValueDictionary { { "controller", "lineitem" } });

    //        lineItem1 = new LineItem();
    //        lineItem1.LineItemId = 1;
    //        lineItem1.SubmissionId = 4;

    //        lineItem2 = new LineItem();
    //        lineItem2.LineItemId = 2;
    //        lineItem2.SubmissionId = 5;

    //        lineItem3 = new LineItem();
    //        lineItem3.LineItemId = 3;
    //        lineItem3.SubmissionId = 6;

    //        receipt1 = new Receipt();
    //        receipt1.LineItemId = 1;
            
    //        submission1 = new Submission();
    //        submission1.ActiveDirectoryUser = "catexpuser";

    //        lineItems = new List<LineItem>
    //        {
    //            lineItem1,
    //            lineItem2,
    //            lineItem3
    //        };

    //        listReceipts = new List<Receipt>
    //        {
    //            receipt1,
    //        };

    //        // Assert
    //        Assert.IsNotNull(controller);
    //        Assert.AreEqual(typeof(LineItemController), controller.GetType());
    //    }

    //    [TestFixtureTearDown]
    //    public void CleanUp()
    //    {
    //        controller.Dispose();
    //    }

    //    [TearDown]
    //    public void TearDown()
    //    {
    //        controller.ModelState.Clear();
    //    }

    //    [Test]
    //    public void EmptyConstructorTest()
    //    {
    //        // Act
    //        var emptyController = new LineItemController();

    //        // Assert
    //        Assert.IsNotNull(emptyController);
    //        Assert.AreEqual(typeof(LineItemController), emptyController.GetType());
    //    }



    //    [Test]
    //    public void GetLineItemTest()
    //    {
    //        // Arrange
    //        mockService.Setup(s => s.Find(1)).Returns(lineItem1);

    //        // Act
    //        var response = controller.GetLineItem(1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //    }

    //    [Test]
    //    public void FailGetLineItemTest()
    //    {
    //        // Arrange
    //        LineItem nullItem = null;
    //        mockService.Setup(s => s.Find(6)).Returns(nullItem);

    //        // Act
    //        var response = controller.GetLineItem(6);

    //        // Assert
    //        Assert.IsNotNull(response);
    //    }

    //    [Test]
    //    public void GetLineItemsBySubmissionIdTest()
    //    {
    //        // Arrange
    //        mockService.Setup(s => s.All()).Returns(lineItems);

    //        // Act
    //        var response = controller.GetLineItemsBySubmissionId(4);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(1, (response as ICollection<LineItem>).Count);
    //        Assert.IsTrue((response as ICollection<LineItem>).Contains(lineItem1));
    //        Assert.IsFalse((response as ICollection<LineItem>).Contains(lineItem2));
    //        Assert.IsFalse((response as ICollection<LineItem>).Contains(lineItem3));
    //    }

    //    [Test]
    //    public void PutLineItemTest()
    //    {
    //        // Arrange
    //        mockService.Setup(s => s.Update(lineItem1)).Returns(0);
    //        mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(lineItem1);

    //        // Act
    //        var response = controller.PutLineItem(1, lineItem1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    //    }

    //    [Test]
    //    public void FailPutLineItemTest()
    //    {
    //        // Act
    //        var response = controller.PutLineItem(4, lineItem1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
    //    }

    //    [Test]
    //    public void ModelStateErrorPutLineItemTest()
    //    {
    //        // Arrange
    //        controller.ModelState.AddModelError("test", "test");

    //        // Act
    //        var response = controller.PutLineItem(1, lineItem1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
    //    }

    //    [Test]
    //    public void ModelStateErrorPostTest()
    //    {
    //        // Arrange
    //        controller.ModelState.AddModelError("test", "test");

    //        // Act
    //        var response = controller.Post(lineItem1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
    //    }

    //    [Test]
    //    public void PostTest()
    //    {
    //        // Arrange
    //        mockService.Setup(s => s.Create(It.IsAny<LineItem>())).Returns(lineItem1);
    //        mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(lineItem1);
    //        mockReceiptService.Setup(s => s.All()).Returns(listReceipts);

    //        // Act
    //        var response = controller.Post(lineItem1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
    //    }

    //    [Test]
    //    public void DeleteLineItemTest()
    //    {
    //        // Arrange
    //        mockService.Setup(s => s.Find(1)).Returns(lineItem1);
    //        mockService.Setup(s => s.Delete(lineItem1)).Returns(0);
    //        mockSubmissionService.Setup(s => s.Find(It.IsAny<int>())).Returns(submission1);
    //        // Act
    //        var response = controller.DeleteLineItem(1);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.Forbidden, response.StatusCode);
    //    }

    //    [Test]
    //    public void FailDeleteLineItemTest()
    //    {
    //        // Arrange
    //        LineItem nullItem = null;
    //        mockService.Setup(s => s.Find(It.IsAny<int>())).Returns(nullItem);
    //        mockService.Setup(s => s.Delete(lineItem1)).Returns(0);
    //        mockSubmissionService.Setup(s => s.Find(It.IsAny<int>())).Returns(submission1);

    //        // Act
    //        var response = controller.DeleteLineItem(17);

    //        // Assert
    //        Assert.IsNotNull(response);
    //        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    //    }
    }
}
