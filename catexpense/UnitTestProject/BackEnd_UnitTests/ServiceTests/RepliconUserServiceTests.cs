
using System.Web.Http.ModelBinding;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using Moq;
using NUnit.Framework;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces.Base;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    public class RepliconUserServiceTests
    {
        private Mock<IRepository<RepliconUser>> mockRepository;
     
        private IService<RepliconUser> service;


        [TestFixtureSetUp]
        public void Initialize()
        {
            mockRepository = new Mock<IRepository<RepliconUser>>();
          
        }

        [Test]
        public void CreateRepliconUser()
        {
            // Arrange
            var user = new RepliconUser(1, "TestUser", true);
            mockRepository.Setup(r => r.Create(user)).Returns(user);

            // Act
            var result = service.Create(user);

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
