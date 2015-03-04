using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Repository;
using CatExpenseFront.Services.Interfaces.Base;
using Moq;
using NUnit.Framework;


namespace UnitTestProject.BackEnd_UnitTests.ServiceTests.Base
{
    /// <summary>
    /// Generic abstract class for service tests
    /// </summary>
    /// <typeparam name="T"></typeparam>
    [TestFixture]
    public abstract class IServiceTestBase<T> where T : class
    {
        protected IService<T> service;
        protected Mock<IRepository<T>> mockRepository;
        protected T obj;
        protected IQueryable<T> objects;

        public abstract IService<T> GetIServiceInstanceWithRepoParamater();
        public abstract Mock<IRepository<T>> GetMockRepository();
        public abstract T GetObjectInstance();
        public abstract IQueryable<T> GetObjectList();
        public abstract IService<T> GetInstanceWithEmptyConstructor();
        
        [TestFixtureSetUp]
        public void setup()
        {
            mockRepository = GetMockRepository();
            service = GetIServiceInstanceWithRepoParamater();
            obj = GetObjectInstance();
            objects = GetObjectList();
        }

        [Test]
        public void IServiceEmptyConstructorTest()
        {
            //Act
            var instance = GetInstanceWithEmptyConstructor();

            // Assert
            Assert.IsNotNull(instance);
        }

        [Test]
        public void IServiceGetAllTest()
        {
            // Arrange
            mockRepository.Setup(s => s.All()).Returns(objects);

            // Act
            var response = service.All();

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(EnumerableQuery<T>), objects.GetType());
        }

        [Test]
        public void IServiceCreateTest()
        {
            // Arrange
            mockRepository.Setup(s=>s.Create(obj)).Returns(obj);

            // Act
            var response = service.Create(obj);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(T), obj.GetType());
        }

        [Test]
        public void IServiceCreateAllTest()
        {
            // Arrange
            mockRepository.Setup(s => s.CreateAll(objects)).Returns(objects);

            // Act
            var response = service.CreateAll(objects);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(EnumerableQuery<T>), response.GetType());
        }

        [Test]
        public void IServiceUpdateTest()
        {
            // Arrange
            int expected = 1;
            mockRepository.Setup(s => s.Update(obj)).Returns(expected);

            // Act
            var response = service.Update(obj);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(expected, response);
            Assert.AreEqual(typeof(T), obj.GetType());
        }

        [Test]
        public void IServiceSaveChangesTest()
        {
            // Arrange
            mockRepository.Setup(s => s.SaveChanges());

            // Act
            service.SaveChanges();
            
            // Assert
            //TODO
        }

        [Test]
        public void IServiceDeleteTest()
        {
            int expected = 1;
            // Arrange
            mockRepository.Setup(s => s.Delete(obj)).Returns(expected);

            // Act
            var response = service.Delete(obj);
            // Assert
            Assert.AreEqual(expected, response);
        }

        [Test]
        public void IServiceFindTest()
        {
            // Arrange
            mockRepository.Setup(s => s.Find(1)).Returns(obj);

            // Act
            var response = service.Find(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(typeof(T), obj.GetType());
        }
    }
}
