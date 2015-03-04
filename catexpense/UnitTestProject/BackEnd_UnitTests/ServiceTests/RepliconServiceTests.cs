using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Models;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces;
using Moq;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using UnitTestProject.BackEnd_UnitTests.ServiceTests.Stub;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    class RepliconServiceTests
    {
        private IRepliconService service;
        private RepliconRequestStub repliconRequestStub;
        private RepliconResponse repliconResponseStub;
        private JObject jobject = new JObject();
        private JArray jarray = new JArray();

        [TestFixtureSetUp]
        public void setup()
        {
            repliconRequestStub = new RepliconRequestStub();
            repliconResponseStub = new RepliconResponseStub();
            service = new RepliconService(repliconRequestStub, repliconResponseStub);
        }

        [Test]
        public void RepliconServiceSetupApiCredentialsTest()
        {
            //Arrange

            //Act
            var response = service.SetupApiCredentials();

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(response.Address.AbsoluteUri, "http://www.foo.com/");
        }

        [Test]
        public void RepliconServicePerformApiRequest()
        {
            //Act
            var response = service.PerformApiRequest(jobject);

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(response["method"].ToString(), "PerformApiRequest");
        }

        [Test]
        public void RepliconServiceSetupGetAllProjectsQueryTest()
        {
            //Act
            var response = service.SetUpGetAllProjectsQuery();

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(response["method"].ToString(), "SetupGetAllProjects");
        }

        [Test]
        public void RepliconServiceSetupGetAllUsersQuery()
        {
            //Act
            var response = service.SetupGetAllUsersQuery();

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(response["method"].ToString(), "SetupGetAllUsers");
        }

        [Test]
        public void RepliconServiceSetupGetOneProjectQuery()
        {
            //Act
            var response = service.SetupGetOneProjectQuery(1);

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(response["method"].ToString(), "SetupGetOneProject");
        }

        [Test]
        public void RepliconServiceCreateAllProjectsListTest(){
            //Act
            var response = service.CreateAllProjectsList(jarray);

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(List<RepliconUserProject>), response.GetType());
        }

        [Test]
        public void RepliconServiceGetResponseValueTest(){
            //Act
            var response = service.GetResponseValue(jobject);

            //Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(JArray), response.GetType());
        }
    }
}
