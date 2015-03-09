using System.Web.Mvc;
using CatExpenseFront.Controllers;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class HomeControllerTests
    {
        private HomeController controller = new HomeController();

        [Test]
        public void IndexActionResultTest()
        {
            // Act
            var response = controller.Index();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(ViewResult), response.GetType());
        }
    }
}
