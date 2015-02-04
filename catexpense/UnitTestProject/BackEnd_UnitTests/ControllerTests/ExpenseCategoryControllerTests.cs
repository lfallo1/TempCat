using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Hosting;
using CatExpenseFront.Controllers;
using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ControllerTests
{
    [TestFixture]
    public class ExpenseCategoryControllerTests
    {
        private Mock<IExpenseCategoryService> mockService = new Mock<IExpenseCategoryService>();
        private ExpenseCategoryController controller;
        private ExpenseCategory category1;
        private ExpenseCategory category2;
        private ExpenseCategory category3;
        private List<ExpenseCategory> categories;

        [TestFixtureSetUp]
        public void ExpenseCategoryControllerTestsSetUp()
        {
            // Arrange
            controller = new ExpenseCategoryController(mockService.Object);
            controller.Request = new HttpRequestMessage()
            {
                Properties = { { HttpPropertyKeys.HttpConfigurationKey, new HttpConfiguration() } }
            };

            category1 = new ExpenseCategory();
            category1.ExpenseCategoryId = 1;

            category2 = new ExpenseCategory();
            category2.ExpenseCategoryId = 2;

            category3 = new ExpenseCategory();
            category3.ExpenseCategoryId = 3;

            categories = new List<ExpenseCategory>
            {
                category1,
                category2,
                category3
            };

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(ExpenseCategoryController), controller.GetType());
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
        public void EmptyConstructorTest()
        {
            // Act
            var emptyController = new ExpenseCategoryController();

            // Assert
            Assert.IsNotNull(controller);
            Assert.AreEqual(typeof(ExpenseCategoryController), controller.GetType());
        }

        [Test]
        public void GetExpenseCategoriesTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(categories);

            // Act
            var response = controller.GetExpenseCategories();

            // Assert
            Assert.IsNotNull(categories);
            Assert.AreEqual(3, (categories as ICollection<ExpenseCategory>).Count);
            Assert.IsTrue((categories as ICollection<ExpenseCategory>).Contains(category1));
            Assert.IsTrue((categories as ICollection<ExpenseCategory>).Contains(category2));
            Assert.IsTrue((categories as ICollection<ExpenseCategory>).Contains(category3));
        }

        [Test]
        public void GetExpenseCategoryTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(categories);

            // Act
            var response = controller.GetExpenseCategory(1);

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(1, response.ExpenseCategoryId);
        }

        [ExpectedException(typeof(HttpResponseException))]
        [Test]
        public void FailGetExpenseCategoryTest()
        {
            // Arrange
            mockService.Setup(s => s.All()).Returns(categories);

            // Act
            var response = controller.GetExpenseCategory(4);
        }
    }
}
