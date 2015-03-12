using CatExpenseFront.Models;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class QbVendorTests
    {
        [Test]
        public void QbVendorEmptyConstructorTest()
        {
            var emptyModel = new QbVendor();

            Assert.IsNotNull(emptyModel);
            Assert.AreSame(typeof(QbVendor), emptyModel.GetType());
        }

        [Test]
        public void QbVendorConstructorTest()
        {
            var model = new QbVendor(1, "test");

            Assert.IsNotNull(model);
            Assert.AreSame(typeof(QbVendor), model.GetType());
        }
    }
}
