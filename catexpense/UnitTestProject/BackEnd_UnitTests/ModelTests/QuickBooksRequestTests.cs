using CatExpenseFront.Models;
using CatExpenseFront.Services.Interfaces;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestProject.BackEnd_UnitTests.ModelTests
{
    [TestFixture]
    public class QuickBooksRequestTests
    {

        private Mock<IQbVendorService> vendorService = new Mock<IQbVendorService>();
        private Mock<IQbClientService> clientService = new Mock<IQbClientService>();
        private Mock<IQbAccountService> accountService = new Mock<IQbAccountService>();
        QuickBooksRequest quickBooks;
        
        [TestFixtureSetUp]
        public void SetUp()
        {
            quickBooks = new QuickBooksRequest();

        }
        
        [Test]
        public void QuickBooksRequestConstructorTest()
        {
           
            Assert.IsNotNull(quickBooks);
            Assert.AreSame(typeof(QuickBooksRequest), quickBooks.GetType());
        }
        

        [Test]
        public void QuickBooksRequestLoginTest()
        {
            var testUri = "http://www.google.com";
            var response = QuickBooksRequest.Login(testUri, "type");

            Assert.AreSame(typeof(HttpWebRequest), response.GetType());
            Assert.IsNotNull(response);
        }

        

        
    }
}
