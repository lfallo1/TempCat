using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class StatusTests
    {
        [Test]
        public void StatusConstructorTest()
        {
            Status status = new Status();
            Assert.IsNotNull(status);
            if (status.GetType() != typeof(Status))
            {
                Assert.Fail("status is not of type Status!");
            }
        }
    }
}
