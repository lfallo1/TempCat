using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using Moq;
using NUnit.Framework;
using UnitTestProject.BackEnd_UnitTests.ServiceTests.Base;

namespace UnitTestProject.BackEnd_UnitTests.Util
{

    [TestFixture]
    public class RepositoryTest
    {
        Repository<Comment> dbRepo;
        private Mock<DB> mockDB;
        private Mock<DbSet<Comment>> mockDbSet;
        private Mock<CatExpenseContext> context;


        /// <summary>
        /// Setup before every test.
        /// </summary>
        [TestFixtureSetUp]
        public void setup()
        {
            mockDB = new Mock<DB>();
            context = new Mock<CatExpenseContext>();
           // mockDB.Object = context.Object;
            mockDbSet = new Mock<DbSet<Comment>>();
            dbRepo = new Repository<Comment>(mockDB.Object);


        }

        /// <summary>
        /// Test The DB constructor
        /// </summary>
        [Test]
        public void TestdefaultConstructor()
        {
            Repository<Comment> repo = repo = new Repository<Comment>();
            Assert.NotNull(repo);

        }

        //[Test]
        //public void TestAll()
        //{
        //    List<Comment> commentList = new List<Comment>();
        //    commentList.Add(new Comment());
        //    mockDB.Setup(x => x.CatExpenseContext.Set<Comment>()).Returns(mockDbSet.Object);
        //    mockDbSet.Setup(x => x.AsQueryable().ToList<Comment>()).Returns(commentList);

        //    List<Comment> comments = dbRepo.All().ToList<Comment>();
        //    Assert.AreEqual(comments.Count, 1);
        //}



    }
}
