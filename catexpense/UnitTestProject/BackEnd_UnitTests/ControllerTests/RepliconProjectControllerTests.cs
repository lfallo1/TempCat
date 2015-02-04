using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using System.Web.Http.Hosting;
using System.Web.Http.ModelBinding;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Utilities;
using Moq;
using NUnit.Framework;
using CatExpenseFront.Services.Interfaces;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class RepliconProjectControllerTests
    {
        private Mock<IRepliconProjectService> mockService;
       // private Mock<RepliconUserProjectService> upService;
        private ModelStateDictionary modelState;
        private RepliconProjectController controller;

        [TestFixtureSetUp]
        public void Initialize()
        {
            // Arrange
            //mockService = new Mock<IRepliconProjectService>();
            //modelState = new ModelStateDictionary();
            //controller = new RepliconProjectController(mockService.Object, upService.Object)
            //{
            //    Request = new System.Net.Http.HttpRequestMessage()
            //    {
            //        Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            //    }
            //};

            //// Assert
            //Assert.IsNotNull(controller);
            //Assert.AreEqual(typeof(RepliconProjectController), controller.GetType());
        }

        [TestFixtureTearDown]
        public void CleanUp()
        {
            controller.Dispose();
        }

        [Test]
        public void EmptyContructorTest()
        {
            // Arrange
            var emptyController = new RepliconProjectController();

            // Assert
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(RepliconProjectController), emptyController.GetType());
        }

        //[Test]
        public void GetRepliconProjectsTest()
        {
            // Arrange
            var proj1 = new RepliconProject(1, "TestManager1", "TestProject1");
            var proj2 = new RepliconProject(2, "TestManager2", "TestProject2");
            var proj3 = new RepliconProject(3, "TestManager3", "TestProject3");
            var projectList = new List<RepliconProject>
            {
                proj1, proj2, proj3
            };
            mockService.Setup(s => s.All()).Returns(projectList);

            // Act
            var projects = controller.GetRepliconProject();

            // Assert
            Assert.IsNotNull(projects);
            Assert.AreEqual(3, (projects as ICollection<RepliconProject>).Count);
        }  

       
    }

}
