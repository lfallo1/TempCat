using System;
using System.Collections.Generic;
using System.Linq;
using CatExpenseFront.Models;
using CatExpenseFront.Repository;
using CatExpenseFront.Services;
using CatExpenseFront.Services.Interfaces.Base;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using UnitTestProject.BackEnd_UnitTests.ServiceTests.Base;

namespace UnitTestProject.BackEnd_UnitTests.ServiceTests
{
    [TestFixture]
    public class CommentServiceTests : IServiceTestBase<Comment>
    {
        public override IService<Comment> GetIServiceInstanceWithRepoParamater()
        {
            return new CommentService(mockRepository.Object);
        }

        public override IService<Comment> GetInstanceWithEmptyConstructor()
        {
            return new CommentService();
        }

        public override Mock<IRepository<Comment>> GetMockRepository()
        {
            return new Mock<IRepository<Comment>>();
        }

        public override Comment GetObjectInstance()
        {
            return new Comment();
        }

        public override IQueryable<Comment> GetObjectList()
        {
            return new List<Comment>().AsQueryable();
        }
    }
}
