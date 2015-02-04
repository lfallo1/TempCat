using CatExpenseFront;
using NUnit.Framework;

namespace UnitTestProject.Other_Tests
{
    [TestFixture]
    public class FilterConfigTests
    {
        [Test]
        public void FilterConfigTest()
        {
            FilterConfig.RegisterGlobalFilters(new System.Web.Mvc.GlobalFilterCollection());
        }
    }
}
