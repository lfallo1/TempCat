using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class LineItemTests
    {
        [Test]
        public void LineItemConstructorTest()
        {
            LineItem lineItem = new LineItem();
            Assert.IsNotNull(lineItem);
            if (lineItem.GetType() != typeof(LineItem))
            {
                Assert.Fail("lineItem is not of type LineItem!");
            }
        }



    }
}

