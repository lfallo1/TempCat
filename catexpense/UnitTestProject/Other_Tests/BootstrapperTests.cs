using CatExpenseFront;
using NUnit.Framework;
using Microsoft.Practices.Unity;

namespace UnitTestProject.Other_Tests
{
    [TestFixture]
    public class BootstrapperTests
    {
        [Test]
        public void InitializeTest()
        {
            var response = Bootstrapper.Initialise();

            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(UnityContainer), response.GetType());
        }
    }
}
