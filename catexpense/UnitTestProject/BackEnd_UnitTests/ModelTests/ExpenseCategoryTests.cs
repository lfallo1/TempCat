using CatExpenseFront.Models;
using NUnit.Framework;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class ExpenseCategoryTests
    {
        [Test]
        public void ExpenseCategoryConstructorTest()
        {
            ExpenseCategory expCat = new ExpenseCategory();
            Assert.IsNotNull(expCat);
            Assert.AreEqual(typeof(ExpenseCategory), expCat.GetType());
        }

    }
}
