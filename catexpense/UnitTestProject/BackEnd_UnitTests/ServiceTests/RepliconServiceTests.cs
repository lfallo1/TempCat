using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Models;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    class RepliconServiceTests
    {
        private IRepliconService service;

        [TestFixtureSetUp]
        public void setup()
        {
            service = new RepliconService();
        }

        //[Test]
        public void SetupApiCredentialsTest()
        {
            //Arrange
            Mock<HttpWebRequest> httpWebRequest = new Mock<HttpWebRequest>();
            httpWebRequest.Object.Credentials = new NetworkCredential("username", "password");

           // mockRepliconRequest.Setup(s => s.SetupApiCredentials()).Returns(httpWebRequest);

            //Act
            var response = service.SetupApiCredentials();

            //Assert
            Assert.AreEqual("username", (response.Credentials as NetworkCredential).UserName);
            Assert.AreEqual("password", (response.Credentials as NetworkCredential).Password);
        }
    }
}
