using CatExpenseFront;
using NUnit.Framework;

namespace UnitTestProject.Other_Tests
{
    [TestFixture]
    public class WebApiConfigTests
    {
        [Test]
        public void RegisterTest()
        {
            WebApiConfig.Register(new System.Web.Http.HttpConfiguration());
        }
    }
}
