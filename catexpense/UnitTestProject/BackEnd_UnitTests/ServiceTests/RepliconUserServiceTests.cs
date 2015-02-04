
using System.Web.Http.ModelBinding;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Utilities;
using Moq;
using NUnit.Framework;
using CatExpenseFront.Services;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    public class RepliconUserServiceTests
    {
        private Mock<IRepository<RepliconUser>> mockRepository;
        private ModelStateDictionary modelState;
        private IService<RepliconUser> service;


        [TestFixtureSetUp]
        public void Initialize()
        {
            mockRepository = new Mock<IRepository<RepliconUser>>();
            modelState = new ModelStateDictionary();
            service = new Service<RepliconUser>(
                new ModelStateWrapper(modelState),
                mockRepository.Object);
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
