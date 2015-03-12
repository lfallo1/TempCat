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
    public class QbClientTests
    {
        [Test]
        public void QbClientEmptyConstructorTest()
        {
            var emptyModel = new QbClient();

            Assert.IsNotNull(emptyModel);
            Assert.AreSame(typeof(QbClient), emptyModel.GetType());
        }

        [Test]
        public void QbClientConstructorTest()
        {
            var model = new QbClient(1, "test");

            Assert.IsNotNull(model);
            Assert.AreSame(typeof(QbClient), model.GetType());
        }
    }
}
