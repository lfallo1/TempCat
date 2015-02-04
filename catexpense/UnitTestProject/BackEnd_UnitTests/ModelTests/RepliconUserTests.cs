using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class RepliconUserTests
    {
        [Test]
        public void RepliconUserEmptyConstructorTest()
        {
            RepliconUser repUser = new RepliconUser();
            Assert.IsNotNull(repUser);
            if (repUser.GetType() != typeof(RepliconUser))
            {
                Assert.Fail("repUser is not of type RepliconUser!");
            }
        }

        [Test]
        public void RepliconUserConstructorTest()
        {
            var expId = 1;
            var expUserName = "Test Manager";
            var expFinanceBool = true;

            var repUser = new RepliconUser(expId, expUserName, expFinanceBool);
            Assert.IsNotNull(repUser);
            Assert.AreSame(repUser.GetType(), typeof(RepliconUser));

            Assert.AreEqual(expId, repUser.RepliconUserId);
            Assert.AreEqual(expUserName, repUser.RepliconUserName);
            Assert.AreEqual(expFinanceBool, repUser.FinanceApprover);
        }
    }
}
