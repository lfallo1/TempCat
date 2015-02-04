using System.Collections.Generic;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class RepliconControllerTests
    {
        private Mock<IRepliconService> mockService = new Mock<IRepliconService>();
       

        [TestFixtureSetUp]
        public void RepliconControllerTestsSetUp()
        {
           
           
        }

        //[Test]
        public void GetRepliconProjectsTest()
        {
            JObject apiAction = RepliconRequest.SetupGetAllProjectsQuery();
            mockService.Setup(s => s.SetUpGetAllProjectsQuery()).Returns(apiAction);

            JObject response = RepliconRequest.PerformApiRequest(apiAction);
            mockService.Setup(s => s.PerformApiRequest(apiAction)).Returns(response);

            JArray responseValue = RepliconResponse.GetResponseValue(response);
            mockService.Setup(s => s.GetResponseValue(response)).Returns(responseValue);

            List<Client> clientList = RepliconResponse.CreateAllProjectsClientList(responseValue);
            mockService.Setup(s => s.CreateAllProjectsClientList(It.IsAny<JArray>())).Returns(new List<Client>());

           

          
        }
    }
}
