using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class RepliconProjectTests
    {
        [Test]
        public void RepliconProjectEmptyConstructorTest()
        {
            RepliconProject repProject = new RepliconProject();
            Assert.IsNotNull(repProject);
            Assert.AreSame(repProject.GetType(), typeof(RepliconProject));
        }

        //[Test]
        public void RepliconProjectConstructorTest()
        {
            var expId = 1;
            var expManagerName = "Test Manager";
            var expClientName = "Test Project";

            RepliconProjectContainer repProject = new RepliconProjectContainer(expId, expManagerName, expClientName, 1, null);
            Assert.IsNotNull(repProject);
            Assert.AreSame(repProject.GetType(), typeof(RepliconProject));

            Assert.AreEqual(expId, repProject.RepliconProjectId);
            Assert.AreEqual(expManagerName, repProject.RepliconManagerName);
            Assert.AreEqual(expClientName, repProject.RepliconProjectName);
        }
    }
}
