using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    public class QBOControllerTests
    {
        private Mock<QuickBooksRequest> qb = new Mock<QuickBooksRequest>();
        private QboController controller;
        private Mock<IQbVendorService> vendorService = new Mock<IQbVendorService>();
        private Mock<IQbClientService> clientService = new Mock<IQbClientService>();

        [TestFixtureSetUp]
        public void SetUp()
        {
            controller = new QboController(vendorService.Object, clientService.Object, qb.Object);
            
        }

        [TestFixtureTearDown]
        public void CleanUp()
        {
            controller.Dispose();
        }

        [TearDown]
        public void TearDown()
        {
            controller.ModelState.Clear();
        }

        [Test]
        public void EmptyQboConstructorTest()
        {
            var emptyController = new QboController();
            Assert.IsNotNull(emptyController);
            Assert.AreEqual(typeof(QboController), emptyController.GetType());
        }

        [Test]
        public void TwoQboConstructorTest()
        {
            var twoConstructor = new QboController(vendorService.Object, clientService.Object);
            Assert.IsNotNull(twoConstructor);
            Assert.AreEqual(typeof(QboController), twoConstructor.GetType());
        }

        [Test]
        public void QboConstructorTest()
        {
            Assert.AreEqual(typeof(QboController), controller.GetType());
            Assert.IsNotNull(controller);
        }

        [Test]
        [ExpectedException(typeof(System.MissingMethodException))]
        public void GetQboTest()
        {
           
            controller.GetQbo();
            qb.Verify(x => controller.GetQbo());
        }
    }
}
