using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class ClientTests
    {
        [Test]
        public void EmptyClientConstructor()
        {
            Client client = new Client();

            Assert.IsNotNull(client);
            if (client.GetType() != typeof(Client))
            {
                Assert.Fail("client is not of type Client!");
            }
        }

        [Test]
        public void ClientConstructor()
        {
            var expClientName = "Niké";
            var expClientId = 1;
            var expManagerName = "Test Manager";

            Client client = new Client(expClientId, expManagerName, expClientName);

            Assert.IsNotNull(client);
            if (client.GetType() != typeof(Client))
            {
                Assert.Fail("client is not of type Client!");
            }

            Assert.AreEqual(expClientName, client.Name);
            Assert.AreEqual(expClientId, client.ClientId);
            Assert.AreEqual(expManagerName, client.ManagerName);
        }
    }
}
