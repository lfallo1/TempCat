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
    public class QbAccountTests
    {
        [Test]
        public void QbAccountEmptyConstructorTest()
        {
            var emptyModel = new QbAccount();
            Assert.IsNotNull(emptyModel);
            Assert.AreSame(typeof(QbAccount), emptyModel.GetType());
        }

        [Test]
        public void QbAccountConstructorTest()
        {
            var model = new QbAccount(1, "test");
            Assert.IsNotNull(model);
            Assert.AreSame(typeof(QbAccount), model.GetType());
        }
    }
}
